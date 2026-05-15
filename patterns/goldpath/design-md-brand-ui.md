---
kind: goldpath
topics: [design-md, branding, ui, stitch, devscrolls]
date: "2026-05-13"
---

# DESIGN.md for brand-aligned UI (gold path)

- **Date** — 2026-05-13
- **Source** — [docs/design-md-for-agents.md](../../docs/design-md-for-agents.md); [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- **Topic** — Stitch-style `DESIGN.md`, agent-readable visual specs

## Snippet or summary

1. **Default:** follow repo-root **`DESIGN.md`** (Devscrolls foundation, brand personality, **scaffold-first** policy, non-negotiable **#11**: no modals or `alert`/`confirm`/`prompt` unless explicitly requested) and **`src/styles/app.css`** theme `devscrolls` — see **`.cursor/rules/follow-devscrolls-ui-foundation.mdc`**. **Fleet-wide** token/theme edits: [`fleet-ui-evolve-in-scaffold-first.md`](./fleet-ui-evolve-in-scaffold-first.md).
2. Read [design-md-for-agents.md](../../docs/design-md-for-agents.md) for terminology (`AGENTS.md` vs `DESIGN.md`) and links.
3. **Opt-in only:** when the product owner wants a **non-fleet** look, pick a **`DESIGN.md`** from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md) (or author one) and copy it into the project (commonly repo root or `docs/`), reconciling tokens with the fleet baseline if both must coexist.
4. Implement against the active brief: semantic colors, type scale, spacing, and component states—wire tokens into Tailwind/CSS so **code and doc stay aligned**.

## When to use

**Fleet default:** almost all Devscrolls scaffold apps — use root `DESIGN.md` + `devscrolls` theme.

**This gold path (external `DESIGN.md`):** landing pages, dashboards, or flows where an **explicit non-Devscrolls** aesthetic is required and **visual consistency** must come from a copied Stitch-style file.
