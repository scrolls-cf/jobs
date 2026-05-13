# GSAP — guide for agents (Scaffold)

**When to read this:** You are adding or changing motion, timelines, scroll-linked animation, or DOM tweening in this package. Open this digest first, then load the matching **Cursor skill** under `.cursor/skills/` (official [greensock/gsap-skills](https://github.com/greensock/gsap-skills)).

Canonical library docs: **[GSAP](https://gsap.com/docs/v3/)**. GSAP targets the **browser DOM** (or frameworks with a DOM). The Cloudflare Worker (`src/index.ts`) serves static assets; **run GSAP in client-side scripts** bundled or linked from `public/`, not inside the Worker isolate unless you deliberately use a headless DOM.

## Where GSAP lives here

| Item | Location |
| ---- | -------- |
| npm dependency | `package.json` → `gsap` |
| Agent skills (SKILL.md per topic) | `.cursor/skills/gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-performance`, `gsap-frameworks` |
| Skill index (short triggers, mirrored from upstream) | [gsap-skills-llms.txt](./gsap-skills-llms.txt) |
| Static HTML (no GSAP wired yet) | `public/index.html` |

## How agents should use the vendored skills

1. Skim [gsap-skills-llms.txt](./gsap-skills-llms.txt) to pick **one** skill id (for example `gsap-scrolltrigger` for ScrollTrigger).
2. Read **`.cursor/skills/<id>/SKILL.md`** for patterns, `registerPlugin`, and cleanup rules.
3. Prefer **transforms** (`x`, `y`, `scale`, `rotation`) and **`autoAlpha`** over layout-heavy properties; follow **`gsap-performance`** when tuning.

## Install and plugins

Install from the public **`gsap`** package only. Former Club plugins are **included in the same npm package** now; no private registry or auth token. See **`gsap-plugins`** skill for `registerPlugin` and plugin-specific APIs.

## React (optional)

This scaffold does not ship **`@gsap/react`** yet. If you add React client code, follow **`gsap-react`** (`useGSAP`, `gsap.context`, scoped selectors, cleanup). Add `@gsap/react` to dependencies when you introduce it.

## Related patterns (this repo)

- Gold path: [`../patterns/goldpath/gsap-browser-public-bundle.md`](../patterns/goldpath/gsap-browser-public-bundle.md)  
- Avoid: [`../patterns/errors/gsap-in-worker-isolate.md`](../patterns/errors/gsap-in-worker-isolate.md) · [`../patterns/errors/gsap-plugins-not-registered.md`](../patterns/errors/gsap-plugins-not-registered.md)

## Updating the skills

Skills were copied from [greensock/gsap-skills](https://github.com/greensock/gsap-skills). To refresh: clone or pull that repo and replace the `gsap-*` folders under `.cursor/skills/`, and replace `docs/gsap-skills-llms.txt` from `skills/llms.txt`.

## Related patterns (this repo)

- Gold path — client-side GSAP with Workers: [`../patterns/goldpath/gsap-static-client-cloudflare-worker.md`](../patterns/goldpath/gsap-static-client-cloudflare-worker.md)  
- Gold path — transforms / `autoAlpha`: [`../patterns/goldpath/gsap-prefer-transforms.md`](../patterns/goldpath/gsap-prefer-transforms.md)  
- Avoid — GSAP in the Worker: [`../patterns/errors/gsap-in-worker-isolate.md`](../patterns/errors/gsap-in-worker-isolate.md)  
- Avoid — ScrollTrigger without `registerPlugin`: [`../patterns/errors/gsap-scrolltrigger-without-registerplugin.md`](../patterns/errors/gsap-scrolltrigger-without-registerplugin.md)  
- Avoid — layout props for motion: [`../patterns/errors/gsap-layout-props-for-motion.md`](../patterns/errors/gsap-layout-props-for-motion.md)
