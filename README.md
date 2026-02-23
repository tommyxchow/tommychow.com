# [tommychow.com](https://www.tommychow.com/)

Personal portfolio site for Tommy Chow, built on top of `next-template` with gallery tooling and Cloudflare Workers deployment.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, React Compiler, Typed Routes)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [motion](https://motion.dev/)
- [nuqs](https://nuqs.47ng.com/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)

## Setup

1. `pnpm install`
2. Create `.env.local` for server-only keys if needed
3. Optionally create `.dev.vars` for local Cloudflare bindings
4. `pnpm dev`

## Scripts

| Command           | Description                                              |
| :---------------- | :------------------------------------------------------- |
| `pnpm dev`        | Start development server                                 |
| `pnpm gallery`    | Regenerate gallery manifest from `public/gallery/images` |
| `pnpm build`      | Production build (auto-runs `pnpm gallery`)              |
| `pnpm start`      | Start production server (Node.js)                        |
| `pnpm preview`    | Build and preview on local Cloudflare Workers            |
| `pnpm deploy`     | Build and deploy to Cloudflare Workers                   |
| `pnpm upload`     | Build and upload to Cloudflare Workers                   |
| `pnpm cf-typegen` | Generate Cloudflare binding types                        |
| `pnpm lint`       | Run ESLint                                               |
| `pnpm typecheck`  | TypeScript type checking                                 |
| `pnpm check`      | Full check: typecheck + lint + build                     |
| `pnpm format`     | Format with Prettier                                     |
| `pnpm ui:update`  | Regenerate shadcn components to latest                   |
| `pnpm clean`      | Remove `.next`, `.open-next`, `node_modules`             |
| `pnpm nuke`       | Clean + remove `pnpm-lock.yaml`                          |

## Deployment

### Cloudflare dashboard

1. Create a Worker project in Cloudflare Workers & Pages
2. Connect this GitHub repository
3. Configure commands:

| Field          | Value                                    |
| :------------- | :--------------------------------------- |
| Build command  | `pnpm exec opennextjs-cloudflare build`  |
| Deploy command | `pnpm exec opennextjs-cloudflare deploy` |

### CLI

```sh
pnpm exec wrangler login
pnpm deploy
```

## Notes

- Gallery images live in `public/gallery/images/` and produce `src/lib/gallery-manifest.json`
- Static caching rules are configured in `public/_headers`
- Set `SITE_URL` in production for correct metadata, `robots.txt`, and `sitemap.xml`
