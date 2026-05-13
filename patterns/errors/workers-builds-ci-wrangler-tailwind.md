---
kind: anti-pattern
topics: [workers, wrangler, workers-builds, ci, tailwind]
date: "2026-05-13"
---

# Relying on Wrangler `[build]` or bare `wrangler deploy` for Workers Builds + Tailwind

- **Date:** 2026-05-13  
- **Context:** Cloudflare **Workers Builds** (Git-connected CI) and projects that compile CSS (e.g. Tailwind CLI) before upload.  
- **Bad pattern** — Assuming **`wrangler.toml` `[build].command`** always runs in CI the same as locally, and setting the dashboard **deploy command** to **`npx wrangler deploy` only**, with no `npm run build` in **`package.json` deploy** or in a separate dashboard build step. Pinning **`.nvmrc`** to a **Node major** the [build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) does not provision reliably.  
- **Why it is wrong** — Workers Builds [does not honor Custom builds (`[build]`) from Wrangler](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) the way local Wrangler may; deploy can skip Tailwind and ship stale or empty CSS. Wrong Node pin can fail the job before Wrangler runs.  
- **Fix / reference** — Prefer [`../goldpath/workers-builds-ci-deploy-command.md`](../goldpath/workers-builds-ci-deploy-command.md); keep package-specific notes in [`../../docs/cloudflare-workers-for-agents.md`](../../docs/cloudflare-workers-for-agents.md) when present.
