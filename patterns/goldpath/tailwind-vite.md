---
kind: goldpath
topics: [tailwind, vite, build]
date: "2026-05-13"
---

# Tailwind v4 + Vite (gold path)

- **Date** — 2026-05-13
- **Source** — [docs/tailwind-vite.md](../../docs/tailwind-vite.md); [Tailwind: Using Vite](https://tailwindcss.com/docs/installation/using-vite)
- **Topic** — Tailwind CSS v4, Vite

## Snippet or summary

Vite integration: `npm install tailwindcss @tailwindcss/vite`; add `tailwindcss()` from `@tailwindcss/vite` to `vite.config` plugins; in CSS entry use `@import "tailwindcss";`; run `npm run dev`. Wire Wrangler static assets (or your build) to the directory Vite emits.

## When to use

When you add a **Vite** frontend or asset package next to this Workers + Hono app. This repo does not ship Tailwind yet; follow `docs/tailwind-vite.md` for the full digest before changing `package.json`.
