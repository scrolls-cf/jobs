---
kind: goldpath
topics: [daisyui, forms, tailwind, accessibility]
date: "2026-05-14"
---

# DaisyUI 5: form fields that actually ship CSS (gold path)

- **Date** — 2026-05-14
- **Source** — daisyUI 5.5.x `components/input.css`, `textarea.css`, `fieldset.css` in `node_modules/daisyui`
- **Topic** — static HTML in `public/*.html` built with Tailwind v4 CLI + `@source` on those files

Fleet **stack order** (do not invert): **①** stock DaisyUI v5 components → **②** Tailwind layout/spacing utilities → **③** `devscrolls` tokens in `src/styles/app.css` → **④** minimal scoped CSS only when **①–③** cannot. See also [`daisyui-tailwind-minimal-drift.md`](./daisyui-tailwind-minimal-drift.md) and **`DESIGN.md`** non-negotiable **#10**.

## Snippet or summary

1. **Text input:** put Daisy classes on the **native control**:

   ```html
   <label for="id" class="text-sm font-medium text-base-content">Title</label>
   <input id="id" class="input input-md w-full max-w-none" type="text" />
   ```

   **Do not** use `input-bordered` (removed in v5; border comes from `.input`).

2. **Textarea wrapper:** Daisy styles a **wrapper** with class **`textarea`** and the real `<textarea>` **inside**. Use **`<div class="textarea …">`** as the wrapper, **not** `<label class="textarea">`, when you already have **`<label for="…">`** for the field—clearer a11y, fewer focus/hit-target surprises, and easier to attach **inner** height/scroll rules to `textarea` only.

   ```html
   <label for="desc" class="text-sm font-medium text-base-content">Description</label>
   <div class="textarea textarea-md w-full min-w-0">
     <textarea id="desc" name="description" rows="4" maxlength="2000"></textarea>
   </div>
   ```

3. **Textarea multi-line UX:** the outer `.textarea` ships with a **fixed `min-height`** (~5rem). For long copy, scope CSS on the **inner** control (same form id as your width overrides), e.g.:

   ```css
   @layer components {
     #my-form .textarea textarea {
       min-height: 7.5rem;
       resize: vertical;
       overflow-y: auto;
       field-sizing: content; /* supported browsers: grows with content */
     }
   }
   ```

   Without **`resize`** / **`overflow-y`** / adequate **`min-height`**, users may see only the first lines and think they “cannot type” the rest.

4. **Submit loading:** **`loading loading-spinner`** on a **`btn`**.

5. **Full width inside wide cards:** `.input` / `.textarea` default to **`width: clamp(…, 20rem, 100%)`**. Scope:

   ```css
   @layer components {
     #my-form .input:where(input),
     #my-form .textarea {
       width: 100%;
       min-width: 0;
       max-width: none;
     }
   }
   ```

6. **Verify:** `npm run build:css`; spot-check in **`wrangler dev`** (type several lines in `textarea`, scroll, resize).

## When to use

Any **static** fleet page (scaffold `public/`, jobs, repo-factory, scrollsmatrix) where examples still show DaisyUI **v4** strings or fragile `textarea` wrappers.

## Related anti-patterns

- [`../errors/daisyui-5-legacy-form-class-names.md`](../errors/daisyui-5-legacy-form-class-names.md)
- [`../errors/daisyui-5-textarea-wrapper-ux.md`](../errors/daisyui-5-textarea-wrapper-ux.md)
