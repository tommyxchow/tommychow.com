# Lab

The Lab is the public creative-coding area at `/lab`. It contains original components, full mock pages, interactive art, games, shadcn explorations, and other web experiments.

## Ideas and variations

Each idea owns one or more concrete variations:

```text
entries/<idea>/
  lab.json
  shared/                              # optional, deliberate idea-local reuse
  variations/<variation>/
    entry.tsx
    variation.json
    ...colocated components/assets
```

- `lab.json` contains an idea `title` and optional public `description`.
- `variation.json` contains a variation `title`, a canonical UTC ISO `createdAt` timestamp, and optional public `notes`.
- Every idea must have at least one variation. The normal lazy workflow is one `first-pass` variation that becomes the final piece.
- Use `pnpm lab:new <idea> [initial-variation]` to create a new idea and its first blank variation.
- Use `pnpm lab:variation <idea> <new-variation> [source-variation]` to copy a variation. Without a source slug, the newest variation is copied.
- Variations stay independent by default. Add an idea-local `shared/` folder only when deliberate reuse is more valuable than keeping iterations isolated.

Variations are public at `/lab/<idea>/<variation>`. `/lab/<idea>` redirects to that idea's newest variation, and `/lab` redirects directly to the newest variation of the most recently varied idea. Ideas sort by newest variation, newest first; variations display oldest first. The toolbar lists ideas as horizontal chips: the label opens the idea (and shows the active variation title when one is selected), and a chevron opens that idea's variations when there are two or more. Hover a variation in the menu for its readable created timestamp plus optional notes. The idea description supplies SEO and Open Graph copy.

`entry.tsx` default-exports a no-props React component. It may be a Server Component or declare `'use client'` when it needs interaction or browser APIs.

## Styling and lifecycle

Original custom styling and shared shadcn components are equally valid. Custom entries may use Tailwind, CSS Modules, scoped CSS variables, inline styles, canvas/WebGL, and colocated assets. Import shared UI from `@/components/ui` only when the experiment wants it; add missing shadcn components through `pnpm ui:add <component>` after confirming the dependency impact.

Entries share the app document, Tailwind reset, providers, fonts, and light/dark theme. The toolbar occupies a reserved top row, and the entry fills the rest of the viewport; use `min-h-full` rather than `min-h-svh` for a full-canvas entry. Do not mutate `html`/`body`, import entry-specific global CSS, or cover the Lab toolbar with fixed positioning.

Cache Components uses React Activity to preserve up to three recently visited routes by hiding them instead of unmounting them. Continuous canvas/WebGL loops, timers, audio/video, subscriptions, and global or style side effects must clean up when their route becomes hidden, not only when it is destroyed. Keep keyboard focus visible, respect reduced motion, and check both light and dark themes unless the concept documents a single-theme constraint.

## Testing

Tests are optional for individual experiments. Do not create placeholder tests for every entry. When an experiment develops reusable behavior that may ship elsewhere, colocate focused `*.test.ts` or `*.test.tsx` files in its variation folder. Add a component test runner only when the first real variation needs one, and confirm the dependency choice first.

`pnpm test:lab-infra` covers the Lab scaffolder, metadata validation, nested manifest ordering, route generation, and stale-route cleanup. Run it when changing Lab infrastructure. `pnpm check` runs it together with `pnpm lab:check`, typechecking, linting, formatting, and the production build.

## Generated files

`pnpm lab:sync`, `predev`, and `prebuild` generate `generated-manifest.ts` plus literal routes under `src/app/lab/**/(generated)/`. Never edit those outputs directly. If `pnpm lab:check` reports drift, update the source idea or variation and rerun `pnpm lab:sync`.
