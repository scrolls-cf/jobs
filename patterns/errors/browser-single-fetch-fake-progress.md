---
kind: anti-pattern
topics: [browser, fetch, async, ux]
date: "2026-05-15"
---

# Browser: one `fetch` driving fake multi-step progress

- **Date** — 2026-05-15
- **Context** — static pages or SPA code that talks to a Worker or API for **multi-phase** server work (e.g. GitHub fork then Cloudflare provision)

## Bad pattern

Using **one** `await fetch(url, { … })` for the whole chain, then trying to animate or rewrite UI strings as if the user had seen **intermediate** server phases complete—without **streaming** or **extra round trips**.

```javascript
setProgress("creating repo …");
const res = await fetch("/api/do-everything", { method: "POST", body: JSON.stringify({ name }) });
// You cannot truthfully set "repo created" then "creating worker" from `res`
// until the entire handler returns, unless the server streams events.
```

## Why it is wrong

The client **blocks** on one HTTP response. Until the response body is available, the browser does **not** know that phase A succeeded and phase B started. Faking steps with timers or guessed copy **lies** to the user and breaks whenever latency or partial failure differs from the script.

## Fix / reference

- **Gold path:** [`../goldpath/browser-async-chaining-multi-step-ui.md`](../goldpath/browser-async-chaining-multi-step-ui.md) — sequential `await`s, UI updates **between** awaits, and/or streaming.
- **Fleet example:** scrollsmatrix gateway repo creation — staged **`create-repo`** body fields (`stage: "github"` then `stage: "cloudflare"`) with matching progress text in **`public/assets/landing.js`**.
