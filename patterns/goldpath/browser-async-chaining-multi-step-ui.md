---
kind: goldpath
topics: [browser, fetch, async, ux, gateway, workers]
date: "2026-05-15"
---

# Browser: async chaining for real multi-step progress

- **Date** — 2026-05-15
- **Topic** — client-side `async`/`await`, `fetch`, and honest step-by-step UI (e.g. “create repo” then “create worker”)

## Snippet or summary

When the user should **see** distinct phases (phase 1 finished, then phase 2 running), the browser must **await separate async units** and **update the UI between them**. The usual shape:

```javascript
setProgress("step one …");
const r1 = await fetch("/api/…", { body: JSON.stringify({ stage: "one", … }) });
if (!r1.ok) { setProgress("step one — error"); return; }
setProgress("step one — done — step two …");
const r2 = await fetch("/api/…", { body: JSON.stringify({ stage: "two", … }) });
if (!r2.ok) { setProgress("… — step two — error"); return; }
setProgress("… — step two — done");
```

Same idea with small `async function` helpers: `await createRepo()` then `await provisionWorker()` as long as each function **returns a Promise that resolves when that network leg completes**, and you **set labels before each await**.

**Pair the client with the server:** expose **one request per phase** (query flag, JSON `stage`, separate paths, etc.), or use **one long-lived connection** (SSE, `ReadableStream`, WebSocket) that emits events per phase. Do not rely on a single JSON response to arrive “halfway” through server work.

**Server atomicity is separate:** a downstream Worker may still expose **one** RPC that runs fork + Cloudflare + rollback internally (transactional). That is valid for **integrity**, but the **browser** only learns the outcome **once** when that call returns—so the UI is a single “in flight” state unless you add streaming or **split the client** into multiple calls as above.

## When to use

- Any form or dashboard where copy promises **ordered** outcomes (“repo created”, then “worker created”).
- Gateway flows that call fleet Workers in **multiple** backend phases (example: **`POST /api/gateway/create-repo`** with `stage: "github"` then `stage: "cloudflare"` in **scrollsmatrix**).

## Reference in this monorepo

- **scrollsmatrix:** [`../../../scrollsmatrix/public/assets/landing.js`](../../../scrollsmatrix/public/assets/landing.js) (`initMatrixGatewayRepoForm` submit handler).
- **Sad path (do not do this):** [`../errors/browser-single-fetch-fake-progress.md`](../errors/browser-single-fetch-fake-progress.md).
