# Gold path — best practices and snippets

**Audience:** AI coding agents and maintainers. These files are what agents should **follow** (preferred stack, snippets, and repo-specific constraints). For the full tree map, read [`../README.md`](../README.md).

**Rule:** when you land the fix for a non-trivial bug or CI failure, add or update the **solution** here (paired with `../errors/`) per [`.cursor/rules/document-fixes-in-patterns.mdc`](../../.cursor/rules/document-fixes-in-patterns.mdc).

Append entries when you find **recommended patterns, canonical examples, or doc-aligned snippets** worth reusing in this project.

**Default UI:** repo-root [`DESIGN.md`](../../DESIGN.md) (fleet + jobs board) + [`.cursor/rules/follow-devscrolls-ui-foundation.mdc`](../../.cursor/rules/follow-devscrolls-ui-foundation.mdc). **Fleet-wide token/theme changes:** [`fleet-ui-evolve-in-scaffold-first.md`](./fleet-ui-evolve-in-scaffold-first.md) (edit scaffold → push → merge forks).

**Non-fleet / external `DESIGN.md`:** start from [`design-md-brand-ui.md`](./design-md-brand-ui.md) and the digest [`../../docs/design-md-for-agents.md`](../../docs/design-md-for-agents.md) (see [`.cursor/rules/consult-design-md-for-branding.mdc`](../../.cursor/rules/consult-design-md-for-branding.mdc)).

## Entry format

Suggested fields per entry:

- **Date** — ISO date
- **Source** — doc URL, official example, or internal PR
- **Topic** — package or area (e.g. Wrangler, Hono, bindings)
- **Snippet or summary** — fenced code or bullet steps
- **When to use** — constraints or tradeoffs

Optional YAML frontmatter (`kind`, `topics`, `date`) at the top of each entry helps agents find files by topic; see [`../README.md`](../README.md).

Prefer linking to stable upstream docs; paste minimal excerpts under fair use for offline clarity.
