# Devscrolls UI foundation (jobs)

**Audience:** coding agents and humans working in this repo.  
**Status:** fleet-aligned with the **`devscrolls`** DaisyUI theme in `src/styles/app.css`; this file also specifies the **Scrollsmatrix jobs board** surface on top of that baseline.

## Fleet baseline (non-negotiables)

1. **Theme:** **`data-theme="devscrolls"`** on `<html>`. Canonical OKLCH tokens live in `src/styles/app.css` (`@plugin "daisyui/theme"`). Do not add casual theme switchers unless the product spec requires it.
2. **Colors:** use **DaisyUI semantic colors** only (`primary`, `accent`, `base-*`, `neutral`, `info`, `success`, `warning`, `error`, and matching `*-content`). Do **not** use raw Tailwind palette classes for text or surfaces except isolated debug or third-party embeds.
3. **Surfaces:** most of the page is **`base-100` / `base-200` / `base-300`**; use **`primary`** for the main interactive accent (selection, focus, spinner); use **`accent`** for secondary highlights when needed. Use **`neutral`** for dense tool chrome (for example the job count badge outline).
4. **Typography:** **system stack**; prefer **`text-base-content`** with opacity steps (`/60`, `/65`, `/90`, etc.).
5. **Motion:** follow `docs/gsap-for-agents.md` and `patterns/goldpath/gsap-prefer-transforms.md`. Master–detail column transitions use **flex / max-width / opacity** only; **`prefers-reduced-motion`** disables those transitions in `src/styles/app.css`.

## Brand tokens (reference)

| Role | Hex (reference) | Semantic token |
|------|-----------------|----------------|
| Brand gradient A (cyan) | `#7dd3fc` | **`primary`** family |
| Brand gradient B (violet) | `#a78bfa` | **`accent`** family |
| Canvas (dark) | cool neutrals in theme | **`base-100` … `base-content`** |

## This product — jobs board surface

### 1. Visual theme and atmosphere

- **Product:** single-page jobs board for Scrollsmatrix—**the board is the hero** (no splash logo band above it).
- **Mood:** dark-first, developer-tool calm; **primary** accent only where it signals interactivity or selection.
- **Density:** comfortable reading; one primary surface (list + detail) inside a single framed shell on `md+`.

### 2. Color and semantic roles (jobs)

- **Surfaces:** `bg-base-100` page; shell `md:border` / `md:bg-base-200/50`; list `bg-base-200/80` with `ring-1` / `divide-y`.
- **Accent:** `primary` for spinner, selection border, focus ring, job count badge outline.
- **Content:** `text-base-content` hierarchy with opacity steps — no raw hex in new markup unless extending this file first.

### 3. Typography (jobs)

- **System stack:** inherited (`antialiased` on body).
- **Hierarchy:** list titles `text-sm font-semibold uppercase tracking-wide`; detail title `text-base` / `sm:text-lg` semibold uppercase.
- **Long copy:** `prose prose-invert prose-sm` in the detail region; paragraphs from JS stay in the prose container.

### 4. Clickable targets (jobs board)

- **Job rows** behave like **buttons**: `role="button"`, `tabindex="0"`, **`cursor-pointer`**, full-row hit target, clear **`hover:`** and **`focus-visible:ring-2`** (keyboard), and **`aria-selected="true"`** on the active row when a detail is open.
- **Do not** rely on color alone for selection—pair **`aria-selected`** with visible **left border + tinted background** (`aria-selected:border-l-2`, `aria-selected:bg-primary/[…]`).
- **Detail panel** is not a modal: no dimmed full-screen overlay. Dismiss with **Close** control and **Escape** (returns focus to the row that was selected).
- **Close** is a real `<button type="button">` with an **`aria-label`** (or visible “Close” text) so SR users are not trapped in the region.

### 5. Components (jobs)

- **Shell (`#job-shell`):** `max-w-6xl` master–detail container; `data-detail-open="true"` when a job is selected (drives layout CSS in `src/styles/app.css`).
- **List column (`#job-list-column` / `.job-shell__list`):** count badge + `<ul role="list">`; rows are the only primary click targets before selection.
- **Job row:** title + two-line summary; selected state as above.
- **Detail (`#job-detail-panel`):** `role="region"` **`aria-labelledby="job-detail-title"`**; inner card is **sticky** on desktop so long copy scrolls inside the column, not the whole page. Content order: **Worker purpose** → **Platform contract** (from `workerPlatformContract` in `/api/jobs`) → **Description** → **Acceptance tests** (numbered mocks; CI runner TBD).
- **Job count:** `badge badge-neutral badge-outline` for the “N jobs” label only.

### 6. Layout and spacing

- **Page:** `min-h-screen`, horizontal padding `px-4` → `sm:px-6` → `lg:px-8`, vertical `py-6` / `lg:py-10`.
- **Master–detail (`md+`):** flex row inside the shell; with detail open, the **list column narrows** and the **detail column grows** to the right—no overlay.
- **Small screens:** same DOM order (list, then detail); detail **stacks below** the list when open; no fake modal.

### 7. Depth and motion

- **Elevation:** `shadow-xl` on the shell; inner detail card uses `shadow-lg` + border for separation from the list.
- **Motion:** `md+` uses short transitions on list **max-width / flex** when opening detail (see `.job-shell` rules in `src/styles/app.css`). Respect **`prefers-reduced-motion`**.

### 8. Do and do not

- **Do** use semantic Daisy classes (`btn`, `badge`, `alert`, `loading`) and theme tokens.
- **Do** keep focus rings on rows and real buttons; keep `aria-selected` in sync with the open job.
- **Do** update this file when changing layout, selection rules, or detail behavior.
- **Do not** reintroduce a **blocking modal overlay** for job copy unless product explicitly changes—prefer this split view.
- **Do not** introduce a second parallel palette without updating tokens here and in `src/styles/app.css`.

### 9. Responsive behavior

- **`md` (768px):** side-by-side master–detail with animated column split.
- **Below `md`:** stacked list + detail; user scrolls to read detail; Close still clears selection.

### 10. Agent prompt hints

- “Match jobs board” → `devscrolls` theme, framed shell, list + right detail, no hero logo strip.
- “Accessibility pass” → list `role="list"`, rows `role="button"` + keyboard + `aria-selected`, detail `role="region"` + labelled title, loading `aria-live="polite"`.

### 11. Worker deliverable (platform alignment)

Every job is expected to ship a **Cloudflare Worker** (or one clearly bounded Worker entrypoint) that:

- Takes **JSON** on documented business routes (where a body is used) and returns **JSON** with `Content-Type: application/json`.
- Exposes **`GET /health`** returning **200** and a small JSON body with **no side effects**.
- Implements **only** the capability described for that job—no unrelated surfaces in the same deploy.
- **Does not deploy to production** until the job’s **acceptance tests** are **green in CI** (exact pipeline and preview URL strategy **TBD**; contract is fixed in data + UI).

Canonical copy of the shared rules lives in **`WORKER_PLATFORM_CONTRACT`** in `src/jobs-data.ts` and is returned as **`workerPlatformContract`** on **`GET /api/jobs`** (and filtered `POST /api/jobs` responses).

## When to copy an external `DESIGN.md`

Only when the **product owner** asks for a **different** aesthetic. Then follow `docs/design-md-for-agents.md` and merge conflicts **explicitly** with this file and `src/styles/app.css`.

## Revision

Tweaks to the fleet look belong in `src/styles/app.css` and the **Fleet baseline** / **Brand tokens** sections here; jobs-board sections change when the board UX changes.

_Changelog: 2026-05-14 — Merged fleet `devscrolls` foundation with jobs board spec; replaced `dim` with `devscrolls`; aligned logo gradient with fleet._
