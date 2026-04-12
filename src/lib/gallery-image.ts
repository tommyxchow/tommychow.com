const OPTIMIZED_BASE = '/gallery/optimized'

function stripExt(file: string): string {
  return file.replace(/\.[^.]+$/, '')
}

export function buildSrcSet(file: string, variants: number[]): string {
  const basename = stripExt(file)
  return variants
    .map((w) => `${OPTIMIZED_BASE}/${basename}-${w}.webp ${w}w`)
    .join(', ')
}

export function largestVariantSrc(file: string, variants: number[]): string {
  const basename = stripExt(file)
  const largest = variants.at(-1) ?? variants[0]
  return `${OPTIMIZED_BASE}/${basename}-${largest}.webp`
}
