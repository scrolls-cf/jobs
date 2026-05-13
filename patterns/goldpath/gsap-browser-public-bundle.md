---
kind: goldpath
topics: [gsap, animation, browser, workers, public]
date: "2026-05-13"
---

# GSAP — browser-only in this Worker + static assets layout (Scaffold)

- **Date:** 2026-05-13  
- **Source:** [docs/gsap-for-agents.md](../../docs/gsap-for-agents.md); [greensock/GSAP](https://github.com/greensock/GSAP); [GSAP docs](https://gsap.com/docs/v3/)  
- **Topic:** gsap, Cloudflare Workers, static `public/` assets  
- **Snippet or summary:** Keep **`gsap` imports and tween/ScrollTrigger setup in client code** (scripts bundled or served from `public/`, or a future Vite/browser bundle). The Worker entry **`src/index.ts`** should only serve HTML/assets and API routes—**no `import 'gsap'` in the Worker** unless you intentionally add a DOM-capable client runtime there. After `npm install gsap`, register optional plugins once before use, for example:
  ```js
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  ```
  Prefer **transforms** (`x`, `y`, `scale`, `rotation`) and **`autoAlpha`** over continuous layout tweens; kill or revert tweens and `ScrollTrigger.getAll().forEach((st) => st.kill())` (or `gsap.context`) when tearing down a view. Deep behavior: vendored **`.cursor/skills/gsap-*`** and [gsap-skills-llms.txt](../../docs/gsap-skills-llms.txt).  
- **When to use:** Any in-browser motion for this package; pair with skills for timelines, ScrollTrigger, and React (`gsap-react`) if you add a React client.

Mistakes to avoid: [`../errors/gsap-in-worker-isolate.md`](../errors/gsap-in-worker-isolate.md), [`../errors/gsap-plugins-not-registered.md`](../errors/gsap-plugins-not-registered.md).
