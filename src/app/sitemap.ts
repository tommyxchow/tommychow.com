import { BASE_URL } from '@/lib/constants'
import { type MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
}
