# Cloudflare Workers + Wrangler — guide for agents (Scaffold)

**When to read this:** You are changing deploy config, bindings, typegen, local dev, or the Worker entry in this package—read this digest first, then Cloudflare’s docs for depth.

## Canonical upstream docs

- **Getting started (CLI):** [Get started — CLI](https://developers.cloudflare.com/workers/get-started/guide/) — Wrangler, `wrangler dev`, first `fetch` handler, `wrangler deploy`, `*.workers.dev`.
- **Doc index (discovery):** [Workers `llms.txt`](https://developers.cloudflare.com/workers/llms.txt) — machine-oriented list of Workers doc URLs; use it to find the right page before guessing.
- **Wrangler:** [Install and update](https://developers.cloudflare.com/workers/wrangler/install-and-update/) · [`wrangler dev`](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) · [`wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) · [Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/).
- **Runtime:** [`fetch` handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/) · [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/).

This file does **not** duplicate those guides; it maps **this repo**.

## Where Workers + Wrangler live here

| Item | Location |
| ---- | -------- |
| Wrangler config | `wrangler.jsonc` (`main` → `src/index.ts`) |
| Worker implementation | `src/index.ts` (Hono + ASSETS fallback on 404) |
| Binding types | `npm run cf-typegen` → `CloudflareBindings` (after editing `wrangler.jsonc`) |
| Static assets | `assets` block → `public/`, binding `ASSETS` |
| Secrets / vars | Use `[vars]` in `wrangler.jsonc` only for **non-secret** values; production secrets via `wrangler secret put …` ([Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)). |

## Commands (this package)

| Script | Role |
| ------ | ---- |
| `npm run dev` | Builds CSS then `wrangler dev` |
| `npm run deploy` | Builds CSS then `wrangler deploy` |
| `npm run cf-typegen` | `wrangler types --env-interface CloudflareBindings` |

## Related patterns (this repo)

- Gold path: [`../patterns/goldpath/cloudflare-workers-wrangler-scaffold.md`](../patterns/goldpath/cloudflare-workers-wrangler-scaffold.md)  
- Gold path (fleet CI): [`../patterns/goldpath/github-vcs-cloudflare-builds.md`](../patterns/goldpath/github-vcs-cloudflare-builds.md) — GitHub for VCS; **Workers Builds** on Cloudflare for deploy.  
- Avoid: [`../patterns/errors/wrangler-secrets-in-config.md`](../patterns/errors/wrangler-secrets-in-config.md)

## If something is missing

Start from the [CLI getting started guide](https://developers.cloudflare.com/workers/get-started/guide/), then narrow with [Workers `llms.txt`](https://developers.cloudflare.com/workers/llms.txt) and the Wrangler pages above.
