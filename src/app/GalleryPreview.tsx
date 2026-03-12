'use client'

import { CustomImage } from '@/components/CustomImage'
import { MOTION_EASING } from '@/lib/constants'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

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
  images: { file: string; thumbHashDataURL: string }[]
}

export function GalleryPreview({ images }: GalleryPreviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [loadedCount, setLoadedCount] = useState(0)
  const allLoaded = loadedCount >= images.length

  function handleLoad() {
    setLoadedCount((prev) => prev + 1)
  }

  return (
    <div className='mt-8 grid grid-cols-3 gap-1 overflow-hidden rounded-sm'>
      {images.map(({ file, thumbHashDataURL }, index) => {
        const state = getHoverState(hoveredIndex, index)

        return (
          <Link
            key={file}
            href={`/gallery?image=${file}`}
            className='relative aspect-3/4 overflow-hidden bg-cover bg-center'
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
              <CustomImage
                src={`/gallery/images/${file}`}
                alt='Gallery preview'
                fill
                priority={index === 0}
                sizes='(min-width: 768px) 211px, calc((100vw - 40px) / 3)'
                className='object-cover shadow-none'
                onLoad={handleLoad}
              />
            </motion.div>
          </Link>
        )
      })}
    </div>
  )
}
