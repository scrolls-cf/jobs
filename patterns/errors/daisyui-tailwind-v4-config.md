---
kind: anti-pattern
topics: [daisyui, tailwind, config]
date: "2026-05-13"
---

# DaisyUI 5: avoid legacy Tailwind config for v4

- **Date** — 2026-05-13
- **Context** — Tailwind CSS 4 + daisyUI 5
- **Bad pattern** — Using `tailwind.config.js` to register daisyUI for Tailwind v4, or copying v3 DaisyUI + Tailwind examples into this repo.
- **Why it is wrong** — daisyUI 5 + Tailwind v4 expect `@import "tailwindcss"` and `@plugin "daisyui"` in CSS; `tailwind.config.js` is deprecated for Tailwind v4 in this pairing.
- **Fix / reference** — [docs/daisyui.md](../../docs/daisyui.md); [docs/daisyui-llms.txt](../../docs/daisyui-llms.txt); [daisyUI install](https://daisyui.com/docs/install/)
