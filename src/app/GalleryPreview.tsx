'use client'

import { MOTION_EASING } from '@/lib/constants'
import { buildSrcSet } from '@/lib/gallery-image'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRef, useState } from 'react'

const TRANSITION = { duration: 0.5, ease: MOTION_EASING } as const

const HOVER_SCALE = { idle: 1, active: 1.08, dimmed: 1.02 } satisfies Record<
  string,
  number
>

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [loadedCount, setLoadedCount] = useState(0)
  const allLoaded = loadedCount >= images.length
  const countedRef = useRef(new Set<number>())

  function handleImageLoaded(index: number) {
    if (countedRef.current.has(index)) return
    countedRef.current.add(index)
    setLoadedCount((prev) => prev + 1)
  }

  return (
    <div className='mt-8 grid grid-cols-3 gap-1 overflow-hidden rounded-sm'>
      {images.map(
        ({ file, thumbHashDataURL, width, height, variants }, index) => {
          const state = getHoverState(hoveredIndex, index)

          return (
            <Link
              key={file}
              href={`/gallery?image=${file}`}
              aria-label={`View ${file} in gallery`}
              className='relative aspect-3/4 overflow-hidden rounded-sm bg-cover bg-center focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
              style={{ backgroundImage: `url(${thumbHashDataURL})` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className='absolute inset-0'
                initial={false}
                animate={{
                  opacity: allLoaded ? 1 : 0,
                  scale: HOVER_SCALE[state],
                  filter: HOVER_FILTER[state],
                }}
                transition={TRANSITION}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static pre-generated variants, not served by next/image */}
                <img
                  ref={(img) => {
                    if (img?.complete) handleImageLoaded(index)
                  }}
                  srcSet={buildSrcSet(file, variants)}
                  sizes='(min-width: 768px) 211px, calc((100vw - 40px) / 3)'
                  width={width}
                  height={height}
                  alt=''
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding='async'
                  onLoad={() => handleImageLoaded(index)}
                  className='absolute inset-0 size-full object-cover shadow-none'
                />
              </motion.div>
            </Link>
          )
        },
      )}
    </div>
  )
}
