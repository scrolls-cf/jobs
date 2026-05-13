# Project docs (agent-oriented)

**Purpose:** Notes under `docs/` are **for coding agents first**: small indexes, stable links, and digests so you can load the right file without scanning the whole tree. Humans benefit too.

**How to use this folder:** Open this `README.md`, use **Navigate by task** below, then open only the linked file(s). Prefer subfolder `README.md` files as sub-indexes before long mirrors.

## Navigate by task

| Goal | Read first |
|------|------------|
| JWT / JWE / JWKS on Workers (`jose`) | [jose-for-agents.md](./jose-for-agents.md) · [panva/jose](https://github.com/panva/jose) |
| HTTP routing / middleware on Workers (`src/index.ts`) | [hono-for-agents.md](./hono-for-agents.md) · [hono.dev](https://hono.dev/) |
| Wrangler / Workers (dev, deploy, bindings, typegen) | [cloudflare-workers-for-agents.md](./cloudflare-workers-for-agents.md) · [Get started — CLI](https://developers.cloudflare.com/workers/get-started/guide/) · [Workers llms.txt](https://developers.cloudflare.com/workers/llms.txt) |
| Tailwind v4, Typography (`@tailwindcss/typography`, `prose`) | [tailwind-typography-for-agents.md](./tailwind-typography-for-agents.md) · [tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography) · [npm](https://www.npmjs.com/package/@tailwindcss/typography) |
| Tailwind + Vite (optional; not in worker-only manifest yet) | [tailwind-vite.md](./tailwind-vite.md) |
| DaisyUI with Tailwind v4 (optional) | [daisyui.md](./daisyui.md) · [component gallery](https://daisyui.com/components/) |
| Pick an external skill / vendor topic | [awesome-agent-skills.md](./awesome-agent-skills.md) → broad offline search: [awesome-agent-skills-catalog-full.md](./awesome-agent-skills-catalog-full.md) |
| Context engineering (attention, tools, memory patterns) | [context-engineering/README.md](./context-engineering/README.md) |

## How to search Cloudflare Workers docs

Start from [cloudflare-workers-for-agents.md](./cloudflare-workers-for-agents.md) for links and this repo’s layout. To find a specific Workers or Wrangler page, keyword-search [Workers `llms.txt`](https://developers.cloudflare.com/workers/llms.txt) before mirroring long excerpts into `docs/`.

## How to search Tailwind CSS & Typography docs

Start from [tailwind-typography-for-agents.md](./tailwind-typography-for-agents.md) for this package’s `prose` / CLI wiring. For Typography modifiers and examples, read the [tailwindcss-typography README](https://github.com/tailwindlabs/tailwindcss-typography). For Tailwind v4 core (`@source`, `@plugin`, CLI), use [Tailwind CSS documentation](https://tailwindcss.com/docs) in-product search rather than vendoring long API mirrors into `docs/`.

## Stack reference (short)

- **Hono** — HTTP on Workers  
- **jose** — JWT / JWE / JWKS on Workers; [agent guide](./jose-for-agents.md) · [panva/jose](https://github.com/panva/jose)  
- **Wrangler / Cloudflare Workers** — local dev, deploy, typegen, bindings; [agent guide](./cloudflare-workers-for-agents.md) · [CLI getting started](https://developers.cloudflare.com/workers/get-started/guide/) · [Workers llms.txt](https://developers.cloudflare.com/workers/llms.txt)  
- **Tailwind + Vite, DaisyUI** — optional styling stack; [Typography agent guide](./tailwind-typography-for-agents.md) · [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) · [npm](https://www.npmjs.com/package/@tailwindcss/typography)  

When behavior depends on a dependency, **read or extend the matching `docs/` file before guessing APIs from memory.**

## Conventions (summary)

- **One index per folder:** keep `README.md` as the map; long content gets its own file and a one-line pointer here.  
- **Large mirrors:** one canonical bulk file + short “how to search” notes in the index.  
- **Patterns:** reusable code lessons also land in `patterns/` per `.cursor/rules` (see `docs-derived-patterns.mdc`).
