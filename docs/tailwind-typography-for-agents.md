# Tailwind Typography — guide for agents (Scaffold)

**When to read this:** You are styling long-form HTML with `prose` utilities, changing `@tailwindcss/typography`, or prose-related classes are missing from the built CSS—read this digest first, then the upstream repo.

## Canonical upstream docs

- **Project home:** [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) — README, modifiers (`prose-lg`, color themes), Tailwind v4 `@plugin` usage, and “beautiful typographic defaults for HTML you don’t control.”
- **Package:** [`@tailwindcss/typography` on npm](https://www.npmjs.com/package/@tailwindcss/typography) — version alignment with this repo’s `package.json`.
- **Tailwind v4 core:** [Tailwind CSS documentation](https://tailwindcss.com/docs) — `@source`, `@plugin`, CLI; use site search instead of duplicating pages here.

This file maps **this repo** only; it does not duplicate the plugin’s full modifier list.

## Where Typography lives here

| Item | Location |
| ---- | -------- |
| Dependency | `package.json` → devDependency `@tailwindcss/typography` |
| Plugin registration | `src/styles/app.css` — `@plugin "@tailwindcss/typography";` |
| Content / class detection | Same file — `@source` for HTML paths; `@source inline("…")` for static `prose` class strings Tailwind must emit |
| CSS output | `npm run build:css` → `public/assets/app.css` (via `@tailwindcss/cli`) |

## Patterns in this repo

1. **Tailwind v4 CSS-first config** — Typography is loaded as a plugin in CSS (`@plugin "@tailwindcss/typography"`), not `tailwind.config.js`.
2. **`prose` + DaisyUI** — `app.css` also loads DaisyUI; keep theme choices (`prose-invert`, etc.) consistent with the active DaisyUI theme.
3. **Scanning** — If you add new `prose` variants or wrappers only in places Tailwind does not scan, utilities will be missing from `app.css` until you extend `@source` / `@source inline` (see Related patterns → errors).

## Related patterns (this repo)

- Gold path: [`../patterns/goldpath/tailwind-typography-v4-cli.md`](../patterns/goldpath/tailwind-typography-v4-cli.md)  
- Avoid: [`../patterns/errors/tailwind-typography-missing-utilities.md`](../patterns/errors/tailwind-typography-missing-utilities.md)

## If something is missing

Start from the [tailwindcss-typography README](https://github.com/tailwindlabs/tailwindcss-typography), then cross-check [Tailwind CLI installation](https://tailwindcss.com/docs/installation/tailwind-cli) for how this package builds CSS. For core v4 directives, search [Tailwind CSS documentation](https://tailwindcss.com/docs). For Vite-based apps, see [tailwind-vite.md](./tailwind-vite.md).
