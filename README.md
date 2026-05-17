```txt
npm install
npm run dev
```

**UI / branding:** Fleet design lives in **[`scrolls-cf/scrollsdesigner`](https://github.com/scrolls-cf/scrollsdesigner)**. This repo gets copies via `npm run sync:fleet` there. Local rules: **[`DESIGN.md`](./DESIGN.md)** · themes in **`themes/`** · rebuild: `npm run build:css`.

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
