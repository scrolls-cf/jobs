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

1. **Components first:** use DaisyUI **v5** class names and **documented** structures (`btn`, `card`, `input`, `textarea`, `alert`, `badge`, …). Read current daisyUI examples—**v4** class strings (`form-control`, `input-bordered`, …) are often wrong for v5.
2. **Layout with Tailwind:** `flex` / `grid` / `gap-*` / `p-*` / responsive prefixes for composition. Do **not** replace that with ad-hoc `style=""` or global CSS for one page unless there is no utility equivalent.
3. **Brand = mostly tokens:** **`devscrolls`** theme in **`src/styles/app.css`** (OKLCH, semantic roles). “On brand” should mean **token + composition**, not re-skinning every `btn` with custom borders in a new stylesheet.
4. **Overrides are rare and scoped:** when the framework does something wrong for the product (fixed width clamp, third-party embed), override in **`@layer components`** with a **narrow selector** (`#intake-form .input`), document **why** in `DESIGN.md` or a `patterns/goldpath/` note, and **do not** copy that pattern fleet-wide without review.
5. **Verify:** `npm run build:css`; confirm required classes appear in **`public/assets/app.css`**; spot-check in **`wrangler dev`**.

## When to use

Any time you would add a **new** global CSS file, rewrite a Daisy component from scratch, or paste “custom dashboard” snippets that ignore `btn` / `card` conventions.

## Related

- [`daisyui-tailwind-v4-config.md`](../errors/daisyui-tailwind-v4-config.md) — Tailwind v4 + daisyUI entry is CSS-first, not legacy `tailwind.config.js`.
- [`repo-factory` scoped input/textarea width](https://github.com/scrolls-cf/repo-factory/blob/master/src/styles/app.css) — documented override for Daisy v5 `clamp` width; see that repo’s [`patterns/goldpath/daisyui-5-form-fields-markup.md`](https://github.com/scrolls-cf/repo-factory/blob/master/patterns/goldpath/daisyui-5-form-fields-markup.md).
