# Copilot Instructions for tommychow.com

Personal portfolio site built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

## Architecture

- **App Router** with React Server Components by default; use `'use client'` only when needed
- **Path alias**: `@/*` maps to `./src/*` (e.g., `import { cn } from '@/lib/utils'`)
- **Server utilities**: [src/lib/server-utils.ts](src/lib/server-utils.ts) uses `import 'server-only'` to enforce server-only code
- **Gallery system**: Images in `public/gallery/images/` are processed at build time using `sharp` for metadata and `thumbhash` for blur placeholders

## Key Patterns

### Component Organization

- **UI primitives**: `src/components/ui/` — shadcn/ui components (radix-vega style)
- **App components**: `src/components/` — custom components like `CustomImage`, `Header`, `Providers`
- **Page components**: Colocate client components with pages (e.g., `GalleryClient.tsx` alongside `page.tsx`)

### Styling

- Use `cn()` from `@/lib/utils` for conditional classes (combines `clsx` + `tailwind-merge`)
- Use `twJoin`/`twMerge` from `tailwind-merge` for simpler cases
- Colors via CSS custom properties: `--foreground`, `--background`, `--muted-foreground`, etc.
- Tailwind v4 syntax: `@theme`, `@plugin`, `@custom-variant` in [globals.css](src/app/globals.css)

### TypeScript

- Strict mode enabled; use inline type imports: `import { type Foo } from 'bar'`
- Prefer explicit `interface` over `type` for component props
- Define prop interfaces directly above component: `interface FooProps { ... }`

### Animations

- Use `motion` package (Framer Motion): `import { motion } from 'motion/react'`
- Imperative animations: `import { animate } from 'motion'`

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check (tsc --noEmit)
pnpm format       # Prettier format
```

## Adding New Features

### New shadcn/ui component

```bash
pnpm dlx shadcn@latest add <component-name>
```

Components install to `src/components/ui/` with aliases configured in [components.json](components.json).

### New page

Create `src/app/<route>/page.tsx` as a Server Component. For interactive features, extract to a colocated `*Client.tsx` file with `'use client'` directive.

### New images

Drop images into `public/gallery/images/`. The build process extracts EXIF data and generates thumbhash placeholders automatically via `getSortedImagesByDate()`.

## Code Style

- Single quotes, no semicolons (Prettier configured)
- Prettier auto-organizes imports and sorts Tailwind classes
- Prefer `lucide-react` for icons; `react-icons` for brand icons (e.g., `SiGithub`)
- Use `next/image` via `CustomImage` wrapper for consistent styling and optional zoom
