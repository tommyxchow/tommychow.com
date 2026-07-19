# Lab

The Lab is the public creative-coding area at `/lab`. Entries may be original components, full mock pages, interactive art, games, shadcn explorations, or any other web experiment.

## Add an entry

1. Run `pnpm lab:new <kebab-case-slug>`.
2. Build the experiment in `entries/<slug>/entry.tsx`; colocate supporting components, CSS Modules, and assets in the same folder.
3. Edit `entries/<slug>/lab.json` when the generated title or date needs adjustment, or add an optional public `description`.
4. Run `pnpm lab:check`, `pnpm typecheck`, and `pnpm lint`.

`entry.tsx` default-exports a no-props React component. It may be a Server Component or declare `'use client'` when it needs interaction or browser APIs. `/lab` redirects to the newest entry, whose route is `/lab/<slug>`.

## Styling

- Original custom styling and shared shadcn components are equally valid. Do not force one visual system onto the other.
- Custom entries may use Tailwind, CSS Modules, scoped CSS variables, inline styles, canvas/WebGL, and colocated assets.
- Import shared UI from `@/components/ui` only when the experiment wants it. Add missing shadcn components through `pnpm ui:add <component>` after confirming the dependency impact.
- Entries share the app document, Tailwind reset, providers, fonts, and light/dark theme. The toolbar occupies a reserved top row, and the entry fills the rest of the viewport; use `min-h-full` rather than `min-h-svh` for a full-canvas entry. Do not mutate `html`/`body`, import entry-specific global CSS, or cover the Lab toolbar with fixed positioning.
- Keep keyboard focus visible, respect reduced motion, and check both light and dark themes unless the concept intentionally documents a single-theme constraint.

## Testing

Tests are optional for individual experiments. Do not create placeholder tests for every entry. When an experiment develops reusable behavior that may ship elsewhere, colocate focused `*.test.ts` or `*.test.tsx` files in its entry folder. Add a component test runner only when the first real entry needs one, and confirm the dependency choice first.

`pnpm test:lab-infra` covers the Lab scaffolder, metadata validation, manifest ordering, and generated-route cleanup. Run it when changing Lab infrastructure; the full `pnpm check` command runs it automatically.

## Generated files

`pnpm lab:sync`, `predev`, and `prebuild` generate `generated-manifest.ts` plus literal routes under `src/app/lab/**/(generated)/`. Never edit those outputs directly. If `pnpm lab:check` reports drift, update the source entry and rerun `pnpm lab:sync`.

Do not install a new dependency for an experiment without asking first. Prefer the web platform and existing dependencies when they fit, but do not distort an idea solely to avoid a justified dependency request.
