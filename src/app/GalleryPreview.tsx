'use client'

import { Button } from '@/components/ui/button'
import { MOTION_EASING } from '@/lib/constants'
import { buildSrcSet } from '@/lib/gallery-image'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const TRANSITION = { duration: 0.5, ease: MOTION_EASING } as const
const ACTIVE_HOVER_SCALE = 1.08

const HOVER_FILTER = {
  idle: 'brightness(1) saturate(1)',
  active: 'brightness(1.1) saturate(1)',
  dimmed: 'brightness(0.7) saturate(0.8)',
} satisfies Record<string, string>

function getHoverState(hoveredIndex: number | null, index: number) {
  if (hoveredIndex === null) return 'idle' as const
  return hoveredIndex === index ? ('active' as const) : ('dimmed' as const)
}

interface GalleryPreviewProps {
  images: {
    file: string
    thumbHashDataURL: string
    width: number
    height: number
    variants: number[]
  }[]
}

export function GalleryPreview({ images }: GalleryPreviewProps) {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(() => new Set())

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => {
      if (prev.has(index)) return prev
      return new Set(prev).add(index)
    })
  }, [])

  return (
    <div
      className='group/gallery flex flex-col gap-1'
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className='grid grid-cols-2 gap-1 [&>a:first-child]:rounded-tl-sm [&>a:nth-child(2)]:rounded-tr-sm [&>a:nth-child(3)]:rounded-bl-sm [&>a:last-child]:rounded-br-sm'>
        {images.map(
          ({ file, thumbHashDataURL, width, height, variants }, index) => {
            const state = getHoverState(hoveredIndex, index)
            const isLoaded = loadedImages.has(index)

            return (
              <Link
                key={file}
                href={`/gallery?image=${file}`}
                aria-label={`View ${file} in gallery`}
                className='relative aspect-3/4 overflow-hidden bg-cover bg-center focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none'
                style={{ backgroundImage: `url(${thumbHashDataURL})` }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <motion.div
                  className='absolute inset-0'
                  initial={false}
                  animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale:
                      prefersReducedMotion || state !== 'active'
                        ? 1
                        : ACTIVE_HOVER_SCALE,
                    filter: prefersReducedMotion
                      ? HOVER_FILTER.idle
                      : HOVER_FILTER[state],
                  }}
                  transition={TRANSITION}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static pre-generated variants, not served by next/image */}
                  <img
                    ref={(img) => {
                      if (img?.complete) handleImageLoad(index)
                    }}
                    srcSet={buildSrcSet(file, variants)}
                    sizes='(min-width: 768px) 222px, calc((100vw - 40px) / 2)'
                    width={width}
                    height={height}
                    alt=''
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding='async'
                    onLoad={() => handleImageLoad(index)}
                    className='absolute inset-0 size-full object-cover shadow-none'
                  />
                </motion.div>
              </Link>
            )
          },
        )}
      </div>

      <Button
        render={<Link href='/gallery' />}
        nativeButton={false}
        variant='ghost'
        className={twJoin(
          'w-full transition-opacity duration-300',
          'pointer-events-none opacity-0 group-hover/gallery:pointer-events-auto group-hover/gallery:opacity-100',
        )}
      >
        See all images
        <ArrowRight data-icon='inline-end' />
      </Button>
    </div>
  )
}
