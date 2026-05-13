---
kind: goldpath
topics: [workers, wrangler, workers-builds, ci, tailwind]
date: "2026-05-13"
---

# Workers Builds: deploy command and Node for Tailwind + Wrangler

- **Date:** 2026-05-13  
- **Source:** [Workers Builds — Configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) · [Build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) · [Custom builds (local Wrangler)](https://developers.cloudflare.com/workers/wrangler/custom-builds/)  
- **Topic:** Workers Builds, Tailwind CLI, `package.json` scripts  
- **Snippet or summary:**  
  - In **`package.json`**, make **`deploy`** (and usually **`dev`**) run **`npm run build`** (or your CSS script) **before** **`wrangler deploy` / `wrangler dev`**, e.g. `npm run build && wrangler deploy`.  
  - In the Cloudflare dashboard, set the **deploy command** to **`npm run deploy`** or **`npm ci && npm run deploy`** — not bare **`npx wrangler deploy`** unless you also run CSS in a dashboard **Build command**.  
  - Pin **`.nvmrc`** to a **Node major** documented for the Workers build image (e.g. **22** per build-image table), not an arbitrary bleeding-edge major, unless you have confirmed image support.  
- **When to use:** Any Worker that builds static assets or CSS in-repo before `wrangler deploy`, especially when using Workers Builds. Pair with [`../errors/workers-builds-ci-wrangler-tailwind.md`](../errors/workers-builds-ci-wrangler-tailwind.md). Repo-specific layout: [`./cloudflare-workers-wrangler-scaffold.md`](./cloudflare-workers-wrangler-scaffold.md).
