# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Tommy Chow, built with **Next.js 16**, **React 19**, **React Compiler**, **Tailwind CSS v4**, and **shadcn/ui** (base-vega style). Typed routes enabled. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (auto-runs gallery via prebuild)
pnpm gallery      # Regenerate gallery manifest (run when images change)
pnpm preview      # Build and preview on local Cloudflare Workers
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check (tsc --noEmit)
pnpm format       # Prettier format
pnpm clean        # Remove .next, .open-next build caches
pnpm nuke         # Remove .next, .open-next, node_modules, and pnpm-lock.yaml
```

## Architecture

- **App Router** with React Server Components by default; use `'use client'` only when needed
- **React Compiler** enabled for automatic memoization
- **Typed Routes** enabled for type-safe `href` props
- **Path alias**: `@/*` maps to `./src/*`
- **Server utilities**: `src/lib/server-utils.ts` uses `import 'server-only'` to enforce server-only code
- **Gallery system**: Images in `public/gallery/images/` are processed by `pnpm gallery` into `src/lib/gallery-manifest.json` using `sharp` and `thumbhash`. The manifest is committed to git and re-exported by `src/lib/server-utils.ts`

### Component Organization

- **UI primitives**: `src/components/ui/` — shadcn/ui components
- **App components**: `src/components/` — custom components like `CustomImage`, `Header`, `Providers`, `Prose`, `PixelatedBackground`
- **Page components**: Colocate client components with pages (e.g., `GalleryClient.tsx` alongside `page.tsx`)

## Code Style

### TypeScript

- Strict mode enabled; use inline type imports: `import { type Foo } from 'bar'`
- Prefer explicit `interface` over `type` for component props
- Define prop interfaces directly above component
- Prefix unused variables with `_`

### Styling

- Use `cn()` from `@/lib/utils` for conditional classes (combines `clsx` + `tailwind-merge`)
- Use `twJoin`/`twMerge` from `tailwind-merge` for simpler cases
- Colors via CSS custom properties: `--foreground`, `--background`, `--muted-foreground`, etc.
- Tailwind v4 syntax: `@theme`, `@plugin`, `@custom-variant` in `globals.css`

### Formatting

- Single quotes, no semicolons (Prettier configured)
- Prettier auto-organizes imports and sorts Tailwind classes

### ESLint

- `strict-boolean-expressions` — no implicit coercion; use explicit checks (e.g., `str !== undefined` instead of `if (str)` for non-boolean types, though nullable booleans and nullable strings are allowed)
- `switch-exhaustiveness-check` — switch statements must handle all union members
- `no-console` — `console.log` warns; only `console.warn` and `console.error` allowed
- `no-array-index-key` — avoid array index as React key (warning)

### Icons & Animations

- Use `lucide-react` for icons; `react-icons` for brand icons (e.g., `SiGithub`)
- Use `motion` package: `import { motion } from 'motion/react'`
- Imperative animations: `import { animate } from 'motion'`

## Adding Features

### New shadcn/ui component

```bash
pnpm dlx shadcn@latest add <component-name>
```

### New page

Create `src/app/<route>/page.tsx` as a Server Component. For interactive features, extract to a colocated `*Client.tsx` file with `'use client'` directive.

### New images

Drop images into `public/gallery/images/`, then run `pnpm gallery` to regenerate the manifest. Commit the updated `src/lib/gallery-manifest.json`.

## Gotchas

- **Dark mode only**: App forces dark theme (`forcedTheme='dark'` in Providers) — don't add light mode variants
- **shadcn uses @base-ui/react**: Not Radix UI — component primitives differ from older shadcn examples
- **Extra TS strict flags**: `noUncheckedIndexedAccess` is enabled — always handle potential `undefined` from array/object index access
- **More TS strict flags**: `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, and `verbatimModuleSyntax` (use `import type` / `export type` for type-only imports)
