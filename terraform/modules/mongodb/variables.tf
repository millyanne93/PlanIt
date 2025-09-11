variable "mongodb_root_password" {
  description = "MongoDB root password"
  type        = string
  sensitive   = true
}

variable "mongodb_username" {
  description = "MongoDB application username"
  type        = string
  default     = "appuser"
}

variable "mongodb_password" {
  description = "MongoDB application user password"
  type        = string
  sensitive   = true
}

variable "mongodb_database" {
  description = "MongoDB database name"
  type        = string
  default     = "planitdb"
}
