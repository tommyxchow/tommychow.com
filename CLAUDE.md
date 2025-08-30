# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint with Next.js and TypeScript configurations
- `pnpm format` - Format code with Prettier (organizes imports and Tailwind classes)
- `pnpm clean` - Remove .next and node_modules directories
- `pnpm nuke` - Remove .next, node_modules, and pnpm-lock.yaml

## Architecture Overview

This is a personal portfolio website built with Next.js 15 and React 19 using the App Router.

### Key Technologies

- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Content**: MDX for blog posts with frontmatter, Code Hike for syntax highlighting
- **Images**: Sharp for optimization, thumbhash for blur placeholders, EXIF data extraction
- **Package Manager**: pnpm with workspace configuration

### Project Structure

- `src/app/` - App Router pages and layouts
  - `blog/` - Blog posts as MDX files in `_posts/` subdirectories
  - `gallery/` - Photo gallery with EXIF data and dynamic routing
  - `projects/` - Static project showcase
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and server-side helpers
- `public/gallery/images/` - Gallery photos (JPEG format)

### Content Management

- Blog posts are MDX files in `src/app/blog/_posts/[slug]/page.mdx`
- Each blog post has frontmatter with title, summary, and date
- Gallery images are processed server-side to extract EXIF data and generate thumbhash placeholders
- Projects are defined in `src/app/projects/projects.ts`
- MDX components are customized in `src/mdx-components.tsx` (links open in new tabs, custom image component)

### Styling Conventions

- Uses Tailwind CSS with custom CSS variables for responsive breakpoints
- Dark mode support via next-themes
- Custom fonts: UncutSans (local) and JetBrains Mono (Google Fonts)
- Consistent spacing with 16-unit gaps between sections

### Code Quality

- ESLint v9 with TypeScript, Next.js, and accessibility rules
- Prettier with import organization and Tailwind class sorting
- Strict TypeScript configuration with consistent-type-imports
- No testing framework configured
