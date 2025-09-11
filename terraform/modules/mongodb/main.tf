terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }
}

# Namespace for MongoDB
resource "kubernetes_namespace" "mongodb" {
  metadata {
    name = "mongodb"
  }
}

# MongoDB Helm chart
resource "helm_release" "mongodb" {
  name       = "planit-mongo"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "mongodb"
  version    = "14.4.3"
  namespace  = kubernetes_namespace.mongodb.metadata[0].name

  set {
    name  = "auth.rootPassword"
    value = var.mongodb_root_password
  }

  set {
    name  = "auth.username"
    value = var.mongodb_username
  }

  set {
    name  = "auth.password"
    value = var.mongodb_password
  }

  set {
    name  = "auth.database"
    value = var.mongodb_database
  }

  set {
    name  = "architecture"
    value = "standalone"
  }

  set {
    name  = "persistence.size"
    value = "8Gi"
  }

  set {
    name  = "service.type"
    value = "ClusterIP"
  }

  set {
    name  = "service.port"
    value = "27017"
  }
}

# Outputs
output "mongodb_service_name" {
  value = "${helm_release.mongodb.name}-mongodb.${kubernetes_namespace.mongodb.metadata[0].name}.svc.cluster.local"
}

output "mongodb_connection_string" {
  value     = "mongodb://${var.mongodb_username}:${var.mongodb_password}@${helm_release.mongodb.name}-mongodb.${kubernetes_namespace.mongodb.metadata[0].name}.svc.cluster.local:27017/${var.mongodb_database}?authSource=admin"
  sensitive = true
}
