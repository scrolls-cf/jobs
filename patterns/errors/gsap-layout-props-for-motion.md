---
kind: anti-pattern
topics: [gsap, performance, css]
date: "2026-05-13"
---

# Do not drive motion with layout properties

- **Date:** 2026-05-13  
- **Source:** [docs/gsap-for-agents.md](../../docs/gsap-for-agents.md); `.cursor/skills/gsap-performance/SKILL.md`  
- **Topic:** GSAP, performance  
- **Wrong:** Tweening **`top`**, **`left`**, **`width`**, **`height`**, **`margin`**, or other layout-affecting props for continuous motion (especially many elements or scroll-scrubbed timelines).  
- **Why it fails:** Forces **layout / paint** work each frame → jank, poor INP, and fighting the browser’s layout engine.  
- **What to do instead:** Use **`x` / `y` / `scale` / `rotation` / `autoAlpha`**; reserve layout tweens for rare one-off layout animations with eyes open on cost. See [`../goldpath/gsap-prefer-transforms.md`](../goldpath/gsap-prefer-transforms.md).
