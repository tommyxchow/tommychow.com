import type { NextConfig } from 'next'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

void initOpenNextCloudflareForDev()

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
