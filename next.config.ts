import type { NextConfig } from 'next'

if (process.env.NODE_ENV === 'development') {
  void import('@opennextjs/cloudflare').then(
    ({ initOpenNextCloudflareForDev }) => initOpenNextCloudflareForDev(),
  )
}

const nextConfig: NextConfig = {
  // TODO: remove unoptimized once free transformation quota resets (check dashboard → Images → Transformations)
  images: {
    unoptimized: true,
    deviceSizes: [640, 828, 1200, 1920, 3840],
    imageSizes: [128, 256, 384],
  },
  typedRoutes: true,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
