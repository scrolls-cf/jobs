---
kind: anti-pattern
topics: [gsap, scrolltrigger]
date: "2026-05-13"
---

# ScrollTrigger without `registerPlugin`

- **Date:** 2026-05-13  
- **Source:** [docs/gsap-for-agents.md](../../docs/gsap-for-agents.md); `.cursor/skills/gsap-scrolltrigger/SKILL.md`  
- **Topic:** GSAP, ScrollTrigger  
- **Wrong:** `import { ScrollTrigger } from "gsap/ScrollTrigger"` then using `scrollTrigger: { … }` on tweens **without** `gsap.registerPlugin(ScrollTrigger)`.  
- **Why it fails:** GSAP plugins do not activate until registered; ScrollTrigger may not run or may warn, and scrub/pin behavior will not match expectations.  
- **What to do instead:** Call `gsap.registerPlugin(ScrollTrigger)` **once** at app entry (same module graph as your tweens). After DOM/layout changes, follow the **`gsap-scrolltrigger`** skill for `ScrollTrigger.refresh()`. See [`../goldpath/gsap-static-client-cloudflare-worker.md`](../goldpath/gsap-static-client-cloudflare-worker.md).
