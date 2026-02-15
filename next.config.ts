import type { NextConfig } from 'next'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

void initOpenNextCloudflareForDev()

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  typedRoutes: true,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
