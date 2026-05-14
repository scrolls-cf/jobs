```txt
npm install
npm run dev
```

**UI / branding:** Devscrolls fleet defaults live in **[`DESIGN.md`](./DESIGN.md)** (product rules for agents) and **`src/styles/app.css`** (`devscrolls` DaisyUI theme). Rebuild CSS after token edits: `npm run build:css`.

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
