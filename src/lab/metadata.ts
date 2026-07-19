import { labIdeas } from '@/lab/generated-manifest'
import { BASE_URL } from '@/lib/constants'
import { type Metadata } from 'next'

const DEFAULT_DESCRIPTION = "An experiment from Tommy Chow's Lab."

export function createLabMetadata(
  ideaSlug: string,
  variationSlug: string,
): Metadata {
  const idea = labIdeas.find((candidate) => candidate.slug === ideaSlug)
  const variation = idea?.variations.find(
    (candidate) => candidate.slug === variationSlug,
  )
  if (idea === undefined || variation === undefined) {
    throw new Error(
      `Missing generated Lab metadata for "${ideaSlug}/${variationSlug}"`,
    )
  }

  const canonical = `${BASE_URL}${variation.href}`
  const pageTitle = `${variation.title} | ${idea.title} | Lab | Tommy Chow`
  const description = idea.description ?? DEFAULT_DESCRIPTION

  return {
    title: pageTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
    },
  }
}
