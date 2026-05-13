# Tailwind CSS with Vite (upstream digest)

**Primary reference:** [Installing Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite) (Tailwind CSS v4).

Tailwind scans HTML, components, and templates for class names, generates utilities, and writes static CSS. The **Vite plugin** path is the smoothest integration for Vite-based apps (React Router, Nuxt, SvelteKit, Laravel Vite, SolidJS, etc.).

## This repo vs Vite

**Scaffold** is a **Cloudflare Workers + Hono** app (`wrangler dev` / `deploy`). It builds CSS with the **Tailwind CLI** (`npm run build:css` → `src/styles/app.css` → `public/assets/app.css`), not Vite. Use this digest when you add a **Vite** SPA or asset pipeline (for example a separate `client/` package) and want Tailwind v4 on that side.

For **`@tailwindcss/typography`** and `prose` on the CLI path above, see [tailwind-typography-for-agents.md](./tailwind-typography-for-agents.md).

## Install steps (Vite plugin)

### 1. Create or use a Vite project

```bash
npm create vite@latest my-project
cd my-project
```

### 2. Install packages

```bash
npm install tailwindcss @tailwindcss/vite
```

### 3. Register the Vite plugin

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### 4. Import Tailwind in your CSS entry

```css
@import "tailwindcss";
```

### 5. Run dev

```bash
npm run dev
```

### 6. Use utilities in markup

Ensure the compiled stylesheet is linked from HTML (or let your framework inject it), then use classes (e.g. `text-3xl font-bold underline`).

## When you are stuck

Framework-specific wiring differs; Tailwind’s **framework guides** on the same doc site often spell out `index.html`, entry CSS paths, and SSR quirks.

## Workers note

If styles are produced by Vite, point Wrangler [static assets](https://developers.cloudflare.com/workers/static-assets/) or your build output at the directory Vite emits so the worker serves the built CSS and JS.
