---
kind: anti-pattern
topics: [tailwind, typography, tailwind-v4, content, prose]
date: "2026-05-13"
---

# Missing `prose` utilities after a Tailwind build

- **Date:** 2026-05-13  
- **Source:** [docs/tailwind-typography-for-agents.md](../../docs/tailwind-typography-for-agents.md)  
- **Topic:** Tailwind v4 content detection, Typography  
- **Wrong:** Adding `prose` / `prose-invert` only in JS strings, dynamic class maps, or files outside configured `@source` globs, then expecting them in `public/assets/app.css`.  
- **Why it fails:** Tailwind v4 only emits utilities for class names it can see during the CLI scan.  
- **What to do instead:** Extend `@source` to cover those templates, or add literals via `@source inline("prose prose-invert")` (see `src/styles/app.css`). Re-run `npm run build:css`. Prefer [`../goldpath/tailwind-typography-v4-cli.md`](../goldpath/tailwind-typography-v4-cli.md).
