# Devscrolls UI foundation (scaffold)

**Audience:** coding agents and humans shipping apps from this scaffold.  
**Status:** canonical house style for the Devscrolls fleet unless a product owner explicitly opts out in writing.

## Intent

Ship **predictable, on-brand UI** so builders focus on behavior and data, not one-off palettes or arbitrary Tailwind color picks. Implement with **DaisyUI components + semantic tokens** wired by the **`devscrolls`** theme in `src/styles/app.css`. **Stay close to DaisyUI and Tailwind defaults**—reuse component APIs and layout utilities; add custom CSS only when necessary, scoped, and documented.

## Brand personality (Devscrolls)

Voice the product through layout and motion, not through random color picks. Default reading:

| Pillar | What it means in UI |
|--------|---------------------|
| **Creativity** | Clever composition, clear hierarchy, and purposeful **accent** use—not novelty palettes or one-off CSS hacks outside tokens. |
| **Potential** | Interfaces feel **open and extensible**: breathable spacing, obvious next actions, progressive disclosure instead of clutter. |
| **Speed** | **Fast perceived performance**: lean DOM, no decorative bloat, prefer transforms for motion (`patterns/goldpath/gsap-prefer-transforms.md`), respect `prefers-reduced-motion`. |
| **Performance** | Ship **efficient CSS** (semantic utilities, one theme), avoid layout-thrashing animation, lazy non-critical work where the stack allows it. |
| **Efficiency** | **Primary** draws the eye to the main job; **base-*** carries structure; copy and components stay minimal—every pixel earns its place. |

Agents with **brand / marketing / UX-UI** skills own **execution inside these rails** (story, emphasis, flow, microcopy tone). They do **not** invent a parallel brand system per app.

## Where fleet rules change (scaffold first)

This **`scrolls-cf/scaffold`** repo is the **source of truth** for fleet-wide look: **`DESIGN.md`**, **`src/styles/app.css`**, and shared **`.cursor/rules`** that point here.

1. **Edit scaffold** (tokens, non-negotiables, new global patterns), **`npm run build:css`** when `src/styles/app.css` changes, commit, **`git push origin master`**.
2. **Merge into each fork** (`jobs`, `repo-factory`, `scrollsmatrix`, …) on a schedule you choose; resolve conflicts by keeping **product-specific** surfaces in the fork and **fleet tokens + docs** from scaffold.
3. Optional: use external skills (e.g. **[design-md](https://officialskills.sh/google-labs-code/skills/design-md)**, **[frontend-design](https://officialskills.sh/anthropics/skills/frontend-design)**) as **technique**—output must still map onto **`devscrolls`** semantics unless the product owner opts out in writing.

## Non-negotiables (agents)

1. **Theme:** root layout uses **`data-theme="devscrolls"`** on `<html>` (or the outer app shell). Do not add casual theme switchers unless the product spec requires it.
2. **Colors:** use **DaisyUI semantic colors** only (`primary`, `accent`, `base-*`, `neutral`, `info`, `success`, `warning`, `error`, and matching `*-content`). Do **not** use raw Tailwind palette classes for text or surfaces (`text-gray-*`, `bg-slate-*`, `text-blue-500`, etc.) except for **true** one-off debug or third-party embeds—and then isolate them.
3. **Surfaces:** most of the page is **`base-100` / `base-200` / `base-300`**; use **`primary`** for the main CTA and key focus; use **`accent`** for secondary highlights, tags, or “interesting” affordances. Use **`neutral`** for dense tool chrome, not for marketing hero fills.
4. **Typography:** **system UI stack** only unless a future revision of this file adds a webfont. Default body: `antialiased` on the shell; prefer **`text-base-content`** with opacity modifiers (`/70`, `/80`) over inventing new gray hex values.
5. **Density:** default to **comfortable** spacing (`gap-4`–`gap-8` in page sections, `p-4`–`p-6` on cards). Avoid ultra-tight `gap-1` layouts for primary flows.
6. **Radius:** theme sets rounded selectors and boxes; do not fight it with ad-hoc `rounded-sm` on Daisy components unless fixing a clash—prefer component defaults.
7. **Motion:** follow `docs/gsap-for-agents.md` and `patterns/goldpath/gsap-prefer-transforms.md`. No layout-thrashing animations on `width`/`height`/`top`/`left`.
8. **Content:** use **`prose prose-invert`** only where long-form markdown lives; keep app chrome outside `prose`.
9. **Tool surfaces (microcopy):** internal Workers, dashboards, and **repo-factory-style** flows default to **literal, efficient labels** (`Repo name`, `Submit`)—**not** conversational onboarding, long “first slice” disclaimers, or hint paragraphs under fields. Ship **only** what the task needs; add prose when the **product spec** asks for marketing or education. **Accessibility** still requires real `<label>` / `aria-*` / errors—not filler copy.
10. **DaisyUI + Tailwind alignment (priority order — do not invert):**
    1. **Stock DaisyUI v5** components and documented markup (`btn`, `card`, `input`, `textarea`, `alert`, …).
    2. **Tailwind utilities** for layout and spacing (`flex`, `grid`, `gap-*`, responsive prefixes).
    3. **`devscrolls` tokens** in `src/styles/app.css` (OKLCH semantic roles) for brand—**not** per-page re-skins of every control.
    4. **Minimal scoped CSS** in `@layer components` only when **1–3** cannot satisfy the UX (document **why** in `DESIGN.md` or `patterns/goldpath/`).  
    Read [`patterns/goldpath/daisyui-tailwind-minimal-drift.md`](patterns/goldpath/daisyui-tailwind-minimal-drift.md) and [`patterns/goldpath/daisyui-5-form-fields-markup.md`](patterns/goldpath/daisyui-5-form-fields-markup.md); form foot-guns in [`patterns/errors/daisyui-5-legacy-form-class-names.md`](patterns/errors/daisyui-5-legacy-form-class-names.md) and [`patterns/errors/daisyui-5-textarea-wrapper-ux.md`](patterns/errors/daisyui-5-textarea-wrapper-ux.md).

## Brand tokens (reference)

| Role | Hex (reference) | Semantic token |
|------|-----------------|----------------|
| Brand gradient A (cyan) | `#7dd3fc` | maps to **`primary`** family |
| Brand gradient B (violet) | `#a78bfa` | maps to **`accent`** family |
| Canvas (dark) | derived from dim-like cool neutrals | **`base-100` … `base-content`** |

Exact OKLCH values live in **`src/styles/app.css`** (`@plugin "daisyui/theme"` → `devscrolls`). **That file is the runtime source of truth**; update this table’s hex column when marketing needs a swatch card, but change tokens in CSS first.

## Typography scale (logical)

- **Display / hero:** `text-4xl`–`text-6xl`, `font-semibold` or `font-bold`, `tracking-tight`, `text-base-content`.
- **Page title:** `text-2xl`–`text-3xl`, `font-semibold`.
- **Section heading:** `text-xl`–`text-2xl`, `font-semibold`.
- **Body:** default (`text-base`), `text-base-content/90`, relaxed leading where paragraphs exist.
- **Meta / captions:** `text-sm`, `text-base-content/60`.

## Components (defaults)

- **Primary action:** `btn btn-primary`.
- **Secondary action:** `btn btn-outline` or `btn btn-ghost` on `base-100`/`base-200`.
- **Destructive:** `btn btn-error` (never `btn-primary` for delete).
- **Surfaces:** `card bg-base-200` or `bg-base-100` with `border border-base-300` when separation helps.
- **Alerts / feedback:** `alert alert-info | success | warning | error` with concise copy.

## When to copy an external `DESIGN.md`

Only when the **product owner** asks for a **different** aesthetic (another brand, white-label, or strict client guide). Then follow `docs/design-md-for-agents.md` and merge conflicts **explicitly**—do not silently fork the fleet palette.

## Revision

Tweaks to the fleet look belong here and in `src/styles/app.css` together; bump a short note at the bottom when you change tokens.

_Changelog: 2026-05-14 — Non-negotiable **#10** expanded: ordered stack (Daisy → Tailwind → tokens → scoped CSS); form goldpath + textarea UX errors linked. 2026-05-14 — Initial Devscrolls foundation. 2026-05-14 — Brand personality pillars; scaffold-first fleet evolution; brand/UX agent ownership inside rails. 2026-05-14 — Agent guide + patterns index: scrollsmatrix manual-sync pointer. 2026-05-14 — Non-negotiable #9: terse tool microcopy. 2026-05-14 — Non-negotiable #10 + goldpath: minimal drift from DaisyUI + Tailwind (reuse components/utilities; scoped overrides only)._
