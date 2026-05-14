# Gold path — best practices and snippets

**Audience:** AI coding agents and maintainers. These files are what agents should **follow** (preferred stack, snippets, and repo-specific constraints). For the full tree map, read [`../README.md`](../README.md).

**Rule:** when you land the fix for a non-trivial bug or CI failure, add or update the **solution** here (paired with `../errors/`) per [`.cursor/rules/document-fixes-in-patterns.mdc`](../../.cursor/rules/document-fixes-in-patterns.mdc).

Append entries when you find **recommended patterns, canonical examples, or doc-aligned snippets** worth reusing in this project.

**Default UI:** repo-root [`DESIGN.md`](../../DESIGN.md) + [`.cursor/rules/follow-devscrolls-ui-foundation.mdc`](../../.cursor/rules/follow-devscrolls-ui-foundation.mdc). **Fleet-wide token/theme changes:** [`fleet-ui-evolve-in-scaffold-first.md`](./fleet-ui-evolve-in-scaffold-first.md) (edit scaffold → push → merge forks).

**DaisyUI + Tailwind (minimal drift):** [`daisyui-tailwind-minimal-drift.md`](./daisyui-tailwind-minimal-drift.md) — reuse stock components/utilities; scoped overrides only. **Forms / textareas:** [`daisyui-5-form-fields-markup.md`](./daisyui-5-form-fields-markup.md); foot-guns [`../errors/daisyui-5-legacy-form-class-names.md`](../errors/daisyui-5-legacy-form-class-names.md), [`../errors/daisyui-5-textarea-wrapper-ux.md`](../errors/daisyui-5-textarea-wrapper-ux.md).

**Scrollsmatrix (no git merge):** after fleet changes ship from scaffold, use [`scrollsmatrix-fleet-design-sync.md`](./scrollsmatrix-fleet-design-sync.md).

**GitHub repo visibility:** fleet apps from scaffold default **public**; **scrollsmatrix** alone stays **private** — [`github-fleet-repo-visibility-default.md`](./github-fleet-repo-visibility-default.md).

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
