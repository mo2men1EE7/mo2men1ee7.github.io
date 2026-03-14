---
title: AWS S3 Misconfiguration Cheatsheet
date: 2026-01-28
summary: Quick reference for S3 misconfigs — detection and remediation.
explore:
  - Cheatsheet
  - AWS
draft: false
---

## Quick Checklist

| Check | Command |
|-------|---------|
| List buckets | `aws s3 ls` |
| Check ACL | `aws s3api get-bucket-acl --bucket BUCKET` |
| List public | `aws s3 ls s3://BUCKET --no-sign-request` |
