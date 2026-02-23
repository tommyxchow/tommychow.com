# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Author Preferences

### Code Opinions

- Prefer production-ready solutions over toy examples
- Named exports only — no default exports except where required by Next.js (page, layout, route, etc.)
- `satisfies` over `as` for type validation
- `UPPER_SNAKE_CASE` for constants
- Derive state where possible — avoid duplicating what can be computed
- Avoid `useRef` unless DOM access or imperative work
- Inline until a pattern repeats 3+ times, then extract
- For new components/hooks/APIs: include a usage example

### Workflow

- When implementing new code, search the codebase for existing usages and follow established patterns
- When new code supersedes existing functionality, find and remove everything it makes redundant
- Favor parallel tool calls and subagents when tasks are independent
- For refactors: summary → trade-offs → next steps

### Testing

- Suggest tests when changes touch logic, but don't write tests unless asked
- Run targeted tests for relevant files, not the full suite

### Code Review

- Label severity: `critical` / `major` / `minor`
- Prefer minimal, tightly scoped diffs
- Flag security issues (XSS, CSRF, injection, auth gaps) with fixes
- Flag unnecessary complexity with a simpler alternative

### Never

- Never use `npm`, `npx`, or `yarn` — always use `pnpm` / `pnpx`
- Never install a new dependency without asking first

---

## Project Overview

Personal portfolio site for Tommy Chow, built with **Next.js 16**, **React 19**, **React Compiler**, **Tailwind CSS v4**, and **shadcn/ui**. Typed routes are enabled. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (auto-runs gallery via prebuild)
pnpm start        # Start production server (Node.js)
pnpm gallery      # Regenerate gallery manifest (run when images change)
pnpm preview      # Build and preview on local Cloudflare Workers
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm upload       # Build and upload to Cloudflare Workers (no deploy)
pnpm cf-typegen   # Generate CloudflareEnv types from wrangler.jsonc
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check (tsc --noEmit)
pnpm check        # Full check: typecheck + lint + build
pnpm ui:update    # Regenerate all shadcn components to latest
pnpm format       # Prettier format
pnpm clean        # Remove .next, .open-next, node_modules
pnpm nuke         # clean + remove pnpm-lock.yaml
```

## Architecture

- **App Router** with React Server Components by default; use `'use client'` only when needed
- **React Compiler** enabled for automatic memoization
- **Typed Routes** enabled for type-safe `href` props
- **Path alias**: `@/*` maps to `./src/*`
- **Runtime**: Node.js >= 22, pnpm 10
- **Server utilities**: `src/lib/server-utils.ts` uses `import 'server-only'` to enforce server-only code
- **Gallery system**: Images in `public/gallery/images/` are processed by `pnpm gallery` into `src/lib/gallery-manifest.json` using `sharp` and `thumbhash`. The manifest is committed to git and re-exported by `src/lib/server-utils.ts`

### Component Organization

- **UI primitives**: `src/components/ui/` — shadcn/ui components (managed by `pnpm ui:update`)
- **App components**: `src/components/` — custom components like `CustomImage`, `Header`, `Providers`, `Prose`, `PixelatedBackground`
- **Page components**: Colocate client components with pages (e.g., `GalleryClient.tsx` alongside `page.tsx`)

### Source Structure

- `src/app/` - App Router pages and layouts
- `src/components/` - React components
- `src/lib/` - Utilities and constants
- `src/hooks/` - Custom React hooks

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

- Enums are banned — use `as const` objects or union types
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

- **Dark mode only**: App uses a dark-first design — don't introduce light-mode specific assumptions
- **shadcn uses @base-ui/react**: Not Radix UI — component primitives differ from older shadcn examples
- **Extra TS strict flags**: `noUncheckedIndexedAccess` is enabled — always handle potential `undefined` from array/object index access
- **More TS strict flags**: `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, and `verbatimModuleSyntax` (use `import type` / `export type` for type-only imports)
