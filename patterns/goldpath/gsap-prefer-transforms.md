---
kind: goldpath
topics: [gsap, performance, css]
date: "2026-05-13"
---

# GSAP — prefer transforms and `autoAlpha` for motion

- **Date:** 2026-05-13  
- **Source:** [docs/gsap-for-agents.md](../../docs/gsap-for-agents.md); `.cursor/skills/gsap-performance/SKILL.md`  
- **Topic:** GSAP, performance  
- **Snippet or summary:** Animate **`x` / `y` / `scale` / `rotation`** (and **`autoAlpha`**) instead of `top` / `left` / `width` / `margin` when the goal is smooth motion. Transforms map to compositor-friendly work; layout properties trigger reflow.

```js
gsap.to(".box", { x: 100, autoAlpha: 1, duration: 0.5, ease: "power2.out" });
```

- **When to use:** Any tween whose purpose is movement, fade, or scale on screen. For scroll-driven work, still call `ScrollTrigger.refresh()` after layout shifts (see **`gsap-scrolltrigger`** skill).

- **Cross-link (avoid):** [`../errors/gsap-layout-props-for-motion.md`](../errors/gsap-layout-props-for-motion.md)
