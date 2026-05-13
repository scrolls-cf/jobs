# Hono — guide for agents (Scaffold)

**When to read this:** You are adding or changing routes, middleware, or `c` usage in `src/index.ts`—read this digest first, then [Hono](https://hono.dev/) for API details.

Official site and manuals: **[Hono — Web application framework](https://hono.dev/)** (routing, context `c`, middleware, helpers, Cloudflare Workers adapter). Use that as the source of truth for APIs; this file only maps **this repo**.

## Where Hono lives here

| Item | Location |
| ---- | -------- |
| Worker + Hono app | `src/index.ts` |
| Wrangler entry | `wrangler.toml` (see `main` in that file) |
| Binding types | `CloudflareBindings` — generate with `npm run cf-typegen` after changing bindings |
| Dependency | `package.json` → `hono` |

## Runtime and adapter

- Target is **Cloudflare Workers**. Follow [Hono’s docs](https://hono.dev/) for Workers-specific patterns (`app.fetch(request, env, ctx)`, bindings on `c.env`).
- This package uses **TypeScript**. The app is declared as `new Hono<{ Bindings: CloudflareBindings }>()` so `c.env` is typed.

## Patterns used in this worker

1. **Routes** — `app.get`, `app.post`, etc. Example JSON: `c.json({ … })`. For bodies: `await c.req.json()` inside `try/catch`; return `c.json({ error: '…' }, 400)` on parse errors.
2. **Static assets** — `handle()` runs `await app.fetch(request, env, ctx)`. If the response is **404** and the method is **GET** or **HEAD** and **`env.ASSETS`** exists, the request is passed to **`env.ASSETS.fetch(request)`**. Otherwise the Hono response (often 404) is returned as-is.

When adding routes, preserve this fallback if the Worker is deployed with an assets binding.

## Commands

- Dev: `npm run dev`
- Deploy: `npm run deploy`
- Types after binding changes: `npm run cf-typegen`

## If something is missing

Prefer [hono.dev](https://hono.dev/) (Docs / Examples) over guessing. For `wrangler.toml` bindings and `cf-typegen`, use Cloudflare Wrangler documentation.
