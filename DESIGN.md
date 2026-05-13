# DESIGN — scrollsmatrix jobs (surface)

Plain-text spec for this package’s **public HTML** (`public/index.html`) and **DaisyUI + Tailwind** tokens. Agents should treat this as canonical for jobs UI; for generic `DESIGN.md` workflow and external examples, read [`docs/design-md-for-agents.md`](docs/design-md-for-agents.md).

## 1. Visual theme and atmosphere

- **Product:** single-page jobs board for Scrollsmatrix.
- **Mood:** dark-first, developer-tool calm; **primary** glow as the only strong accent; no extra rainbow chrome.
- **Density:** comfortable reading; list rows tappable/keyboardable; modal for detail, not navigation.

## 2. Color and semantic roles

- **Theme:** `data-theme="dim"` on `<html>` (DaisyUI). Default palette = dim; `corporate` is registered for potential toggle, not used in shipped HTML unless explicitly added.
- **Surfaces:** `bg-base-100` page, `bg-base-200` / `bg-base-200/80` cards and list; borders `border-base-content/5`–`/15`; rings `ring-primary/15`–`/40` for focus and modal frame.
- **Accent:** `primary` for labels, spinner, job count badge outline, modal border/ring, radial hero wash (`color-mix` with primary).
- **Content:** `text-base-content` hierarchy with opacity steps (`/60`, `/65`, `/75`, `/80`, `/90`) — no raw hex in new markup unless extending this file first.

## 3. Typography

- **System stack:** inherited (`antialiased` on body).
- **Hierarchy:** small caps / tracking for “jobs” eyebrow; `text-sm` supporting copy; list titles `font-semibold`; modal title `text-lg font-semibold uppercase tracking-wide`.
- **Long copy:** `prose prose-invert prose-sm` in modal body; paragraphs from JS stay in prose container.

## 4. Components

- **Splash / header:** centered logo cage `rounded-3xl`, dual ring visual (outer `border-primary/55`, inner `border-base-content/10` on board). Logo decorative `alt=""` with visible text in header.
- **Job board:** `max-w-3xl` column; inner list `rounded-box`, `divide-y`, subtle `ring-1`.
- **Job row:** full-row hit target; `focus-visible:ring-2`; title + two-line summary only.
- **Modal:** native `<dialog id="job-detail">` + Daisy `modal` / `modal-box` / `modal-backdrop`; title `#job-detail-title`; body `#job-detail-prose`; close via dialog form + backdrop click outside box.
- **Job count:** `badge badge-neutral badge-outline` for the “N jobs” label only.

## 5. Layout and spacing

- **Page:** `min-h-screen`, vertical rhythm `gap-10` / `gap-12` sm+, horizontal padding `px-6`.
- **Modal:** `max-w-lg` panel; content `pr-10` under dismiss for overlap-safe title.

## 6. Depth and motion

- **Elevation:** `shadow-xl` on board and modal; soft inset glows via `shadow-[inset_…]` on chrome only.
- **Motion:** prefer short, opacity-first transitions on dialog (see `src/styles/app.css`). Respect **`prefers-reduced-motion`**: no decorative transitions on `#job-detail` when reduce is set. Any future GSAP must follow `docs/gsap-for-agents.md` and `patterns/goldpath/gsap-prefer-transforms.md`.

## 7. Do and do not

- **Do** use semantic Daisy classes (`btn`, `badge`, `alert`, `modal-*`, `loading`) and theme tokens.
- **Do** keep focus rings visible on list rows and interactive controls.
- **Do** update this file when changing theme, key spacing, or modal behavior.
- **Do not** introduce a second parallel palette (raw colors) without updating tokens here and in CSS theme if needed.
- **Do not** block scroll or trap focus worse than the native dialog already does; preserve `method="dialog"` close paths.

## 8. Responsive behavior

- **Breakpoints:** `sm:` used for padding, gaps, and logo size on the hero.
- **Modal:** usable on small viewports; `max-h` / `overflow-y-auto` on `modal-box` from Daisy defaults.

## 9. Agent prompt hints

- “Match jobs board” → dim theme, primary ring, radial hero, single `max-w-3xl` board, Daisy modal for details.
- “Accessibility pass” → list `role="list"`, row keyboard, modal `aria-labelledby`, loading `aria-live="polite"`, decorative splash `aria-hidden`.
