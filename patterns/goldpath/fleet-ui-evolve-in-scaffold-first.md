---
kind: goldpath
topics: [branding, ui, fleet, scaffold, design-system]
date: "2026-05-14"
---

# Fleet UI: evolve in scaffold first (gold path)

- **Date** — 2026-05-14
- **Source** — repo-root [`DESIGN.md`](../../DESIGN.md); [`.cursor/rules/follow-devscrolls-ui-foundation.mdc`](../../.cursor/rules/follow-devscrolls-ui-foundation.mdc)
- **Topic** — where token, theme, and fleet-wide UX rules change

## Snippet or summary

1. **Canonical repo:** **`scrolls-cf/scaffold`** owns fleet **`DESIGN.md`**, **`src/styles/app.css`** (`devscrolls` theme), and shared **`.cursor/rules`** that encode brand/UX defaults.
2. **Change workflow:** edit scaffold → **`npm run build:css`** when CSS changes → commit → **`git push origin master`** → in each fork (`jobs`, `repo-factory`, `scrollsmatrix`, …) **`git fetch`** scaffold remote → **`git merge scaffold/master`** (or `upstream/master`) → resolve conflicts favoring **product-specific** markup in the fork, **fleet tokens** from scaffold.
3. **Do not** introduce a divergent palette or parallel `DESIGN.md` “v2” in a fork without either merging the same change back into scaffold or getting an explicit product opt-out (see `docs/design-md-for-agents.md`).

## When to use

Any time you would change **OKLCH theme values**, **semantic color roles**, **fleet-wide motion rules**, or **global typography defaults** that more than one app should inherit.
