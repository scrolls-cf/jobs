---
kind: goldpath
topics: [daisyui, tailwind, css]
date: "2026-05-13"
---

# DaisyUI 5 + Tailwind 4 (gold path)

- **Date** — 2026-05-13
- **Source** — [docs/daisyui.md](../../docs/daisyui.md); [docs/daisyui-llms.txt](../../docs/daisyui-llms.txt); [daisyUI install](https://daisyui.com/docs/install/)
- **Topic** — DaisyUI 5, Tailwind CSS 4

## Snippet or summary

After Tailwind v4 is in place: `npm i -D daisyui@latest`; CSS entry: `@import "tailwindcss";` then `@plugin "daisyui";`. Prefer semantic theme colors. Full class lists: vendored `docs/daisyui-llms.txt` and [daisyUI components](https://daisyui.com/components/).

## When to use

When adding a styled UI (e.g. Vite client or static HTML) to this worker stack—or verifying Tailwind v4 + daisyUI wiring in **`src/styles/app.css`**.

## Related

- [`daisyui-tailwind-minimal-drift.md`](./daisyui-tailwind-minimal-drift.md) — **Daisy → Tailwind → tokens → scoped CSS** order; avoid fighting the plugin.
- [`daisyui-5-form-fields-markup.md`](./daisyui-5-form-fields-markup.md) — v5 `input` / `textarea` wrapper shapes and multi-line UX.
- [`../errors/daisyui-tailwind-v4-config.md`](../errors/daisyui-tailwind-v4-config.md) — sad path: legacy `tailwind.config.js` + v4.
- [`../errors/daisyui-5-legacy-form-class-names.md`](../errors/daisyui-5-legacy-form-class-names.md) — sad path: v4 class names that emit no CSS in v5.
- [`../errors/daisyui-5-textarea-wrapper-ux.md`](../errors/daisyui-5-textarea-wrapper-ux.md) — sad path: textarea wrapper / overflow traps.
