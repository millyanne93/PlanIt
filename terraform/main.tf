terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = "~> 1.14"
    }
  }

  backend "s3" {
    bucket          = "planit-terraform-state"
    key             = "planit/terraform.tfstate"
    region          = "us-east-1"
    encrypt         = true
    dynamodb_table  = "terraform-lock-table"
  }
}

provider "aws" {
  region = var.aws_region
}

# Kubernetes provider with exec-based authentication
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

# Helm provider with exec-based authentication
provider "helm" {
  alias = "eks"
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
    }
  }
}
provider "kubectl" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}
# Random passwords
resource "random_password" "jwt_secret" {
  length           = 32
  special          = true
  override_special = "!@#%^&*()-_=+[]{}<>:?"
}

# VPC module
module "vpc" {
  source = "./modules/vpc"

  cluster_name    = var.cluster_name
  vpc_cidr        = var.vpc_cidr
  azs             = var.azs
  private_subnets = var.private_subnets
  public_subnets  = var.public_subnets
}

# EKS module - UPDATED to include IAM policies
module "eks" {
  source = "./modules/eks"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  node_group_name = "planit-nodes"
  instance_types  = ["t3.medium"]
  desired_size    = 2
  max_size        = 3
  min_size        = 1

  # REMOVED: External IAM policy attachments moved inside the module
}

# EBS CSI Driver addon
resource "aws_eks_addon" "ebs_csi" {
  cluster_name = module.eks.cluster_name
  addon_name   = "aws-ebs-csi-driver"

  # Wait for both cluster and node group to be ready
  depends_on = [module.eks]
}

# Create the storage class with Terraform
data "kubernetes_storage_class" "gp2" {
metadata {
name = "gp2"
}
depends_on = [aws_eks_addon.ebs_csi]
}

# MongoDB Helm release with better error handling
resource "helm_release" "mongodb" {
  provider = helm.eks

  name       = "planit-mongo"
  chart      = "../helm/database"
  namespace  = "database"
  create_namespace = true

  # Better timeout and error handling
  timeout         = 600  # 10 minutes
  wait            = true
  cleanup_on_fail = true
  force_update    = true


  # Explicitly set persistence settings
  set {
    name  = "persistence.enabled"
    value = "true"
  }

  set {
    name  = "persistence.storageClass"
    value = data.kubernetes_storage_class.gp2.metadata[0].name
  }

  set {
    name  = "persistence.size"
    value = "8Gi"
  }

  # Reduce resource requirements to avoid scheduling issues
  set {
    name  = "resources.requests.memory"
    value = "256Mi"
  }

  set {
    name  = "resources.requests.cpu"
    value = "250m"
  }

  set {
    name  = "resources.limits.memory"
    value = "512Mi"
  }

  set {
    name  = "resources.limits.cpu"
    value = "500m"
  }

  depends_on = [
    module.eks,
    aws_eks_addon.ebs_csi,
    data.kubernetes_storage_class.gp2
  ]
}
data "kubernetes_secret" "mongo_root" {
  metadata {
    name      = "planit-mongo-mongodb"
    namespace = "database"
  }
  depends_on = [helm_release.mongodb]
}
# Backend Helm release (using your local chart)
resource "helm_release" "backend" {
  provider = helm.eks

  name       = "planit-backend"
  chart      = "../helm/backend"
  namespace  = "frontend"
  create_namespace = true

  timeout         = 300
  wait            = true
  cleanup_on_fail = true

  # Set MongoDB connection string using generated password
  set {
    name  = "env.MONGO_URI"
    value = "mongodb://root:${nonsensitive(data.kubernetes_secret.mongo_root.data["mongodb-root-password"])}@planit-mongo-mongodb.database.svc.cluster.local:27017/planitdb?authSource=admin"
  }

  # Set a secure JWT secret
  set {
    name  = "env.JWT_SECRET"
    value = random_password.jwt_secret.result
  }

  depends_on = [helm_release.mongodb]
}

# Frontend Helm release (using your local chart)
resource "helm_release" "frontend" {
  provider = helm.eks

  name       = "planit-frontend"
  chart      = "../helm/frontend"
  namespace  = "frontend"
  create_namespace = true

  timeout         = 300
  wait            = true
  cleanup_on_fail = true

  # Point frontend to backend service
  set {
    name  = "env.API_BASE_URL"
    value = "http://${data.kubernetes_service.nginx_ingress.status.0.load_balancer.0.ingress.0.hostname}/api"
  }

  set {
    name  = "service.targetPort"
    value = "3000"
  }

  set {
    name  = "ingress.enabled"
    value = "false"
  }

  set {
    name  = "service.selector.app"
    value = "planit-frontend"
  }

  depends_on = [helm_release.backend]
}

# Ingress Controller
resource "helm_release" "nginx_ingress" {
  provider = helm.eks

  name       = "nginx-ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  namespace  = "ingress-nginx"
  create_namespace = true

  timeout         = 300
  wait            = true
  cleanup_on_fail = true

  set {
    name  = "controller.service.type"
    value = "LoadBalancer"
  }

  depends_on = [module.eks]
}

data "kubernetes_service" "nginx_ingress" {
  metadata {
    name      = "nginx-ingress-ingress-nginx-controller"
    namespace = "ingress-nginx"
  }

  depends_on = [helm_release.nginx_ingress]
}
resource "kubectl_manifest" "ingress" {
  yaml_body = file("${path.module}/../helm/k8s-manifests/ingress.yaml")

  depends_on = [
    helm_release.frontend,
    helm_release.backend,
    helm_release.nginx_ingress
  ]
}
