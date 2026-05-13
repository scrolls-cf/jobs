# Patterns (agent-oriented)

This directory holds **short, durable notes for AI coding agents** working in this repo: what to **follow** (`goldpath/`) and what to **avoid** (`errors/`). Humans maintain it; agents should **read it before inventing** stack-specific setup or repeating fixed bugs.

## Navigate in three steps

1. **Skim `errors/`** for pitfalls that match your task (Tailwind, DaisyUI, Hono, Workers, etc.).
2. **Open `goldpath/`** for vetted snippets and constraints tied to this codebase.
3. **Prefer upstream `docs/`** for full references; use `patterns/` for **decisions already made here**.

## Layout

| Path | Agent use |
| --- | --- |
| [`goldpath/`](./goldpath/README.md) | **Follow** — canonical setup, snippets, and “when to use” for this project (Hono on Workers, CSS build, bindings). |
| [`errors/`](./errors/README.md) | **Avoid** — anti-patterns, deprecated configs, and mistakes already corrected. |

## Naming files

- **Kebab-case** filenames only (e.g. `d1-migrations.md`, `tailwind-vite.md`).
- **Stable topic** — `stack-or-feature.md` for evergreen guidance.
- **Dated note** — `YYYY-MM-DD-short-slug.md` for one-off research or context that may age (still kebab-case after the date).

One main topic per file when possible so agents can open a single focused page.

## Optional YAML frontmatter

Pattern **entries** (not these READMEs) may start with machine-friendly metadata so agents can pick files by topic:

```yaml
---
kind: goldpath   # or anti-pattern
topics: [tailwind, vite]
date: "2026-05-13"
---
```

Use `kind: anti-pattern` in `errors/`. Keep `topics` as a small lowercase list (packages, APIs, or areas). `date` is ISO **string**.

## After you fix or standardize something

When you resolve a non-trivial bug or lock in a stack choice, add a concise entry to `errors/` and/or `goldpath/` and cite `docs/` or upstream links. See the README inside each subfolder for the bullet fields to include.
