import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['exifr'],
  typedRoutes: true,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
