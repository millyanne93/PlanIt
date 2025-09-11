output "cluster_name" {
  description = "EKS cluster name"
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "cluster_certificate_authority_data" {
  description = "EKS cluster CA certificate"
  value       = module.eks.cluster_certificate_authority_data
  sensitive   = true
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "mongodb_connection_string" {
  description = "MongoDB connection string"
  value = "mongodb://root:${nonsensitive(data.kubernetes_secret.mongo_root.data["mongodb-root-password"])}@planit-mongo-mongodb.database.svc.cluster.local:27017/planitdb?authSource=admin"
  sensitive   = true
}
