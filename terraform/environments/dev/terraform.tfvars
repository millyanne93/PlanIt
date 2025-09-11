# terraform/environments/dev/terraform.tfvars
aws_region    = "us-east-1"
cluster_name  = "planit-dev"
cluster_version = "1.28"

vpc_cidr = "10.0.0.0/16"
azs      = ["us-east-1a", "us-east-1b"]

private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

mongodb_username = "appuser"
mongodb_database = "planitdb"
