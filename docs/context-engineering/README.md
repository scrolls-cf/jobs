# Context engineering skills (Scaffold)

**Agent navigation:** Parent index → [../README.md](../README.md). Use the **Skill index** table below to pick one row; open `.cursor/skills/<skill-id>/SKILL.md` only for that topic (progressive disclosure).

This package vendors **[Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering)** (MIT) for Cursor: each skill is a `SKILL.md` under `.cursor/skills/<skill-id>/`.

Context engineering is the discipline of curating what enters the model’s attention budget (system prompt, tools, retrieval, history, tool outputs), not only one-off prompt writing.

## Refresh upstream content

To update vendored skills, copy or download `SKILL.md` from [Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) (`skills/<skill-id>/SKILL.md`) into **both** `scrollsmatrix/.cursor/skills/` and `scaffold/.cursor/skills/`, keeping the same directory layout.

## Skill index (progressive disclosure)

| Skill ID | Focus |
| -------- | ----- |
| `context-fundamentals` | Anatomy of context, attention budget, placement, progressive disclosure |
| `context-degradation` | Lost-in-middle, poisoning, distraction, clash |
| `context-compression` | Long-session compression and evaluation |
| `multi-agent-patterns` | Orchestrator, peer, hierarchical patterns |
| `memory-systems` | Short-term, long-term, graph-style memory |
| `tool-design` | Tool surfaces agents can use reliably |
| `filesystem-context` | Scratch files, discovery, offloading large tool output |
| `hosted-agents` | Sandboxed / hosted coding agents, background work |
| `context-optimization` | Compaction, masking, caching |
| `latent-briefing` | KV-oriented handoff between orchestrator and workers |
| `evaluation` | Test harnesses and quality measurement |
| `advanced-evaluation` | LLM-as-judge, rubrics, bias mitigation |
| `project-development` | Task–model fit, pipelines, structured outputs |
| `bdi-mental-states` | BDI-style beliefs / desires / intentions from structured context |

**Catalog skill:** `.cursor/skills/context-engineering-index/SKILL.md` — entry point for agents working in this directory.

## Scaffold-specific notes (Hono on Workers)

- **Routes as tools:** prefer **stable JSON shapes**, explicit error codes, and **size-bounded** bodies for anything that might be summarized or replayed into model context (`tool-design`, `context-optimization`).
- **Middleware:** centralize auth, request size limits, and correlation IDs so downstream handlers stay small and composable (`multi-agent-patterns` analog at the HTTP layer).
- **Code patterns:** see `patterns/goldpath/2026-05-13-context-engineering-hono-workers.md` and `src/lib/agent-context.ts` (optional helpers for bounded JSON responses).

## Attribution

Skills content is © Muratcan Koylan and contributors, MIT License. Upstream repository: https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering
