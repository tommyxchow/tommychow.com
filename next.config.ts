import type { NextConfig } from 'next'

if (process.env.NODE_ENV === 'development') {
  void import('@opennextjs/cloudflare').then(
    ({ initOpenNextCloudflareForDev }) => initOpenNextCloudflareForDev(),
  )
}

const nextConfig: NextConfig = {
  // TODO: re-enable image optimization once Cloudflare free transformation quota resets
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
