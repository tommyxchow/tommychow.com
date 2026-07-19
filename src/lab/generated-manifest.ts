import { type LabIdea } from './types'

export const labIdeas: readonly LabIdea[] = [
  {
    slug: 'badge',
    title: 'Badge',
    description:
      'Temporary badge demo so the toolbar can show more than one idea.',
    href: '/lab/badge/hard',
    variations: [
      {
        slug: 'soft',
        title: 'Soft',
        createdAt: '2026-07-19T07:44:58.465Z',
        notes: 'Muted pill using the secondary surface.',
        href: '/lab/badge/soft',
      },
      {
        slug: 'hard',
        title: 'Hard',
        createdAt: '2026-07-19T07:44:59.073Z',
        notes: 'High-contrast pill using the primary surface.',
        href: '/lab/badge/hard',
      },
    ],
  },
  {
    slug: 'button',
    title: 'Button',
    description: 'Temporary shadcn Button demo for Lab wiring.',
    href: '/lab/button/destructive',
    variations: [
      {
        slug: 'default',
        title: 'Default',
        createdAt: '2026-07-19T07:36:48.764Z',
        notes: 'Primary filled button.',
        href: '/lab/button/default',
      },
      {
        slug: 'outline',
        title: 'Outline',
        createdAt: '2026-07-19T07:36:49.355Z',
        notes: 'Bordered button for quieter actions.',
        href: '/lab/button/outline',
      },
      {
        slug: 'secondary',
        title: 'Secondary',
        createdAt: '2026-07-19T07:36:49.981Z',
        href: '/lab/button/secondary',
      },
      {
        slug: 'ghost',
        title: 'Ghost',
        createdAt: '2026-07-19T07:36:50.588Z',
        notes: 'Minimal button with no border until hover.',
        href: '/lab/button/ghost',
      },
      {
        slug: 'destructive',
        title: 'Destructive',
        createdAt: '2026-07-19T07:36:51.199Z',
        href: '/lab/button/destructive',
      },
    ],
  },
]
