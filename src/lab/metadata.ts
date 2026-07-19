import { labEntries } from '@/lab/generated-manifest'
import { BASE_URL } from '@/lib/constants'
import { type Metadata } from 'next'

const DEFAULT_DESCRIPTION = "An experiment from Tommy Chow's Lab."

export function createLabMetadata(slug: string): Metadata {
  const entry = labEntries.find((candidate) => candidate.slug === slug)
  if (entry === undefined) {
    throw new Error(`Missing generated Lab metadata for "${slug}"`)
  }

  const canonical = `${BASE_URL}${entry.href}`

  return {
    title: `${entry.title} | Lab | Tommy Chow`,
    description: entry.description ?? DEFAULT_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: entry.title,
      description: entry.description ?? DEFAULT_DESCRIPTION,
      url: canonical,
    },
  }
}
