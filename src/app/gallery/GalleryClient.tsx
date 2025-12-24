'use client'

import { CustomImage } from '@/components/CustomImage'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { animate, type AnimationPlaybackControls } from 'motion'
import { motion, type PanInfo } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

// Shared spring config for consistent animations across the gallery
const SPRING_CONFIG = {
  stiffness: 100,
  damping: 20,
}

// Scroll threshold: 15% of viewport height to trigger snap to next/prev
const SCROLL_THRESHOLD = 0.15

interface GalleryClientProps {
  images: {
    file: string
    thumbHashDataURL: string
  }[]
}

export function GalleryClient({ images }: GalleryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationPlaybackControls | null>(null)
  const targetIndexRef = useRef(0)
  const [displayIndex, setDisplayIndex] = useState(0)

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current) return
      const container = containerRef.current
      const clampedIndex = Math.max(0, Math.min(index, images.length - 1))

      // Skip if already at target
      if (clampedIndex === targetIndexRef.current && animationRef.current)
        return

      // Cancel any ongoing animation immediately
      if (animationRef.current) {
        animationRef.current.stop()
      }

      targetIndexRef.current = clampedIndex
      setDisplayIndex(clampedIndex)
      const scrollStep = container.clientHeight
      const targetScroll = clampedIndex * scrollStep

      animationRef.current = animate(container.scrollTop, targetScroll, {
        type: 'spring',
        ...SPRING_CONFIG,
        onUpdate: (latest) => {
          container.scrollTop = latest
        },
        onComplete: () => {
          animationRef.current = null
        },
      })
    },
    [images.length],
  )

  const handleScroll = useCallback(
    (direction: 'up' | 'down') => {
      const nextIndex =
        direction === 'down'
          ? targetIndexRef.current + 1
          : targetIndexRef.current - 1
      scrollToIndex(nextIndex)
    },
    [scrollToIndex],
  )

  // Handle pan gesture end (works for both mouse and touch)
  const handlePanEnd = useCallback(
    (_event: PointerEvent, info: PanInfo) => {
      if (!containerRef.current) return
      const threshold = containerRef.current.clientHeight * SCROLL_THRESHOLD

      // Use offset for total distance or velocity for quick flicks
      const shouldNavigate =
        Math.abs(info.offset.y) >= threshold || Math.abs(info.velocity.y) > 500

      if (shouldNavigate) {
        const direction = info.offset.y < 0 ? 1 : -1
        scrollToIndex(targetIndexRef.current + direction)
      }
    },
    [scrollToIndex],
  )

  // Handle wheel scroll with threshold-based snapping
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null
    let accumulatedDelta = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      accumulatedDelta += e.deltaY
      const threshold = container.clientHeight * SCROLL_THRESHOLD

      if (Math.abs(accumulatedDelta) >= threshold) {
        const direction = accumulatedDelta > 0 ? 1 : -1
        scrollToIndex(targetIndexRef.current + direction)
        accumulatedDelta = 0
      }

      // Reset accumulated delta after a pause in scrolling
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        accumulatedDelta = 0
      }, 150)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [scrollToIndex])

  return (
    <div className='relative h-dvh w-full overflow-hidden'>
      <motion.div
        ref={containerRef}
        className='h-full w-full overflow-hidden'
        onPanEnd={handlePanEnd}
        style={{ touchAction: 'none' }}
      >
        {images.map(({ file, thumbHashDataURL }, index) => (
          <motion.div
            key={file}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: '-20%' }}
            transition={{
              type: 'spring',
              ...SPRING_CONFIG,
            }}
            className='flex h-dvh w-full shrink-0 items-center justify-center px-4 pt-4 pb-24 md:px-12 md:pt-12 md:pb-28'
          >
            <div className='relative h-full w-full'>
              <CustomImage
                src={`/gallery/images/${file}`}
                alt={`Gallery image ${file}`}
                fill
                preload={index < 2}
                sizes='100vw'
                className='object-contain shadow-none'
                placeholder='blur'
                blurDataURL={thumbHashDataURL}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className='pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3'>
        <span className='text-muted-foreground truncate px-4 text-center font-mono text-xs'>
          {images[displayIndex]?.file}
        </span>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleScroll('up')}
            disabled={displayIndex === 0}
            className='bg-background/20 hover:bg-background/40 pointer-events-auto rounded-full backdrop-blur-md transition-transform active:scale-95'
            aria-label='Scroll to previous image'
          >
            <ChevronUp className='h-6 w-6' />
          </Button>
          <span className='text-muted-foreground min-w-16 text-center font-mono text-sm'>
            {displayIndex + 1} / {images.length}
          </span>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleScroll('down')}
            disabled={displayIndex === images.length - 1}
            className='bg-background/20 hover:bg-background/40 pointer-events-auto rounded-full backdrop-blur-md transition-transform active:scale-95'
            aria-label='Scroll to next image'
          >
            <ChevronDown className='h-6 w-6' />
          </Button>
        </div>
      </div>
    </div>
  )
}
