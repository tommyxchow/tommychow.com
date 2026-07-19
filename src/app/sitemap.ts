import { labEntries } from '@/lab/generated-manifest'
import { BASE_URL } from '@/lib/constants'
import { type MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/gallery`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const labRoutes: MetadataRoute.Sitemap = labEntries.map((entry) => ({
    url: `${BASE_URL}${entry.href}`,
    lastModified: entry.createdAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...labRoutes]
}
