# jose — guide for agents (Scaffold)

**When to read this:** You are adding or changing JWT/JWKS/JWE code, importing `jose`, or wiring auth middleware in this package—open this digest first, then the upstream README for API details.

Canonical documentation: **[panva/jose](https://github.com/panva/jose)** on GitHub (README, `docs/`, cookbook). `jose` implements **JWT, JWS, JWE, JWK, JWKS** with **no dependencies**, tree-shakeable **ESM**, and explicit support for **Cloudflare Workers** among other Web-interoperable runtimes.

Use the upstream repo for API details; this file maps **this package** only.

## Where `jose` lives here

| Item | Location |
| ---- | -------- |
| Dependency | `package.json` → `jose` |
| Application usage | *Not wired in `src/` yet* — add verification or signing where needed (e.g. Hono middleware). |

For a **working Worker example** of Access-style JWT verification with `createRemoteJWKSet` + `jwtVerify`, see the sibling **Matrix** package: [`../../matrix/src/access.js`](../../matrix/src/access.js) and [`../../matrix/docs/jose-for-agents.md`](../../matrix/docs/jose-for-agents.md).

## Typical Worker usage

```ts
import { createRemoteJWKSet, jwtVerify } from 'jose'

const JWKS = createRemoteJWKSet(new URL('https://issuer.example/.well-known/jwks.json'))
await jwtVerify(token, JWKS, { issuer: 'https://issuer.example', audience: 'your-aud' })
```

Prefer **remote JWKS** with caching behavior from `createRemoteJWKSet` when the IdP rotates keys. Keep **issuer** and **audience** checks strict.

## TypeScript

Scaffold uses TypeScript; `jose` ships its own types. No extra `@types` package.

## Related patterns (this repo)

- Gold path: [`../patterns/goldpath/jose-remote-jwks-verification.md`](../patterns/goldpath/jose-remote-jwks-verification.md)  
- Avoid: [`../patterns/errors/jose-log-raw-tokens.md`](../patterns/errors/jose-log-raw-tokens.md)

## If something is missing

Read **[panva/jose — documentation](https://github.com/panva/jose#documentation)**. For Hono integration, run verification in `app.use('*', …)` or route-specific middleware and return `c.json` / `Response` on failure.
