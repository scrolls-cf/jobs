---
kind: anti-pattern
topics: [wrangler, cloudflare-workers, secrets, security]
date: "2026-05-13"
---

# Do not commit production secrets in Wrangler config or tracked env files

- **Date:** 2026-05-13  
- **Source:** [docs/cloudflare-workers-for-agents.md](../../docs/cloudflare-workers-for-agents.md); [Define secrets](https://developers.cloudflare.com/workers/configuration/secrets/)  
- **Topic:** Wrangler, Workers, security  
- **Wrong:** Putting API keys, signing keys, or production tokens in `wrangler.jsonc` `[vars]` (or committing a filled `.env` / `.dev.vars` with secrets) so they land in git history.  
- **Why it fails:** Config is shared and logged; rotation is painful; compliance breaks.  
- **What to do instead:** Use `wrangler secret put <NAME>` (and non-secret defaults in `[vars]` only). See Cloudflare’s [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) documentation. Prefer [`../goldpath/cloudflare-workers-wrangler-scaffold.md`](../goldpath/cloudflare-workers-wrangler-scaffold.md) for where this project wires Wrangler.
