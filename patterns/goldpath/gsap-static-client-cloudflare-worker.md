---
kind: goldpath
topics: [gsap, scrolltrigger, cloudflare-workers, browser]
date: "2026-05-13"
---

# GSAP — run in the browser, not the Worker (Scaffold)

- **Date:** 2026-05-13  
- **Source:** [docs/gsap-for-agents.md](../../docs/gsap-for-agents.md); Cursor skills `.cursor/skills/gsap-*` from [greensock/gsap-skills](https://github.com/greensock/gsap-skills)  
- **Topic:** GSAP, static assets, Workers  
- **Snippet or summary:** Load GSAP from **client-side** code under `public/` (or a future bundled client entry). The Worker (`src/index.ts`) only **serves** HTML/CSS/JS; it does not execute `gsap` against a document. Register plugins once per page, prefer transform props, and refresh ScrollTrigger after layout changes.

```html
<script type="module">
  import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js";
  import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js";
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".hero", { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" });
</script>
```

(Prefer **npm `gsap`** + your own build pipeline when you add one; keep imports on the **browser** graph.)

- **When to use:** Any in-browser motion for this package. Read **`gsap-core`** / **`gsap-scrolltrigger`** skills before wiring ScrollTrigger or timelines.

- **Cross-link (avoid):** [`../errors/gsap-in-worker-isolate.md`](../errors/gsap-in-worker-isolate.md), [`../errors/gsap-scrolltrigger-without-registerplugin.md`](../errors/gsap-scrolltrigger-without-registerplugin.md), [`../errors/gsap-layout-props-for-motion.md`](../errors/gsap-layout-props-for-motion.md)

- **Related gold path:** [`gsap-prefer-transforms.md`](./gsap-prefer-transforms.md)
