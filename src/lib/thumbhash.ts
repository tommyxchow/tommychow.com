import { thumbHashToDataURL } from 'thumbhash'

const placeholderCache = new Map<string, string>()

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function thumbHashToPlaceholder(base64: string): string {
  const cached = placeholderCache.get(base64)
  if (cached) return cached

  const dataUrl = thumbHashToDataURL(base64ToBytes(base64))
  placeholderCache.set(base64, dataUrl)
  return dataUrl
}
