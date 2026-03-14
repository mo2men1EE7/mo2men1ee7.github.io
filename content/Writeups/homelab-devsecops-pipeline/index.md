---
title: "HomeLab: Building a DevSecOps Pipeline with AWS, Terraform & GitHub Actions"
date: 2026-03-13
summary: "A full homelab project documenting how I built an automated DevSecOps pipeline — from IaC provisioning on AWS to SAST, container scanning, and secrets detection in CI/CD."
explore:
  - Project
  - DevOps
  - AWS
  - Misc
difficulty: "Medium"
hot: true
draft: false
---

## Project Overview

This project documents the end-to-end build of a personal DevSecOps pipeline running on AWS, orchestrated with Terraform and automated via GitHub Actions. The goal was to integrate security at every stage of the development lifecycle — from infrastructure provisioning to container deployment.

{{< warning "This is a homelab project. AWS resources were torn down after testing — never leave open S3 buckets, permissive IAM roles, or unauthenticated ECR repositories in production." >}}

## Architecture

The pipeline consists of four main stages:

```random
[Code Push] → [GitHub Actions CI] → [Security Scans] → [Deploy to AWS ECS]
```

- **GitHub Actions** handles the CI/CD orchestration
- **Terraform** provisions the AWS infrastructure (VPC, ECS, ECR, IAM)
- **Trivy** scans container images for CVEs before push
- **Semgrep** runs SAST on every PR
- **TruffleHog** detects secrets in commits

## Infrastructure as Code

### Terraform — VPC + ECS Cluster

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name = "devsecops-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
}

resource "aws_ecs_cluster" "main" {
  name = "devsecops-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
```

### IAM — Least Privilege Task Role

```hcl
resource "aws_iam_role" "ecs_task_role" {
  name = "ecs-task-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
name: DevSecOps Pipeline

on:
  push:
    branches: [main]
  pull_request:

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: TruffleHog — Secret Scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}

      - name: Semgrep — SAST
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/owasp-top-ten

      - name: Build Docker Image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Trivy — Container Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: myapp:${{ github.sha }}
          severity: CRITICAL,HIGH
          exit-code: 1

      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS \
            --password-stdin $ECR_REGISTRY
          docker tag myapp:${{ github.sha }} $ECR_REGISTRY/myapp:latest
          docker push $ECR_REGISTRY/myapp:latest
```

## Security Findings During Build

During the build phase, several issues were intentionally introduced to test the pipeline detection:

| Finding | Tool | Severity | Status |
|---|---|---|---|
| Hardcoded AWS key in `.env` | TruffleHog | CRITICAL | Blocked |
| `pip install` without hash pinning | Semgrep | MEDIUM | Warning |
| Base image `python:3.9` CVE-2023-24329 | Trivy | HIGH | Blocked |
| Over-permissive IAM `*:*` policy | Checkov | HIGH | Blocked |

## Lessons Learned

Running security scans in CI/CD shifts detection left significantly. The most impactful finding was catching a hardcoded API key that was accidentally committed in a `.env` file — TruffleHog caught it before it ever reached the remote branch.

The Trivy container scan also forced switching from `python:3.9-slim` to `python:3.12-slim-bookworm` which had no critical CVEs at time of writing.

## Cleanup

All AWS resources were destroyed post-testing with:

```bash
terraform destroy -auto-approve
```

Always verify with `aws resourcegroupstaggingapi get-resources` that nothing was left behind.
