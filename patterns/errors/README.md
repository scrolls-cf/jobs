# Anti-patterns and mistakes log

**Audience:** AI coding agents and maintainers. These files are what agents should **avoid** repeating. For the full tree map, read [`../README.md`](../README.md).

Append entries when you encounter **incorrect, fragile, or misleading code** in this codebase or in examples you almost copied.

## Entry format

Use one markdown file per theme or one dated log—keep it consistent with `../goldpath/`.

Suggested fields per entry:

- **Date** — ISO date
- **Context** — file path or feature
- **Bad pattern** — short description or fenced code block
- **Why it is wrong** — failure mode, security, or maintenance cost
- **Fix / reference** — link to issue, PR, or `../goldpath/` entry

Optional YAML frontmatter (`kind: anti-pattern`, `topics`, `date`) at the top of each entry helps agents find files by topic; see [`../README.md`](../README.md).

Do not log sensitive data (tokens, secrets, PII).
