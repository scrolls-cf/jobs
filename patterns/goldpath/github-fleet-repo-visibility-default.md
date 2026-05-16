---
kind: goldpath
topics: [github, org, fleet, visibility]
date: "2026-05-14"
---

# GitHub: fleet repo visibility (gold path)

- **Date** — 2026-05-14
- **Topic** — default **public** vs **private** when creating GitHub repos for apps bootstrapped from **`scrolls-cf/scaffold`**

## Snippet or summary

1. **Default — public:** new fleet repos (**repos forked from scaffold**, Workers, services like **`jobs`**, **`repo-factory`**, and future org apps) should be **Public** on GitHub unless the product owner documents a reason not to (compliance, embargoed work, or a deliberate closed beta).
2. **Exception — scrollsmatrix:** the **scrollsmatrix** gateway repo stays **Private** (not forked from scaffold; product/org choice). Do **not** treat that exception as the default for other repos.
3. **CLI:** prefer an explicit flag so agents do not inherit a tool default to private:

   ```bash
   gh repo create OWNER/new-app --public --source=. --remote origin --push
   ```

4. **Already private by mistake:** `gh repo edit OWNER/REPO --visibility public` (requires org permission).

## When to use

Any time you **`gh repo create`**, document **“create GitHub repo”** in bootstrap docs, or implement **programmatic** repo creation (GitHub App / PAT) for scaffold-derived apps.
