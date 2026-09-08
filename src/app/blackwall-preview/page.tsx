import { notFound } from 'next/navigation'

export default function BlackwallPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  return null
}
