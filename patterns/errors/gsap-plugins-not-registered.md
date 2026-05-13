---
kind: anti-pattern
topics: [gsap, scrolltrigger, plugins]
date: "2026-05-13"
---

# GSAP plugins used without `registerPlugin`

- **Date:** 2026-05-13  
- **Context:** Client-side GSAP in `public/` or any browser bundle in this repo.  
- **Source:** [docs/gsap-for-agents.md](../../docs/gsap-for-agents.md); **gsap-plugins** skill under `.cursor/skills/gsap-plugins/`  
- **Bad pattern** — `import { ScrollTrigger } from 'gsap/ScrollTrigger'` then using `scrollTrigger: { ... }` in tweens **without** calling `gsap.registerPlugin(ScrollTrigger)` (same for Draggable, Flip, MotionPathPlugin, etc.).  
- **Why it is wrong** — Unregistered plugins do not hook correctly; ScrollTrigger may not drive scrub/pin as expected or may warn/fail depending on build.  
- **What to do instead:** Call **`gsap.registerPlugin(ScrollTrigger, ...)` once** at app bootstrap before creating tweens that rely on those plugins. See [`../goldpath/gsap-browser-public-bundle.md`](../goldpath/gsap-browser-public-bundle.md).
