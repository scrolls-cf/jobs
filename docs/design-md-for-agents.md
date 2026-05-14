# DESIGN.md and brand UI — guide for agents (Jobs)

**When to read this:** You are defining or implementing **marketing or product UI** where the user cares about **consistent look-and-feel** (palette, type scale, components), not only Tailwind defaults or DaisyUI themes.

## Devscrolls fleet default (read first)

Apps in this fleet ship with a **canonical house style**: root **`DESIGN.md`** (Devscrolls UI foundation, brand personality, **scaffold-first** evolution policy, plus **jobs-board** notes in the same file) and the **`devscrolls`** DaisyUI theme in **`src/styles/app.css`**. Agents must follow **`.cursor/rules/follow-devscrolls-ui-foundation.mdc`** for all routine UI unless the product owner opted out. **Brand / marketing / UX-UI** work expresses creativity **within** those rails; **fleet-wide** visual changes belong in **scaffold** first, then merge into forks (`patterns/goldpath/fleet-ui-evolve-in-scaffold-first.md`). **`scrollsmatrix`** repos that cannot merge scaffold use [`../patterns/goldpath/scrollsmatrix-fleet-design-sync.md`](../patterns/goldpath/scrollsmatrix-fleet-design-sync.md).

Use this document when you need **another** aesthetic or an **additional** Stitch-style `DESIGN.md` from outside the fleet.

## What this is

**DESIGN.md** (popularized alongside **Google Stitch**) is a **plain Markdown** design brief: colors, typography, layout rules, component notes, and guardrails. Coding agents read it like a lightweight design system—no Figma export or JSON schema required.

| File | Typical reader | Role |
| ---- | ---------------- | ---- |
| `AGENTS.md` | Coding agents | How to build and run the repo |
| `DESIGN.md` | Same agents (or design tools) | How the product should **look and feel** |

## Curated examples (industry patterns)

**[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)** maintains a large catalog of **ready-made `DESIGN.md` files** inspired by public sites (grouped by AI platforms, devtools, fintech, etc.), each following a predictable section layout (visual theme, palette, typography, components, layout, elevation, do/don’ts, responsive notes, agent prompt hints). Use it to:

- Pick a **reference aesthetic** when the user names a brand or product family but does not supply a design file.
- Copy one `DESIGN.md` into the project root (or `docs/`) and treat it as the **source of truth** for tokens and hierarchy while implementing HTML/CSS/Tailwind.

Treat every file there as **third-party inspiration** derived from public CSS; it is not an official brand guideline and may drift from live sites.

## Related tooling

- Google’s **[design-md](https://officialskills.sh/google-labs-code/skills/design-md)** skill (also listed under Stitch in [awesome-agent-skills-catalog-full.md](./awesome-agent-skills-catalog-full.md)) helps **author and maintain** `DESIGN.md` files in a Stitch-aligned shape.

## How to use with this stack

1. **This jobs app:** keep repo-root **`DESIGN.md`** aligned with **`public/index.html`** and **`src/styles/app.css`** whenever you change shipped visuals (board layout, tokens, motion).
2. If the user wants a specific “vibe,” open **awesome-design-md**, choose a close match, and **copy only the `DESIGN.md`** you need (optionally note the upstream folder name in a comment or doc).
3. Map tokens to implementation: Tailwind theme extension, CSS variables, or DaisyUI theme—**keep one canonical token layer** so `DESIGN.md` and code do not disagree.
4. For motion, still follow [gsap-for-agents.md](./gsap-for-agents.md) and `patterns/goldpath/gsap-prefer-transforms.md`; `DESIGN.md` does not replace performance rules.

## Repo pointer

Gold-path workflow for agents: [`../patterns/goldpath/design-md-brand-ui.md`](../patterns/goldpath/design-md-brand-ui.md).
