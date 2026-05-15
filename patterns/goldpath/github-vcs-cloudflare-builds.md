---
kind: goldpath
topics: [github, cloudflare, workers-builds, ci, deploy, fleet]
date: "2026-05-15"
---

# GitHub for VCS only; Cloudflare Workers Builds (gold path)

- **Date** — 2026-05-15
- **Source** — [Workers Builds — Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) · [Git integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/) · Cursor rule [`.cursor/rules/cloudflare-workers-builds-vcs-only.mdc`](../../.cursor/rules/cloudflare-workers-builds-vcs-only.mdc)
- **Topic** — where **build and deploy** run for fleet Workers

## Snippet or summary

1. **GitHub** — **version control** (and collaboration) for fleet repos forked from **`scrolls-cf/scaffold`**. Worker **build and deploy** are **not** standardized on **hosted CI defined in the repo**; use Cloudflare’s pipeline instead.
2. **Cloudflare** — connect the repo in the Cloudflare dashboard; **Workers Builds** watches Git and runs the **Cloudflare build pipeline** (install / build / `wrangler deploy` or your **`npm run deploy`** chain). Treat that as the canonical “CI” for Workers.
3. **Do not** add **git-provider CI** for deploy-by-default unless the product owner documents an exception (e.g. org policy requiring a separate check that cannot run on Workers Builds).

## When to use

Any time someone asks for **hosted CI on the git provider for deploy**, **Wrangler-driven pipelines outside Cloudflare**, or **CI secrets on the git host** for a fleet Worker — redirect to **Cloudflare’s connected-repo pipeline** and [`workers-builds-ci-deploy-command.md`](./workers-builds-ci-deploy-command.md).
