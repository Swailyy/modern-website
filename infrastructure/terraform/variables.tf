# infrastructure/terraform/variables.tf

variable "environment" {
  description = "Ambiente di esecuzione del software"
  type        = "string"
  default     = "production"
}

variable "aws_region" {
  description = "Regione geografica del Cloud AWS"
  type        = string
  default     = "eu-west-3"
}
