---
title: "Project: Securing a DevOps Pipeline — AWS CodePipeline Hardening"
date: 2026-03-13
summary: "A personal project documenting the full hardening of an AWS CodePipeline deployment — from IAM least-privilege to secrets scanning, SAST integration, and container image signing."
explore:
  - Project
  - DevOps
  - AWS
  - Misc
difficulty: "Medium"
hot: true
draft: false
---

## Overview

This is a personal project documenting the process of securing a CI/CD pipeline built on **AWS CodePipeline**, **CodeBuild**, and **ECR**. The goal was to apply security best practices at every stage — from source to deploy — without breaking the existing workflow.

{{< warning "This writeup documents a personal lab environment. IAM policies, account IDs, and resource ARNs have been anonymised." >}}

## Architecture

The pipeline consists of four stages:

- **Source** — GitHub repository via CodeStar connection
- **Build** — AWS CodeBuild running Docker image builds
- **Test** — SAST via Semgrep + secrets scanning via Trufflehog
- **Deploy** — ECS Fargate via rolling deployment

## Stage 1 — IAM Least Privilege

The default CodePipeline service role had `AdministratorAccess`. First step was scoping it down.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "arn:aws:codebuild:eu-west-1:*:project/my-project"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:GetBucketVersioning"
      ],
      "Resource": "arn:aws:s3:::my-pipeline-artifacts/*"
    }
  ]
}
```

## Stage 2 — Secrets Scanning

Integrated **Trufflehog** as a pre-build step in CodeBuild to block secrets from reaching the build stage.

```bash
trufflehog git file://. \
  --since-commit HEAD~1 \
  --only-verified \
  --fail
```

Build fails immediately if any verified secret is detected — no deploy occurs.

## Stage 3 — SAST with Semgrep

Added Semgrep to the test stage targeting the `p/owasp-top-ten` and `p/secrets` rulesets.

```yaml
phases:
  build:
    commands:
      - semgrep --config=p/owasp-top-ten --config=p/secrets --error .
```

## Stage 4 — Container Image Signing

Used **AWS Signer** with `cosign` to sign every image pushed to ECR, and enforced signature verification at the ECS task definition level via OPA policies.

```bash
cosign sign \
  --key awskms:///arn:aws:kms:eu-west-1:123456789:key/my-key \
  123456789.dkr.ecr.eu-west-1.amazonaws.com/my-app:latest
```

## Results

| Control | Before | After |
|---|---|---|
| IAM permissions | AdministratorAccess | Scoped to 6 actions |
| Secrets detection | None | Trufflehog on every commit |
| SAST | None | Semgrep OWASP Top 10 |
| Image signing | None | cosign + KMS |

## Takeaways

Even a simple pipeline accumulates significant attack surface when left at defaults. The biggest win was IAM scoping — removing `AdministratorAccess` from the pipeline role eliminates an entire lateral movement path if CodeBuild is ever compromised.
