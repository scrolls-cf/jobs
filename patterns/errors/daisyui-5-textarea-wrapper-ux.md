---
kind: anti-pattern
topics: [daisyui, forms, textarea, accessibility]
date: "2026-05-14"
---

# DaisyUI 5: `textarea` wrapper that blocks or hides multi-line input

- **Date** — 2026-05-14
- **Context** — Static HTML + Tailwind v4 + daisyUI 5 `components/textarea.css`
- **Bad pattern**
  - Wrapping the control in **`<label class="textarea">`** while also using a **separate** `<label for="id">` for the same field—valid HTML, but easy to mis-layer **min-height** / **overflow** so the inner `<textarea>` **does not grow or scroll**, and users report they **cannot type or read** past the first few lines.
  - Stacking **tight `min-h-*`** on the **outer** `.textarea` **and** fixed **`rows`** without giving the inner `<textarea>` **`resize`**, **`overflow-y: auto`**, or **`field-sizing: content`** when you want free-form paragraphs.
- **Why it is wrong** — Feels like a “broken” app even though Daisy classes are present; wastes time in **repo-factory-style** tools and any forked Worker UI. This is a **UX/layout** failure on top of the framework, not a reason to abandon Daisy.
- **Fix / reference** — [`../goldpath/daisyui-5-form-fields-markup.md`](../goldpath/daisyui-5-form-fields-markup.md) (wrapper = **`<div class="textarea">`**, separate `<label for>`, scoped CSS for inner `textarea` height/scroll/`field-sizing`).
