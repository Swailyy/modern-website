# infrastructure/terraform/main.tf

# 1. Configurazione del Provider Cloud (Amazon Web Services)
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.5.0"
}

provider "aws" {
  region = "eu-west-3" # Configurato sul data center europeo di Parigi (vicino e a bassa latenza)
}

# 2. Creazione della Rete Isolata (VPC) per la sicurezza aziendale
resource "aws_vpc" "modern_website_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "modern-website-production-vpc"
  }
}

# 3. Creazione di una Sotto-rete pubblica per rendere il sito accessibile dal web
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.modern_website_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "eu-west-3a"
  tags = {
    Name = "modern-website-public-subnet"
  }
}

# 4. Configurazione del Firewall (Security Group) per blindare le porte di comunicazione
resource "aws_security_group" "server_sg" {
  name        = "modern-website-server-sg"
  description = "Consente il traffico web verso il container Docker"
  vpc_id      = aws_vpc.modern_website_vpc.id

  # Porta 80: Traffico HTTP standard per i visitatori del sito
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Porta 3000: La porta interna del nostro server Express Dockerizzato
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Connessioni in uscita illimitate per permettere al server di aggiornarsi
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 5. Creazione del Server Virtuale (Istanza EC2) su cui girerà Docker
resource "aws_instance" "web_server" {
  ami           = "ami-00c711575a4285c90" # Immagine ufficiale Ubuntu Server stabile per eu-west-3
  instance_type = "t3.micro"               # Configurazione economica ed efficiente, ideale per i test

  subnet_id              = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.server_sg.id]

  # Script di automazione: Appena il server si accende sul Cloud, installa Docker e avvia il progetto
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y docker.io docker-compose
              sudo systemctl start docker
              sudo systemctl enable docker
              EOF

  tags = {
    Name = "modern-website-production-server"
  }
}
