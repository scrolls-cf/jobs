# DaisyUI (daisyUI 5 + Tailwind CSS 4)

## Canonical URLs

- **[daisyUI llms.txt](https://daisyui.com/llms.txt)** — machine-oriented rules, config, colors, and per-component class names (accordion, button, modal, etc.).
- **[All components](https://daisyui.com/components/)** — human-friendly gallery and deep links into each component.
- **[Install](https://daisyui.com/docs/install/)** · **[Config](https://daisyui.com/docs/config/)** · **[Editor / LLM setup](https://daisyui.com/docs/editor/)** · **[v5 release notes](https://daisyui.com/docs/v5/)** · **[v4 → v5 upgrade](https://daisyui.com/docs/upgrade/)**

## Offline copy in this repo

[`daisyui-llms.txt`](./daisyui-llms.txt) is a vendored mirror of [daisyui.com/llms.txt](https://daisyui.com/llms.txt). Refresh when you adopt or upgrade DaisyUI:

```bash
curl -fsSL "https://daisyui.com/llms.txt" -o docs/daisyui-llms.txt
```

## This project (scaffold)

This repo ships **Tailwind CSS 4** + **DaisyUI 5** from **`src/styles/app.css`**. The default theme is the custom **`devscrolls`** fleet theme (see repo-root **`DESIGN.md`**). Build vendored CSS with `npm run build:css`.

## Quick rules (from upstream)

- daisyUI 5 requires **Tailwind CSS 4**; use `@plugin "daisyui"` in CSS — do **not** wire daisyUI 5 through **`tailwind.config.js`** for Tailwind v4 (deprecated for this pairing).
- Style with **component + part + modifier** classes; compose with Tailwind utilities; use `utility!` only as a last resort for specificity.
- Prefer **semantic daisyUI colors** so themes stay consistent across light/dark.

For full syntax per component, search **`daisyui-llms.txt`** or use [daisyui.com/components](https://daisyui.com/components/).
