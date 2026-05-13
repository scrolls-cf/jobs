---
kind: anti-pattern
topics: [gsap, workers, cloudflare, dom]
date: "2026-05-13"
---

# Do not run GSAP inside the Worker isolate

- **Date:** 2026-05-13  
- **Context:** `src/index.ts` (Scaffold Hono worker) or any Worker-only module without a DOM.  
- **Source:** [docs/gsap-for-agents.md](../../docs/gsap-for-agents.md)  
- **Bad pattern** — `import gsap from 'gsap'` (or plugin imports) inside the Worker entry and calling `gsap.to(...)`, `ScrollTrigger.create(...)`, etc., expecting the same behavior as in a browser.  
- **Why it is wrong** — The Workers runtime has **no `document` / `window`** for normal DOM tweens; GSAP is built for targets the library can animate (typically DOM nodes in a browser). You get runtime errors or meaningless no-ops.  
- **What to do instead:** Run GSAP from **client scripts** under `public/` (or a dedicated browser bundle). See [`../goldpath/gsap-browser-public-bundle.md`](../goldpath/gsap-browser-public-bundle.md).
