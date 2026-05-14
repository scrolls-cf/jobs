---
kind: goldpath
topics: [daisyui, tailwind, branding, css]
date: "2026-05-14"
---

# DaisyUI + Tailwind: minimal drift (gold path)

- **Date** — 2026-05-14
- **Source** — repo-root [`DESIGN.md`](../../DESIGN.md) non-negotiable **#10**; [daisyUI docs](https://daisyui.com/)
- **Topic** — branding and layout **without** reinventing what DaisyUI and Tailwind already solve

## Snippet or summary

1. **Components first (Daisy v5):** use documented class names and structures (`btn`, `card`, `input`, `textarea`, …). **v4** strings often fail silently—see [`daisyui-5-form-fields-markup.md`](./daisyui-5-form-fields-markup.md).
2. **Layout with Tailwind:** `flex` / `grid` / `gap-*` / `p-*` / breakpoints—avoid `style=""` or bespoke layout CSS unless no utility fits.
3. **Brand = tokens + composition:** express the house look through **`devscrolls`** in `src/styles/app.css` and how you arrange Daisy components—not by re-implementing buttons and fields in new CSS files.
4. **Overrides are rare and scoped:** `@layer components`, tight selectors (`#form .input`), document the reason in `DESIGN.md` or a goldpath; do not cargo-cult overrides across apps.
5. **Verify:** `npm run build:css`; confirm classes exist in the built bundle; smoke-test forms in **`wrangler dev`** (including **multi-line textarea**).

## When to use

Any time you would add a **new** global CSS file, rewrite a Daisy component from scratch, or paste “custom dashboard” snippets that ignore `btn` / `card` conventions.

## Related

- [`daisyui-tailwind-v4-config.md`](../errors/daisyui-tailwind-v4-config.md) — Tailwind v4 + daisyUI entry is CSS-first, not legacy `tailwind.config.js`.
- [`daisyui-5-form-fields-markup.md`](./daisyui-5-form-fields-markup.md) — inputs, textareas, width clamp, **textarea multi-line UX**.
- [`repo-factory` intake (example)](https://github.com/scrolls-cf/repo-factory/blob/master/src/styles/app.css) — scoped `#intake-form` overrides live next to the product.
