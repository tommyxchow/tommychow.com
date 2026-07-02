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

**Runtime**: Node.js >= 22, pnpm 11 (managed via corepack and the `packageManager` field)

### Key Configuration

- **React Compiler**: Enabled for automatic memoization
- **Typed Routes**: Enabled for type-safe `href` props
- **Cache Components**: Enabled — see Caching below
- **Path Alias**: `@/*` maps to `./src/*`
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `verbatimModuleSyntax`, `exactOptionalPropertyTypes`, `erasableSyntaxOnly`

### Caching (Cache Components)

Enabled via `cacheComponents: true`. Everything is dynamic (SSR) by default — opt into caching with `"use cache"` + `cacheLife()`, and wrap async work in `<Suspense>` for PPR. Invalidate with `cacheTag()` + `revalidateTag()`/`updateTag()` (`updateTag` only works inside Server Actions). The old `revalidate`/`dynamic`/`fetchCache` route exports are build-breaking once `cacheComponents` is on — remove them rather than leaving them in place. On Cloudflare, durable cache needs the R2 binding (commented in `wrangler.jsonc` / `open-next.config.ts`); time-based and on-demand revalidation also need OpenNext's DO queue + tag cache.

`cacheComponents` also enables React `<Activity>` for route-level UI state: navigating away and back no longer unmounts the previous route, so `useState`, form inputs, and scroll position persist. Dropdowns/dialogs/forms that should reset on return need explicit reset logic.

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
- **motion** — Animation library (Framer Motion v12+). Import from `motion/react`, not `framer-motion` — see the Animation section for when to reach for it
- **lucide-react** — Icons; `react-icons/fa6` for brand icons (`FaGithub`, `FaLinkedin`)

## Code Style

Enforced by `pnpm lint` (ESLint) and `pnpm format` (Prettier). Project-specific conventions beyond the global code style:

- Inline type imports (`import { type Foo }`) — enforced by `consistent-type-imports` with `fixStyle: 'inline-type-imports'`
- Prefix unused variables with `_` — `no-unused-vars` whitelists the `^_` pattern
- Prettier auto-sorts imports and Tailwind classes — don't sort manually
- Use `interface` for component props, colocated directly above the component (`interface FooProps { ... }`)

## Gotchas

- **Dark mode only**: App uses a dark-first design — don't introduce light-mode specific assumptions
- **shadcn uses @base-ui/react**: Not Radix UI — imports differ from older shadcn examples, and most components don't expose `asChild`
- **`useSearchParams()` needs Suspense**: Always wrap components using `useSearchParams()` in a `<Suspense>` boundary — required for production builds
- **Never remove `tw-animate-css`**: Required by shadcn/ui components for animations. Check shadcn dependencies before removing any package
- **No `pnpm` prefix inside package.json scripts**: The package manager is already the script runner. Use bare commands (e.g., `next build`, not `pnpm next build`)
- **Page components**: Colocate client components with pages (e.g., `GalleryClient.tsx` alongside `page.tsx`)
- **Server utilities**: `src/lib/server-utils.ts` uses `import 'server-only'` to enforce server-only code
- **Dev tools**: `next-devtools-mcp` and `chrome-devtools-mcp` are fetched on demand via `pnpm dlx` (see `.mcp.json` for Claude Code, `.cursor/mcp.json` for Cursor) — not installed as deps
- **pnpm 11 config lives in `pnpm-workspace.yaml`** (`.npmrc` is auth/registry only). `allowBuilds` replaces the old `onlyBuiltDependencies`/`neverBuiltDependencies`/`ignoredBuiltDependencies` keys; env vars are `pnpm_config_*` not `npm_config_*`. pnpm 11 defaults `minimumReleaseAge` to 24h for supply-chain protection — keep that default; wait a day after a fresh publish before bumping, or add a targeted `minimumReleaseAgeExclude` entry if you truly need same-day. The version is pinned in `packageManager` (`package.json`); if `pnpm -v` differs, a standalone install is shadowing corepack's shim.

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
4. **Check for silently stripped components**: if the shadcn output says "Skipped N files (might be identical)" for more components than seems right, your `globals.css` is probably missing a new theme token. Check `shadcn info` for CSS vars, then regenerate a fresh reference via `shadcn init` in a scratch dir (check the current CLI flags first — see the preset name mismatch gotcha below), diff `globals.css` against it, add missing tokens, re-run.
5. `git diff` the full changeset, commit

### Gotchas

- **`add --all` scope**: `shadcn add --all` installs **every** registry component. Don't use it for this lazy setup — add or refresh named components explicitly.
- **`add` is config-aware**: If a newer component references a CSS variable missing from `globals.css`, shadcn silently strips the class from the rendered output and skips the file as "identical". Add missing tokens to `globals.css` first (workflow step 4).
- **Misleading skip hint**: `"use --overwrite to overwrite"` is printed even when `--overwrite` is already passed (`ui:update` passes it). It means "rendered output matches disk", not "you forgot a flag".
- **`form` has no Base UI port**: `shadcn add form` fails silently (it hard-depends on Radix). shadcn deprecated the `<Form>` wrapper for `<Field>` (`shadcn add field` has a Base UI port), but `Field` has no `FormField`-style auto-binding — wire each field yourself with `react-hook-form`'s `Controller` render prop (`field` spread onto the input, `fieldState.invalid`/`fieldState.error` into `Field`/`FieldError`) per `ui.shadcn.com/docs/forms/react-hook-form`.
- **Don't use `shadcn apply`**: It writes files outside `src/components/ui/` (`layout.tsx`, `globals.css`, `lib/utils.ts`, `package.json`) with its own template style, and has a broken dedupe that inserts duplicate imports when quote styles differ.
- **Preset name mismatch**: `components.json` stores the style as `"base-nova"` (with prefix), but the CLI `init`/`apply` accepts only `nova` (no prefix) with an explicit `--base base` flag.

## React

- React Compiler is on — let it handle memoization instead of reaching for `useMemo`/`useCallback`/`memo` by default. They're still legitimate escape hatches for effect-dependency stability or refs handed to non-compiled third-party code.
- Avoid `useEffect` unless syncing with an external system (React's "You Might Not Need an Effect") — otherwise compute during render or in event handlers. Avoid `useRef` unless you need DOM access, imperative work, or a mutable value that shouldn't trigger a re-render.

## Styling

- Use `cn()` from `@/lib/utils` for conditional/merged class lists (combines `clsx` + `tailwind-merge`), not string concatenation; use `twJoin` from `tailwind-merge` when you just need to concatenate static strings without merging conflicts.
- Style from the theme tokens in `globals.css` (`bg-background`, `text-foreground`, `text-muted-foreground`), not scattered raw palette. Arbitrary values (`w-[37px]`) are an escape hatch; extract a repeated class string into a component/variant rather than `@apply`.
- The default scale (`p-4`, `text-lg`, `gap-2`) is rem-based — lean on it. Use fixed px only for things meant to stay put on zoom (hairline borders/dividers `border`/`h-px`, decorative underlines `decoration-2`).
- Default to logical utilities (`ms`/`me`/`ps`/`pe`, logical `inset`) over physical (`ml`/`mr`) for RTL-readiness.
- Full-height layouts: `min-h-svh` over `min-h-screen`/`100vh` (which overflows under mobile browser chrome). Use `dvh` only to track the bar live (can jank); fixed `h-svh` only for app shells with internal scroll.
- For a component reused at different widths (or heights), prefer container queries (`@container`, `@sm:`/`@md:`, `@container-size` + `cqh`/`cqb` for height-aware) over viewport breakpoints.
- Translucent fill/border: a color/alpha utility (`bg-black/50`, `border-white/20`) or a solid token, not `opacity-*` (which fades children too). Keep `opacity-*` for fading a whole element/state.
- `tabular-nums` for numbers that update in place or align in columns (timers, counters, prices, tables).
- `text-balance` on headings, `text-pretty` on body copy (`pretty` not in Firefox yet — progressive enhancement).
- Tracking scales inversely with size: widen all-caps/eyebrow labels (`tracking-wider`/`tracking-widest`), tighten large display headings (`tracking-tight`/`tracking-tighter`), leave body alone.
- Don't hard-cut overflow: `truncate`/`line-clamp-*` for text, a fade (`mask-*` gradient)/shadow/peek edge for scrollable regions.
- Reserve space to avoid CLS: `aspect-*` (or `size-*`/`w-`/`h-`) on media, fixed skeleton dims, `scrollbar-gutter-stable` on scroll containers/modals.

## Animation

- Reach for native CSS / Web Animations first — Tailwind covers most of it (`transition`/`animate-*`, `starting:` + `transition-discrete`, view transitions, scroll-driven animations); `tw-animate-css` powers shadcn's. Pull in Motion (npm `motion`, import `motion/react`) only for orchestration, gesture/interrupt control, or shared-element/layout animations.
- Animate open/close to intrinsic height with the grid trick (`grid-rows-[0fr]` → `grid-rows-[1fr]`); transitioning to `h-auto` via `interpolate-size`/`calc-size()` is cleaner but Chromium-only (enhancement).
- Animate only compositor-friendly props — transform utilities (`translate-*`/`scale-*`/`rotate-*`) and `opacity-*`. Avoid transitioning layout utilities (`w-`/`h-`/`inset`/`m-`).
- Respect `prefers-reduced-motion` — gate non-essential motion behind `motion-safe:`; reduce/replace rather than strip.
- Keep keyboard focus visible: style `focus-visible:` with `ring-*`/`outline-*`; never strip it (`outline-hidden`, `ring-0`) without a clear replacement.
