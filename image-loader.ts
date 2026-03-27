import type { ImageLoaderProps } from 'next/image'

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  if (process.env.NODE_ENV === 'development') {
    return src
  }

  const params = [`width=${width}`, `quality=${quality ?? 75}`, 'format=auto']
  const normSrc = src.startsWith('/') ? src.slice(1) : src
  return `/cdn-cgi/image/${params.join(',')}/${normSrc}`
}
