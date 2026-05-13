---
kind: goldpath
topics: [tailwind, typography, tailwind-v4, cli, prose]
date: "2026-05-13"
---

# Tailwind Typography + v4 CLI (Scaffold)

- **Date:** 2026-05-13  
- **Source:** [docs/tailwind-typography-for-agents.md](../../docs/tailwind-typography-for-agents.md); [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)  
- **Topic:** Tailwind v4, Typography plugin, CLI build  
- **Snippet or summary:** In `src/styles/app.css`: `@import "tailwindcss";` then `@plugin "@tailwindcss/typography";`; declare `@source` paths for templates and `@source inline("prose …")` for literals. Run `npm run build:css` to emit `public/assets/app.css`.  
- **When to use:** Adding or changing `prose` styling, typography modifiers, or Tailwind entry CSS in this package.

If utilities disappear from `public/assets/app.css`, see [`../errors/tailwind-typography-missing-utilities.md`](../errors/tailwind-typography-missing-utilities.md).
