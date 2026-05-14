---
kind: anti-pattern
topics: [daisyui, forms, tailwind]
date: "2026-05-14"
---

# DaisyUI 5: `form-control`, `input-bordered`, and `textarea-bordered` do not exist

- **Date** — 2026-05-14
- **Context** — Fleet static HTML (`public/*.html`) + Tailwind v4 CLI + `@plugin "daisyui"` (v5)
- **Bad pattern** — Markup copied from DaisyUI **v4** tutorials: `class="form-control"`, `label` + `label-text` / `label-text-alt`, `input input-bordered`, `textarea textarea-bordered` on a bare `<input>` / `<textarea>`.
- **Why it is wrong** — In **daisyUI 5**, those utility names were removed or replaced. Unknown class strings produce **no CSS**, so fields look unstyled.
- **Fix / reference** — **v5** shapes: `<input class="input input-md w-full">`; **`<div class="textarea …"><textarea></textarea></div>`** with a separate `<label for="…">` (see [`../goldpath/daisyui-5-form-fields-markup.md`](../goldpath/daisyui-5-form-fields-markup.md)). [`./daisyui-5-textarea-wrapper-ux.md`](./daisyui-5-textarea-wrapper-ux.md) covers multi-line UX failures.
