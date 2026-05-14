# Devscrolls UI foundation (jobs)

**Audience:** coding agents and humans working in this repo.  
**Status:** fleet-aligned with the **`devscrolls`** DaisyUI theme in `src/styles/app.css`; this file also specifies the **Scrollsmatrix jobs board** surface on top of that baseline.

## Fleet baseline

### Intent

Ship **predictable, on-brand UI** so builders focus on behavior and data, not one-off palettes or arbitrary Tailwind color picks. Implement with **DaisyUI components + semantic tokens** wired by the **`devscrolls`** theme in `src/styles/app.css`.

### Brand personality (Devscrolls)

Voice the product through layout and motion, not through random color picks. Default reading:

| Pillar | What it means in UI |
|--------|---------------------|
| **Creativity** | Clever composition, clear hierarchy, and purposeful **accent** use—not novelty palettes or one-off CSS hacks outside tokens. |
| **Potential** | Interfaces feel **open and extensible**: breathable spacing, obvious next actions, progressive disclosure instead of clutter. |
| **Speed** | **Fast perceived performance**: lean DOM, no decorative bloat, prefer transforms for motion (`patterns/goldpath/gsap-prefer-transforms.md`), respect `prefers-reduced-motion`. |
| **Performance** | Ship **efficient CSS** (semantic utilities, one theme), avoid layout-thrashing animation, lazy non-critical work where the stack allows it. |
| **Efficiency** | **Primary** draws the eye to the main job; **base-*** carries structure; copy and components stay minimal—every pixel earns its place. |

Agents with **brand / marketing / UX-UI** skills own **execution inside these rails** (story, emphasis, flow, microcopy tone). They do **not** invent a parallel brand system per app.

### Where fleet rules change (scaffold first)

This **`scrolls-cf/scaffold`** repo is the **source of truth** for fleet-wide look: **`DESIGN.md`**, **`src/styles/app.css`**, and shared **`.cursor/rules`** that point there.

1. **Edit scaffold** (tokens, non-negotiables, new global patterns), **`npm run build:css`** when `src/styles/app.css` changes, commit, **`git push origin master`**.
2. **Merge into each fork** (`jobs`, `repo-factory`, `scrollsmatrix`, …) on a schedule you choose; resolve conflicts by keeping **product-specific** surfaces in the fork and **fleet tokens + docs** from scaffold. **`scrollsmatrix`** checkouts that cannot `git merge` scaffold follow **`patterns/goldpath/scrollsmatrix-fleet-design-sync.md`** instead.
3. Optional: use external skills (e.g. **[design-md](https://officialskills.sh/google-labs-code/skills/design-md)**, **[frontend-design](https://officialskills.sh/anthropics/skills/frontend-design)**) as **technique**—output must still map onto **`devscrolls`** semantics unless the product owner opts out in writing.

### Non-negotiables (agents)

1. **Theme:** root layout uses **`data-theme="devscrolls"`** on `<html>` (or the outer app shell). Do not add casual theme switchers unless the product spec requires it.
2. **Colors:** use **DaisyUI semantic colors** only (`primary`, `accent`, `base-*`, `neutral`, `info`, `success`, `warning`, `error`, and matching `*-content`). Do **not** use raw Tailwind palette classes for text or surfaces (`text-gray-*`, `bg-slate-*`, `text-blue-500`, etc.) except for **true** one-off debug or third-party embeds—and then isolate them.
3. **Surfaces:** most of the page is **`base-100` / `base-200` / `base-300`**; use **`primary`** for the main CTA and key focus; use **`accent`** for secondary highlights, tags, or “interesting” affordances. Use **`neutral`** for dense tool chrome, not for marketing hero fills.
4. **Typography:** **system UI stack** only unless a future revision of this file adds a webfont. Default body: `antialiased` on the shell; prefer **`text-base-content`** with opacity modifiers (`/70`, `/80`) over inventing new gray hex values.
5. **Density:** default to **comfortable** spacing (`gap-4`–`gap-8` in page sections, `p-4`–`p-6` on cards). Avoid ultra-tight `gap-1` layouts for primary flows.
6. **Radius:** theme sets rounded selectors and boxes; do not fight it with ad-hoc `rounded-sm` on Daisy components unless fixing a clash—prefer component defaults.
7. **Motion:** follow `docs/gsap-for-agents.md` and `patterns/goldpath/gsap-prefer-transforms.md`. No layout-thrashing animations on `width`/`height`/`top`/`left`. **Jobs board:** master–detail column transitions use **flex / max-width / opacity** only; **`prefers-reduced-motion`** disables those transitions in this package’s `src/styles/app.css`.
8. **Content:** use **`prose prose-invert`** only where long-form markdown lives; keep app chrome outside `prose`.

### Brand tokens (reference)

| Role | Hex (reference) | Semantic token |
|------|-----------------|----------------|
| Brand gradient A (cyan) | `#7dd3fc` | maps to **`primary`** family |
| Brand gradient B (violet) | `#a78bfa` | maps to **`accent`** family |
| Canvas (dark) | derived from dim-like cool neutrals | **`base-100` … `base-content`** |

Exact OKLCH values live in **`src/styles/app.css`** (`@plugin "daisyui/theme"` → `devscrolls`). **That file is the runtime source of truth**; update this table’s hex column when marketing needs a swatch card, but change tokens in CSS first.

### Typography scale (logical)

- **Display / hero:** `text-4xl`–`text-6xl`, `font-semibold` or `font-bold`, `tracking-tight`, `text-base-content`.
- **Page title:** `text-2xl`–`text-3xl`, `font-semibold`.
- **Section heading:** `text-xl`–`text-2xl`, `font-semibold`.
- **Body:** default (`text-base`), `text-base-content/90`, relaxed leading where paragraphs exist.
- **Meta / captions:** `text-sm`, `text-base-content/60`.

### Components (defaults)

- **Primary action:** `btn btn-primary`.
- **Secondary action:** `btn btn-outline` or `btn btn-ghost` on `base-100`/`base-200`.
- **Destructive:** `btn btn-error` (never `btn-primary` for delete).
- **Surfaces:** `card bg-base-200` or `bg-base-100` with `border border-base-300` when separation helps.
- **Alerts / feedback:** `alert alert-info | success | warning | error` with concise copy.

## This product — jobs board surface

### 1. Visual theme and atmosphere

- **Product:** single-page jobs board for Scrollsmatrix—**the board is the hero** (no splash logo band above it).
- **Mood:** dark-first, developer-tool calm; **primary** for interactive selection, loading, and row focus; **accent** (violet) for non-interactive brand chrome (board kicker, detail `h3` labels).
- **Density:** comfortable reading; one primary surface (list + detail) inside a single framed shell on `md+`.
- **Atmosphere:** subtle **primary** radial wash behind the shell (`color-mix` on `--color-primary`, low opacity), aligned with other Devscrolls fleet surfaces.

### 2. Color and semantic roles (jobs)

- **Surfaces:** `bg-base-100` page; shell `md:border` / `md:bg-base-200/50`; list `bg-base-200/80` with `ring-1` / `divide-y`.
- **Interactive chrome:** `primary` for spinner, selection border, focus ring, and row-selected fill.
- **Brand chrome:** `accent` for the board kicker and detail panel **`h3`** section labels (not click targets).
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
- **List column (`#job-list-column` / `.job-shell__list`):** kicker (“Scrollsmatrix jobs”) in **`text-accent`**, count badge with **`badge-outline border-primary/30`**, then `<ul role="list">`; rows are the only primary click targets before selection.
- **Job row:** title + two-line summary; selected state as above.
- **Detail (`#job-detail-panel`):** `role="region"` **`aria-labelledby="job-detail-title"`**; inner card is **sticky** on desktop so long copy scrolls inside the column, not the whole page. Content order: **Worker purpose** → **Platform contract** (from `workerPlatformContract` in `/api/jobs`) → **Description** → **Acceptance tests** (numbered mocks; CI runner TBD).
- **Job count:** `badge badge-outline border-primary/30` (subtle **primary** rim on neutral body), not a filled marketing pill.

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

- “Match jobs board” → `devscrolls` theme, subtle **primary** radial wash, framed shell, **accent** kicker + detail section labels, **primary** for selection/spinner/badge rim, list + right detail, no hero logo strip.
- “Accessibility pass” → list `role="list"`, rows `role="button"` + keyboard + `aria-selected`, detail `role="region"` + labelled title, loading `aria-live="polite"`.

### 11. Worker deliverable (platform alignment)

Every job is expected to ship a **Cloudflare Worker** (or one clearly bounded Worker entrypoint) that:

- Takes **JSON** on documented business routes (where a body is used) and returns **JSON** with `Content-Type: application/json`.
- Exposes **`GET /health`** returning **200** and a small JSON body with **no side effects**.
- Implements **only** the capability described for that job—no unrelated surfaces in the same deploy.
- **Does not deploy to production** until the job’s **acceptance tests** are **green in CI** (exact pipeline and preview URL strategy **TBD**; contract is fixed in data + UI).

Canonical copy of the shared rules lives in **`WORKER_PLATFORM_CONTRACT`** in `src/jobs-data.ts` and is returned as **`workerPlatformContract`** on **`GET /api/jobs`** (and filtered `POST /api/jobs` responses).

## When to copy an external `DESIGN.md`

Only when the **product owner** asks for a **different** aesthetic (another brand, white-label, or strict client guide). Then follow `docs/design-md-for-agents.md` and merge conflicts **explicitly**—do not silently fork the fleet palette.

## Revision

Tweaks to the fleet look belong in **`src/styles/app.css`** and the **Fleet baseline** sections above; jobs-board sections change when the board UX changes.

_Changelog: 2026-05-14 — Merged fleet `devscrolls` foundation with jobs board spec; replaced `dim` with `devscrolls`; aligned logo gradient with fleet. 2026-05-14 — Primary radial wash, accent kicker and detail section labels, primary-rim job count badge. 2026-05-14 — Brand personality, scaffold-first fleet workflow, merged non-negotiables from scaffold. 2026-05-14 — Fleet baseline parity with scaffold: source-of-truth fleet workflow, typography scale, component defaults, brand-token table + OKLCH note, scrollsmatrix manual-sync pointer._
