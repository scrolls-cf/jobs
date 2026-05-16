---
kind: goldpath
topics: [cloudflare-workers, wrangler, typescript, assets, hono]
date: "2026-05-13"
---

# Cloudflare Workers + Wrangler (Scaffold)

- **Date:** 2026-05-13  
- **Source:** [docs/cloudflare-workers-for-agents.md](../../docs/cloudflare-workers-for-agents.md); [Get started — CLI](https://developers.cloudflare.com/workers/get-started/guide/)  
- **Topic:** Workers, Wrangler, TypeScript, assets  
- **Snippet or summary:** Worker entry in `src/index.ts`; `wrangler.jsonc` sets `main` and optional bindings. Run `npm run dev` / `npm run deploy`; after binding edits run `npm run cf-typegen`. ASSETS fallback lives in `handle()` next to `app.fetch`. **Local vars:** only **`.env`** + **`.env.example`** — no **`.dev.vars`**; `npm run dev` uses `wrangler dev --env-file .env` (see [docs/cloudflare-workers-for-agents.md](../../docs/cloudflare-workers-for-agents.md) “Local env files”).  
- **When to use:** Any change to deploy, bindings, or fetch wrapper in this package.

Full doc map: [Workers `llms.txt`](https://developers.cloudflare.com/workers/llms.txt).  
Avoid committing secrets to config: [`../errors/wrangler-secrets-in-config.md`](../errors/wrangler-secrets-in-config.md).
