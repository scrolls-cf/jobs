---
kind: anti-pattern
topics: [jose, jwt, security, logging]
date: "2026-05-13"
---

# Do not log raw JWTs

- **Date:** 2026-05-13  
- **Source:** [docs/jose-for-agents.md](../../docs/jose-for-agents.md); see also [`../../../matrix/patterns/errors/jose-log-raw-tokens.md`](../../../matrix/patterns/errors/jose-log-raw-tokens.md)  
- **Topic:** jose, security  
- **Wrong:** Logging full `Authorization` values, `Cf-Access-Jwt-Assertion`, or decoded claims blobs in production logs.  
- **Why it fails:** Tokens are credentials; log aggregation widens blast radius.  
- **What to do instead:** Log correlation ids and outcome codes only; return minimal JSON errors from middleware.
