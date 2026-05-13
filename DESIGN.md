# DESIGN — scrollsmatrix jobs (surface)

Plain-text spec for this package’s **public HTML** (`public/index.html`) and **DaisyUI + Tailwind** tokens. Agents should treat this as canonical for jobs UI; for generic `DESIGN.md` workflow and external examples, read [`docs/design-md-for-agents.md`](docs/design-md-for-agents.md).

## 1. Visual theme and atmosphere

- **Product:** single-page jobs board for Scrollsmatrix—**the board is the hero** (no splash logo band above it).
- **Mood:** dark-first, developer-tool calm; **primary** accent only where it signals interactivity or selection.
- **Density:** comfortable reading; one primary surface (list + detail) inside a single framed shell on `md+`.

## 2. Color and semantic roles

- **Theme:** `data-theme="dim"` on `<html>` (DaisyUI). Default palette = dim; `corporate` is registered for potential toggle, not used in shipped HTML unless explicitly added.
- **Surfaces:** `bg-base-100` page; shell `md:border` / `md:bg-base-200/50`; list `bg-base-200/80` with `ring-1` / `divide-y`.
- **Accent:** `primary` for spinner, selection border, focus ring, job count badge outline.
- **Content:** `text-base-content` hierarchy with opacity steps (`/60`, `/65`, `/90`, etc.) — no raw hex in new markup unless extending this file first.

## 3. Typography

- **System stack:** inherited (`antialiased` on body).
- **Hierarchy:** list titles `text-sm font-semibold uppercase tracking-wide`; detail title `text-base` / `sm:text-lg` semibold uppercase.
- **Long copy:** `prose prose-invert prose-sm` in the detail region; paragraphs from JS stay in the prose container.

## 4. Clickable targets (jobs board)

- **Job rows** behave like **buttons**: `role="button"`, `tabindex="0"`, **`cursor-pointer`**, full-row hit target, clear **`hover:`** and **`focus-visible:ring-2`** (keyboard), and **`aria-selected="true"`** on the active row when a detail is open.
- **Do not** rely on color alone for selection—pair **`aria-selected`** with visible **left border + tinted background** (`aria-selected:border-l-2`, `aria-selected:bg-primary/[…]`).
- **Detail panel** is not a modal: no dimmed full-screen overlay. Dismiss with **Close** control and **Escape** (returns focus to the row that was selected).
- **Close** is a real `<button type="button">` with an **`aria-label`** (or visible “Close” text) so SR users aren’t trapped in the region.

## 5. Components

- **Shell (`#job-shell`):** `max-w-6xl` master–detail container; `data-detail-open="true"` when a job is selected (drives layout CSS in `src/styles/app.css`).
- **List column (`#job-list-column` / `.job-shell__list`):** count badge + `<ul role="list">`; rows are the only primary click targets before selection.
- **Job row:** title + two-line summary; selected state as above.
- **Detail (`#job-detail-panel`):** `role="region"` **`aria-labelledby="job-detail-title"`**; inner card is **sticky** on desktop so long copy scrolls inside the column, not the whole page.
- **Job count:** `badge badge-neutral badge-outline` for the “N jobs” label only.

## 6. Layout and spacing

- **Page:** `min-h-screen`, horizontal padding `px-4` → `sm:px-6` → `lg:px-8`, vertical `py-6` / `lg:py-10`.
- **Master–detail (`md+`):** flex row inside the shell; with detail open, the **list column narrows** (flex + max-width in CSS) and the **detail column grows** to the right—no overlay.
- **Small screens:** same DOM order (list, then detail); detail **stacks below** the list when open; no fake modal.

## 7. Depth and motion

- **Elevation:** `shadow-xl` on the shell; inner detail card uses `shadow-lg` + border for separation from the list.
- **Motion:** `md+` uses short transitions on list **max-width / flex** when opening detail (see `src/styles/app.css` §master–detail). Respect **`prefers-reduced-motion`**: transitions disabled there. Any future GSAP must follow `docs/gsap-for-agents.md` and `patterns/goldpath/gsap-prefer-transforms.md`.

## 8. Do and do not

- **Do** use semantic Daisy classes (`btn`, `badge`, `alert`, `loading`) and theme tokens.
- **Do** keep focus rings on rows and real buttons; keep `aria-selected` in sync with the open job.
- **Do** update this file when changing layout, selection rules, or detail behavior.
- **Do not** reintroduce a **blocking modal overlay** for job copy unless product explicitly changes—prefer this split view.
- **Do not** introduce a second parallel palette without updating tokens here.

## 9. Responsive behavior

- **`md` (768px):** side-by-side master–detail with animated column split.
- **Below `md`:** stacked list + detail; user scrolls to read detail; Close still clears selection.

## 10. Agent prompt hints

- “Match jobs board” → dim theme, framed shell, list + right detail, no hero logo strip.
- “Accessibility pass” → list `role="list"`, rows `role="button"` + keyboard + `aria-selected`, detail `role="region"` + labelled title, loading `aria-live="polite"`.
