# Copilot instructions for tommychow.com

Project context: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + MDX, deployed on Vercel. Package manager: pnpm.

## Build & dev

- Dev: `pnpm dev`
- Build: `pnpm build`; Start: `pnpm start`
- Lint/format: `pnpm lint`, `pnpm format`
- Cleanup: `pnpm clean` (/.next + node_modules), `pnpm nuke` (also pnpm-lock.yaml)

## Structure & routing (App Router)

- Pages/layout: `src/app/**` (server components by default)
  - Home: `src/app/page.tsx` (loads blog fronts + gallery previews + projects)
  - Blog index: `src/app/blog/page.tsx`
  - Blog post: `src/app/blog/[id]/page.tsx`
  - Gallery index/entry: `src/app/gallery/page.tsx` re-exports `src/app/gallery/[id]/page.tsx`
  - Projects: `src/app/projects/page.tsx`, data in `src/app/projects/projects.ts`
- Reusable UI: `src/components/**` (e.g., Header, Prose, CustomImage, Section)
- Server helpers: `src/lib/server-utils.ts` (server-only), shared utils in `src/lib/**`
- Static assets: `public/**` (gallery images in `public/gallery/images`)

## Content & data flows

- MDX setup: `next.config.ts` adds pageExtensions md/mdx; remark-frontmatter + @code-hike/mdx. MDX component mapping in `src/mdx-components.tsx`:
  - Links render with HoverUnderline and `target="_blank"`
  - `<CustomImage />` available in MDX with canZoom enabled by default
- Blog posts live at `src/app/blog/_posts/<slug>/page.mdx` with frontmatter:
  - title, summary, date (ISO or parsable string). Types in server-utils
  - List data via `getAllBlogPostsFrontmatter()` (reads folders, parses frontmatter, sorts by date desc). UI uses BlogPostCard
  - Post route uses `generateStaticParams()` and `dynamic(() => import('../_posts/${id}/page.mdx'))`. `generateMetadata` sets title/OG
  - **Next 15 route params pattern**: components accept `props.params` as `Promise<{ id: string }>`; await before use
- Gallery pipeline (`public/gallery/images/*.JPEG`):
  - `getSortedImagesByDate()` (server-utils) reads EXIF with exifr, creates blur placeholders with sharp + thumbhash (`rgbaToDataURL`), sorts by DateTimeOriginal desc
  - `src/app/gallery/[id]/page.tsx` keeps a module-level `allImages = await getSortedImagesByDate()`; `generateStaticParams` returns `{ id: file }` for each image; main image uses CustomImage with blurDataURL; thumbnail grid uses Link with `scroll={false}` and `replace`
- Projects: `src/app/projects/projects.ts` exports typed array with imported static thumbnails; UI is ProjectCard

## UI & styling conventions

- Tailwind v4 with @tailwindcss/typography; global styles in `src/app/globals.css`
- Use Prose component for article/MDX content (typography classes preset)
- Theme: next-themes (Providers), dark variant via custom classes; Header shows per-route title and back button
- Class utilities: prefer tailwind-merge (`twMerge`/`twJoin`) to compose classes
- Images: use CustomImage (extends next/image). For string src, placeholder defaults to 'empty'; pass blurDataURL when available. canZoom enables react-medium-image-zoom
- **Font setup**: UncutSans (local variable font) + JetBrains Mono (Google Fonts) with CSS variables

## Code quality & TypeScript

- Strict TS (`tsconfig.json`), path alias `@/*`
- ESLint v9 + next/core-web-vitals + jsx-a11y; notable rules: `consistent-type-imports` (inline), `eqeqeq` 'smart', `no-console` except warn/error
- Keep server-only code in `src/lib/server-utils.ts` (annotated with `import 'server-only'`). Do not import into client components
- **Client components**: Mark `'use client'` only when using hooks (e.g., Header for usePathname)

## Patterns to follow (examples in repo)

- **New blog post**: create `src/app/blog/_posts/<slug>/page.mdx` with title/summary/date; it will auto-appear via `getAllBlogPostsFrontmatter()`
- **New gallery image**: add file to `public/gallery/images`; pages pre-render via `generateStaticParams`; EXIF and blur placeholders computed at build/runtime
- **New page**: prefer server component; add route under `src/app`; set Metadata (see `src/app/layout.tsx` and blog post route)
- **Dynamic imports**: Use for MDX content with `dynamic(() => import(...))`
- **Static params**: Use `export const dynamicParams = false` for static generation

## Integrations

- Vercel: @vercel/analytics and @vercel/speed-insights wired in root layout
- Code highlighting: @code-hike/mdx with GitHub theme, line numbers, copy button

## Notes for agents

- Use pnpm. Respect file layout and existing utilities. When in doubt, mirror patterns from Blog/Gallery/Projects
- **Critical**: Async route params in Next 15 - always `await props.params` before use
