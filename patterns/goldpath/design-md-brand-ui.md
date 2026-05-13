---
kind: goldpath
topics: [design-md, branding, ui, stitch]
date: "2026-05-13"
---

# DESIGN.md for brand-aligned UI (gold path)

- **Date** — 2026-05-13
- **Source** — [docs/design-md-for-agents.md](../../docs/design-md-for-agents.md); [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- **Topic** — Stitch-style `DESIGN.md`, agent-readable visual specs

## Snippet or summary

1. Read [design-md-for-agents.md](../../docs/design-md-for-agents.md) for terminology (`AGENTS.md` vs `DESIGN.md`) and links.
2. When the user wants a recognizable **product/marketing** look without a bespoke brief, pick a **`DESIGN.md`** from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md) and copy it into the project (commonly repo root or `docs/`).
3. Implement against that file: semantic colors, type scale, spacing, and component states—then wire tokens into Tailwind/CSS so **code and doc stay aligned**.

## When to use

Landing pages, dashboards, or flows where **visual consistency** matters more than default component styling. Skip when the user only needs internal tooling skinned with DaisyUI defaults and has no brand requirements.
