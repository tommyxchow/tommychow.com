# AGENTS.md

# Project

Personal portfolio site for Tommy Chow. Dark mode only.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build (auto-runs gallery via prebuild)
pnpm start        # Start production server (Node.js)
pnpm gallery      # Regenerate gallery manifest (run when images change)
pnpm preview      # Build and preview on local Cloudflare Workers
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm upload       # Build and upload to Cloudflare Workers (no deploy)
pnpm cf-typegen   # Generate CloudflareEnv types from wrangler.jsonc
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking (tsc --noEmit)
pnpm format       # Format with Prettier
pnpm check        # Full check: typecheck + lint + build
pnpm ui:update    # Regenerate all shadcn components to latest
pnpm clean        # Delete .next, .open-next, and node_modules
pnpm nuke         # Delete .next, .open-next, node_modules, and pnpm-lock.yaml
```

## Architecture

Next.js 16 App Router with React 19. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

**Runtime**: Node.js >= 22, pnpm 10

### Key Configuration

- **React Compiler**: Enabled for automatic memoization
- **Typed Routes**: Enabled for type-safe `href` props
- **Path Alias**: `@/*` maps to `./src/*`
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `verbatimModuleSyntax`

### Source Structure

- `src/app/` - App Router pages and layouts
- `src/components/` - React components (`ui/` subdirectory for shadcn — add with `pnpm dlx shadcn@latest add <component>`)
  - **shadcn components are pre-installed.** Before building custom UI, check `src/components/ui/` for existing components and consult [shadcn docs](https://ui.shadcn.com/docs/components) for usage patterns, composition examples, and any newer components that can be added.
  - `button.tsx` is a `'use client'` module — `buttonVariants()` and `<Button>` can only be used in client components. There is no `asChild` prop (Base UI, not Radix).
- `src/lib/` - Utilities (`cn()` for className merging), constants, and server-only code
- `src/hooks/` - Custom React hooks

### Cloudflare Workers

- `wrangler.jsonc` - Cloudflare Workers configuration (bindings, R2, services, etc.)
- `open-next.config.ts` - OpenNext adapter config
- `cloudflare-env.d.ts` - Generated types for Cloudflare bindings (run `pnpm cf-typegen` to regenerate)

### Environment Variables

- `SITE_URL` — Base URL for the site. Declared in `wrangler.jsonc`, defaults to `http://localhost:3000` for local dev. Used in `src/lib/constants.ts` for `metadataBase`, sitemap, and robots.txt.

### Gallery System

Images in `public/gallery/images/` are processed by `pnpm gallery` into `src/lib/gallery-manifest.json` using `sharp` and `thumbhash`. The manifest is committed to git and re-exported by `src/lib/server-utils.ts`.

### Key Libraries

- **nuqs** — Type-safe URL search params (`useQueryState`, `useQueryStates`)
- **motion** — Animation library (Framer Motion v12+)
- **react-medium-image-zoom** — Zoomable images in the gallery
- **lucide-react** — Icons; `react-icons` for brand icons (e.g., `SiGithub`)

## Code Style

Enforced by `pnpm lint` (ESLint) and `pnpm format` (Prettier). Non-obvious decisions:

- Enums are banned — use `as const` objects or union types
- Use `import type` / `export type` with inline style (`import { type Foo }`)
- Prefix unused variables with `_`
- Prettier auto-sorts imports and Tailwind classes — don't sort manually
- Use `cn()` from `@/lib/utils` for conditional classes (combines `clsx` + `tailwind-merge`)
- Colors via CSS custom properties: `--foreground`, `--background`, `--muted-foreground`, etc.
- `strict-boolean-expressions` — no implicit boolean coercion; use explicit checks (e.g., `!== undefined`) instead of truthy checks
- `prefer-nullish-coalescing` — prefer `??` over `||` for nullish checks
- `react-you-might-not-need-an-effect` — flags unnecessary `useEffect`; derive state or use event handlers instead

## Gotchas

- **Dark mode only**: App uses a dark-first design — don't introduce light-mode specific assumptions
- **shadcn uses @base-ui/react**: Not Radix UI — component primitives differ from older shadcn examples
- **Page components**: Colocate client components with pages (e.g., `GalleryClient.tsx` alongside `page.tsx`)
- **Server utilities**: `src/lib/server-utils.ts` uses `import 'server-only'` to enforce server-only code
