---
kind: goldpath
topics: [jose, jwt, jwks, hono, workers]
date: "2026-05-13"
---

# jose — remote JWKS on Workers (Scaffold)

- **Date:** 2026-05-13  
- **Source:** [docs/jose-for-agents.md](../../docs/jose-for-agents.md); canonical Worker example in sibling package [`../../../scrollsmatrix/src/access.js`](../../../scrollsmatrix/src/access.js)  
- **Topic:** jose, Hono, Workers  
- **Snippet or summary:** Use `createRemoteJWKSet` + `jwtVerify` with strict `issuer` and `audience`. Run checks in Hono `app.use('*', …)` before route handlers.  
- **When to use:** Adding JWT or OIDC verification in this worker; mirror the scrollsmatrix worker’s Access flow if using Cloudflare Access headers.

Upstream API details: [panva/jose](https://github.com/panva/jose).
