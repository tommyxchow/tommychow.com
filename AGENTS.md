# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Project

Personal portfolio site for Tommy Chow. Dark mode only.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build (auto-runs gallery via prebuild)
pnpm build:worker # Build the Cloudflare Worker bundle (opennextjs-cloudflare build)
pnpm start        # Start production server (Node.js)
pnpm gallery      # Regenerate gallery manifest (run when images change)
pnpm preview      # Build and preview on local Cloudflare Workers
pnpm deploy       # Build and deploy to Cloudflare Workers
pnpm upload       # Build and upload to Cloudflare Workers (no deploy)
pnpm cf-typegen   # Generate CloudflareEnv types from wrangler.jsonc
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking (tsc --noEmit)
pnpm format       # Format with Prettier
pnpm format:check # Check formatting without writing
pnpm check        # Full check: typecheck + lint + format check + build
pnpm ui:add       # Add a shadcn component (pnpm ui:add <component>)
pnpm ui:update    # Refresh named shadcn components (pnpm ui:update <component...>)
pnpm clean        # Delete .next, .open-next, and node_modules
pnpm nuke         # Delete .next, .open-next, node_modules, and pnpm-lock.yaml
```

## Architecture

Next.js 16 App Router with React 19. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

**Runtime**: Node.js >= 24, pnpm 11 (managed via corepack and the `packageManager` field)

### Key Configuration

- **React Compiler**: Enabled for automatic memoization
- **Typed Routes**: Enabled for type-safe `href` props
- **Cache Components**: Enabled (`cacheComponents: true`) — everything is dynamic (SSR) by default; opt into caching with `"use cache"` + `cacheLife()`, and wrap async work in `<Suspense>` for PPR. See [docs](https://nextjs.org/docs/app/getting-started/cache-components).
- **Path Alias**: `@/*` maps to `./src/*`
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `erasableSyntaxOnly`

### Source Structure

- `src/app/` - App Router pages and layouts
- `src/components/` - React components (`ui/` subdirectory for shadcn — add with `pnpm ui:add <component>`)
  - Only the components actually in use live in `src/components/ui/` (currently `button.tsx`, `popover.tsx`, and `tooltip.tsx`). Add more as needed.
  - `<Button>` has no `asChild` prop (Base UI, not Radix).
- `src/lib/` - Utilities (`cn()` for className merging), constants, and server-only code
- `src/hooks/` - Custom React hooks

### Cloudflare Workers

- `wrangler.jsonc` - Cloudflare Workers configuration (bindings, R2, services, etc.)
- `open-next.config.ts` - OpenNext adapter config
- `cloudflare-env.d.ts` - Generated types for Cloudflare bindings (run `pnpm cf-typegen` to regenerate)

### Environment

- `SITE_URL` — Base URL for the site. Declared in `wrangler.jsonc`, defaults to `http://localhost:3000` for local dev. Used in `src/lib/constants.ts` for `metadataBase`, sitemap, and robots.txt.
- `src/env.d.ts` narrows `process.env.SITE_URL` to `string | undefined`. Without it, the auto-generated `cloudflare-env.d.ts` types it as a literal from `wrangler.jsonc`, which makes the `??` fallback look like dead code to TS even though it's needed in `pnpm dev`. Don't declare secrets in `wrangler.jsonc` (committed to git) — set production secrets via Cloudflare dashboard or `pnpm exec wrangler secret put`.

### Images

- **Static/known images** (the gallery): pre-generate webp variants at build time via `sharp` in `scripts/generate-gallery-manifest.ts` and use plain `<img srcset>`. Don't switch to `next/image` with the Cloudflare IMAGES binding for these — it bills per-call with no dedup and `/_next/image` responses aren't edge-cached without a Cache Rule.
- **Dynamic/user-uploaded images** (none today): would require uncommenting the IMAGES binding in `wrangler.jsonc` and configuring a Cache Rule for `/_next/image*` in the Cloudflare dashboard (Caching → Cache Rules → Edge TTL override 1 year). Without it, every cache miss re-bills.

### Gallery System

Images in `public/gallery/images/` are processed by `pnpm gallery` into `src/lib/gallery-manifest.json` using `sharp` and `thumbhash`. The manifest is committed to git and re-exported by `src/lib/server-utils.ts`.

### Key Libraries

- **nuqs** — Type-safe URL search params (`useQueryState`, `useQueryStates`)
- **motion** — Animation library (Framer Motion v12+). Import from `motion/react` (e.g., `import { motion, useMotionValue } from 'motion/react'`), not `framer-motion`
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
- **Dev tools**: `next-devtools-mcp` and `chrome-devtools-mcp` are fetched on demand via `pnpm dlx` (see `.mcp.json` for Claude Code, `.cursor/mcp.json` for Cursor) — not installed as deps
- **pnpm 11 config lives in `pnpm-workspace.yaml`** (`.npmrc` is auth/registry only). pnpm 11 defaults `minimumReleaseAge` to 24h for supply-chain protection — keep that default; wait a day after a fresh publish before bumping, or add a targeted `minimumReleaseAgeExclude` entry if you truly need same-day. The version is pinned in `packageManager` (`package.json`); if `pnpm -v` differs, a standalone install is shadowing corepack's shim.

## shadcn

Style `base-nova` / `neutral` / `default-translucent` menus (see `components.json`). Components install lazily — only the ones in use live in `src/components/ui/` (currently `button.tsx`, `popover.tsx`, and `tooltip.tsx`). Inspect with `pnpm exec shadcn info` (project config + CSS vars); pull a component's docs into context with `pnpm exec shadcn docs <name>`.

> [!NOTE]
> `pnpm ui:add` / `pnpm ui:update` run the locally-pinned `shadcn` (a devDependency), **not** `pnpm dlx shadcn@latest`. To pick up newer shadcn releases, bump `shadcn` in `package.json` first, then `pnpm install`.

`button.tsx` and `popover.tsx` track **vanilla** shadcn output (no local overrides), so `pnpm ui:update button popover` regenerates them safely. `tooltip.tsx` has one local override: optional `showArrow` on `TooltipContent` (used by social link labels). Prefer a manual merge over a blind regenerate on customized components so the customization isn't silently lost.

The theme in `src/app/globals.css` is the stock `base-nova`/`neutral` palette and radius scale. The only intentional deltas from a fresh scaffold are: local fonts (`UncutSans`/`Lilex`) wired through `--font-sans`/`--font-mono`, the `--font-sans--font-feature-settings` stylistic sets, `@plugin '@tailwindcss/typography'` (used by `Prose`), `color-scheme: dark` (the site is dark-only), and `html { @apply bg-background }` (solid base for in-app webview compositing). Keep those when regenerating; everything else should match upstream.

### Workflow

1. Ensure clean working tree: `git status`
2. Add components on demand with `pnpm ui:add <component>`
3. Refresh existing components explicitly with `pnpm ui:update <component...>`
4. **Check for silently stripped components**: if the shadcn output says "Skipped N files (might be identical)" for more components than seems right, your `globals.css` is probably missing a new theme token. Check `shadcn info` for CSS vars, then diff against a fresh reference (`pnpm dlx shadcn@latest init --template next --base base --preset nova ...` — the CLI wants the bare preset name `nova` + `--base base`, not the combined `base-nova` from `components.json`), add missing tokens, re-run.
5. `git diff` the full changeset, commit

### Gotchas

- **`add --all` scope**: `shadcn add --all` installs **every** registry component. Don't use it for this lazy setup — add or refresh named components explicitly.
- **`add` is config-aware**: If a newer component references a CSS variable missing from `globals.css`, shadcn silently strips the class from the rendered output and skips the file as "identical". Add missing tokens to `globals.css` first (workflow step 4).
- **Misleading skip hint**: `"use --overwrite to overwrite"` is printed even when `--overwrite` is already passed (`ui:update` passes it). It means "rendered output matches disk", not "you forgot a flag".
- **`form` is Radix-only**: The shadcn `form` component depends on `@radix-ui/react-slot` for the `asChild` pattern and has no Base UI variant. For form composition, use `react-hook-form` directly without the shadcn wrapper, or check [basecn.dev](https://basecn.dev) for Base UI ports.
- **Don't use `shadcn apply`**: It writes files outside `src/components/ui/` (`layout.tsx`, `globals.css`, `lib/utils.ts`, `package.json`) with its own template style, and has a broken dedupe that inserts duplicate imports when quote styles differ.
- **Preset name mismatch**: `components.json` stores the style as `"base-nova"` (with prefix), but the CLI `init`/`apply` accepts only `nova` (no prefix) with an explicit `--base base` flag.

## Cursor Cloud specific instructions

Single service: the Next.js dev server (`pnpm dev`, http://localhost:3000). No database/backend/external service. Standard commands live in `## Commands` above. The update script keeps deps fresh (`nvm install 24` + `pnpm install`).

- **Node version / PATH gotcha**: the repo requires `node >=24` with `engineStrict: true`, so any `pnpm`/`next` command run under Node 22 fails with `ERR_PNPM_UNSUPPORTED_ENGINE`. The VM ships a `/exec-daemon/node` (v22) pinned at the **front** of `PATH` that `nvm use 24` cannot displace. **Login shells** (`bash -lc '...'`) get Node 24 because `~/.bashrc` explicitly prepends the nvm v24 bin; **non-login** shells (`bash -c`, `sh -c`, many tool runners) silently fall back to v22. Run dev/build/lint/test via a login shell, e.g. `bash -lc 'pnpm dev'`, or first prepend `"$(ls -d "$HOME"/.nvm/versions/node/v24.*/bin | sort -V | tail -1)"` to `PATH`.
- **`/gallery` is lightbox-first**: there's no grid landing page — the route opens directly into the full-screen photo viewer (arrow keys navigate, a grid/thumbnail toggle is at the bottom). This is intentional, not a rendering bug.
- **`pnpm build` regenerates the gallery manifest** via the `prebuild` hook (`pnpm gallery` → `src/lib/gallery-manifest.json`); the manifest is committed, so expect a git diff only when `public/gallery/images/` actually changed.
