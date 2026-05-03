# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

---

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
  - Only the components actually in use live in `src/components/ui/` (currently `button.tsx` and `popover.tsx`). Add more as needed.
  - `<Button>` has no `asChild` prop (Base UI, not Radix).
- `src/lib/` - Utilities (`cn()` for className merging), constants, and server-only code
- `src/hooks/` - Custom React hooks

### Cloudflare Workers

- `wrangler.jsonc` - Cloudflare Workers configuration (bindings, R2, services, etc.)
- `open-next.config.ts` - OpenNext adapter config
- `cloudflare-env.d.ts` - Generated types for Cloudflare bindings (run `pnpm cf-typegen` to regenerate)

### Environment

- `SITE_URL` — Base URL for the site. Declared in `wrangler.jsonc`, defaults to `http://localhost:3000` for local dev. Used in `src/lib/constants.ts` for `metadataBase`, sitemap, and robots.txt.
- `src/env.d.ts` narrows `process.env.SITE_URL` to `string | undefined`. Without it, the auto-generated `cloudflare-env.d.ts` types it as a literal from `wrangler.jsonc`, which makes the `??` fallback look like dead code to TS even though it's needed in `pnpm dev`. Don't declare secrets in `wrangler.jsonc` (committed to git) — set production secrets via Cloudflare dashboard or `pnpx wrangler secret put`.

### Images

- **Static/known images** (the gallery): pre-generate webp variants at build time via `sharp` in `scripts/generate-gallery-manifest.ts` and use plain `<img srcset>`. Don't switch to `next/image` with the Cloudflare IMAGES binding for these — it bills per-call with no dedup and `/_next/image` responses aren't edge-cached without a Cache Rule.
- **Dynamic/user-uploaded images** (none today): would require uncommenting the IMAGES binding in `wrangler.jsonc` and configuring a Cache Rule for `/_next/image*` in the Cloudflare dashboard (Caching → Cache Rules → Edge TTL override 1 year). Without it, every cache miss re-bills.

### Gallery System

Images in `public/gallery/images/` are processed by `pnpm gallery` into `src/lib/gallery-manifest.json` using `sharp` and `thumbhash`. The manifest is committed to git and re-exported by `src/lib/server-utils.ts`.

### Key Libraries

- **nuqs** — Type-safe URL search params (`useQueryState`, `useQueryStates`)
- **motion** — Animation library (Framer Motion v12+). Import from `motion/react` (e.g., `import { motion, useMotionValue } from 'motion/react'`), not `framer-motion`
- **react-medium-image-zoom** — Zoomable images in the gallery
- **lucide-react** — Icons; `react-icons/fa6` for brand icons (`FaGithub`, `FaLinkedin`)

## Code Style

Enforced by `pnpm lint` (ESLint) and `pnpm format` (Prettier). Project-specific conventions beyond the global code style:

- Inline type imports (`import { type Foo }`) — enforced by `consistent-type-imports` with `fixStyle: 'inline-type-imports'`
- Prefix unused variables with `_` — `no-unused-vars` whitelists the `^_` pattern
- Prettier auto-sorts imports and Tailwind classes — don't sort manually
- Use `interface` for component props, colocated directly above the component (`interface FooProps { ... }`)
- Use `cn()` from `@/lib/utils` for conditional/merged classes (combines `clsx` + `tailwind-merge`); use `twJoin` from `tailwind-merge` when you just need to concatenate static strings without merging conflicts
- Colors via CSS custom properties: `--foreground`, `--background`, `--muted-foreground`, etc.

## Gotchas

- **Dark mode only**: App uses a dark-first design — don't introduce light-mode specific assumptions
- **shadcn uses @base-ui/react**: Not Radix UI — imports differ from older shadcn examples, and most components don't expose `asChild`
- **`useSearchParams()` needs Suspense**: Always wrap components using `useSearchParams()` in a `<Suspense>` boundary — required for production builds
- **Never remove `tw-animate-css`**: Required by shadcn/ui components for animations. Check shadcn dependencies before removing any package
- **No `pnpm` prefix inside package.json scripts**: The package manager is already the script runner. Use bare commands (e.g., `next build`, not `pnpm next build`)
- **Page components**: Colocate client components with pages (e.g., `GalleryClient.tsx` alongside `page.tsx`)
- **Server utilities**: `src/lib/server-utils.ts` uses `import 'server-only'` to enforce server-only code
- **Dev tools**: `next-devtools-mcp` and `chrome-devtools-mcp` are fetched on demand via `pnpm dlx` (see `.mcp.json`) — not installed as deps

## Updating shadcn

Preset: `base-vega` + `neutral` (see `components.json`). Update command: `pnpm ui:update`. **Never use `shadcn apply`** — see Gotchas.

This project's `button.tsx` and `popover.tsx` are heavily customized (sizing, colors, popup styling). Running `pnpm ui:update` will overwrite them with vanilla shadcn output and lose the customizations. If you need to sync upstream changes, prefer manual edits over a blind regenerate, or back up the customized files first.

### Workflow

1. Ensure clean working tree: `git status`
2. Run `pnpm ui:update`
3. **Check for silently stripped components**: if the shadcn output says "Skipped N files (might be identical)" for more components than seems right, your `globals.css` is probably missing a new theme token. Proceed to step 4. Otherwise skip to 6
4. Generate a reference project in a sandbox path:
   ```
   pnpm dlx shadcn@latest init --template next --base base --preset vega --name fresh --yes --cwd "C:/Users/Tommy/Developer/shadcn-fresh-ref"
   ```
   Diff `shadcn-fresh-ref/fresh/app/globals.css` against `src/app/globals.css`. Look for new `--*` tokens in `@theme inline {}` and any chart/color palette changes
5. Add missing tokens to `src/app/globals.css` manually, then re-run `pnpm ui:update`. Repeat until the skipped count stabilizes. Clean up the sandbox dir after: `rm -rf "C:/Users/Tommy/Developer/shadcn-fresh-ref"`
6. `git diff` the full changeset, commit

### Gotchas

- **`add --all` scope**: `shadcn add --all --overwrite --yes` iterates through components already installed in `src/components/ui/` and re-renders each from the registry. It does NOT install brand-new components from the registry — for those, use `shadcn add <name>` explicitly. Base-incompatible components (see `form` below) are silently excluded.
- **`add` is config-aware**: If a newer component references a CSS variable missing from `globals.css`, shadcn silently strips the class from the rendered output and skips the file as "identical". Add missing tokens to `globals.css` first.
- **Misleading skip hint**: `"use --overwrite to overwrite"` is printed even when `--overwrite` is already passed. It means "rendered output matches disk", not "you forgot a flag".
- **`form` is Radix-only**: The shadcn `form` component depends on `@radix-ui/react-slot` for the `asChild` pattern and has no Base UI variant. For form composition, use `react-hook-form` directly without the shadcn wrapper, or check [basecn.dev](https://basecn.dev) for Base UI ports.
- **Don't use `shadcn apply`**: It writes files outside `src/components/ui/` (`layout.tsx`, `globals.css`, `lib/utils.ts`, `package.json`) with its own template style, and has a broken dedupe that inserts duplicate imports when quote styles differ.
- **Preset name mismatch**: `components.json` stores the style as `"base-vega"` (with prefix), but the CLI `init`/`apply` accepts only `vega` (no prefix) with an explicit `--base base` flag.
