---
kind: goldpath
topics: [scrollsmatrix, branding, fleet, sync]
date: "2026-05-14"
---

# Bring scaffold fleet design into scrollsmatrix

- **Date** — 2026-05-14
- **Source** — [`fleet-ui-evolve-in-scaffold-first.md`](./fleet-ui-evolve-in-scaffold-first.md); repo-root [`DESIGN.md`](../../DESIGN.md)
- **Topic** — keep **scrollsmatrix** visually aligned when **scaffold** branding or rules change

## Why this exists

**`scrollsmatrix`** is often a **standalone** Git repo (no common ancestor with **`scrolls-cf/scaffold`**), so **`git merge scaffold/master`** may fail with **unrelated histories**. Branding must still stay in lockstep: **edit scaffold first**, then **propagate files** into scrollsmatrix.

## After every relevant scaffold push

Relevant = changes to **fleet** `DESIGN.md`, **`src/styles/app.css`** (`devscrolls` theme), **`.cursor/rules`** for UI, **`patterns/goldpath`** branding entries, or **`docs/design-md-for-agents.md`** fleet paragraphs.

Assume **sibling directories** `scaffold/` and `scrollsmatrix/` under the same parent (adjust paths if yours differ).

### 1. Copy verbatim (scaffold → scrollsmatrix)

| Scaffold path | Scrollsmatrix path |
| --- | --- |
| `.cursor/rules/follow-devscrolls-ui-foundation.mdc` | same |
| `.cursor/rules/consult-design-md-for-branding.mdc` | same |
| `src/styles/app.css` | same |
| `patterns/goldpath/fleet-ui-evolve-in-scaffold-first.md` | same |
| `patterns/goldpath/design-md-brand-ui.md` | same |
| `patterns/goldpath/scrollsmatrix-fleet-design-sync.md` | same (keeps procedure identical) |
| `patterns/goldpath/github-fleet-repo-visibility-default.md` | same |
| `patterns/goldpath/daisyui-tailwind-minimal-drift.md` | same |

### 2. `docs/design-md-for-agents.md`

Copy scaffold’s body, but keep the **H1 title** as **Scrollsmatrix** (or your product name) so the doc index stays accurate.

### 3. Repo-root `DESIGN.md` (manual merge)

1. From **scaffold** `DESIGN.md`, copy **`## Intent`** through **`## Components (defaults)`** (inclusive), plus **`## When to copy an external`** … **`## Revision`** if those changed.
2. In **scrollsmatrix** `DESIGN.md`, replace the matching **fleet** sections so they match scaffold, but **preserve** scrollsmatrix’s **`## This product — gateway landing`** block (and any other **product-only** sections below it).
3. Keep scrollsmatrix **H1 / Audience / Status** unless you intentionally re-scope the product.

### 4. Docs and pattern indexes

Diff and port updates from scaffold **`docs/README.md`**, **`patterns/README.md`**, and **`patterns/goldpath/README.md`** when new fleet rows or links appear.

### 5. Rebuild CSS in scrollsmatrix

```bash
cd ../scrollsmatrix
npm run build:css
```

### 6. Commit in scrollsmatrix

Use a message such as: **`chore: sync fleet branding from scrolls-cf/scaffold`**.

## One-shot shell (sibling layout)

From **`scrollsmatrix/`** (parent contains `scaffold/`):

```bash
cp ../scaffold/.cursor/rules/follow-devscrolls-ui-foundation.mdc .cursor/rules/
cp ../scaffold/.cursor/rules/consult-design-md-for-branding.mdc .cursor/rules/
cp ../scaffold/src/styles/app.css src/styles/
cp ../scaffold/patterns/goldpath/fleet-ui-evolve-in-scaffold-first.md patterns/goldpath/
cp ../scaffold/patterns/goldpath/design-md-brand-ui.md patterns/goldpath/
cp ../scaffold/patterns/goldpath/scrollsmatrix-fleet-design-sync.md patterns/goldpath/
cp ../scaffold/patterns/goldpath/github-fleet-repo-visibility-default.md patterns/goldpath/
cp ../scaffold/patterns/goldpath/daisyui-tailwind-minimal-drift.md patterns/goldpath/
```

Then perform **`DESIGN.md`** / **`docs/design-md-for-agents.md`** / index merges as above, **`npm run build:css`**, commit.
