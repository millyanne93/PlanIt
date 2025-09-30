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


output "grafana_url" {
  description = "Grafana dashboard URL"
  value       = "http://${helm_release.kube_prometheus_stack.name}-grafana.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local"
}

output "prometheus_url" {
  description = "Prometheus UI URL"
  value       = "http://${helm_release.kube_prometheus_stack.name}-prometheus.${kubernetes_namespace.monitoring.metadata[0].name}.svc.cluster.local:9090"
}

output "loki_url" {
  description = "Loki logs URL"
  value       = "http://${helm_release.loki.name}.${kubernetes_namespace.logging.metadata[0].name}.svc.cluster.local:3100"
}
