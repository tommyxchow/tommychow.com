'use client'

import { CustomImage } from '@/components/CustomImage'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronDown, ChevronUp, Grid } from 'lucide-react'
import { motion, useMotionValue, useSpring, type PanInfo } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Shared spring config for consistent animations across the gallery
const SPRING_CONFIG = {
  stiffness: 100,
  damping: 20,
}

// Scroll threshold: 15% of viewport height to trigger snap to next/prev
const SCROLL_THRESHOLD = 0.15

// Number of images to prefetch ahead
const PREFETCH_COUNT = 2

// Maximum number of prefetched images to track (prevents unbounded memory growth)
const MAX_PREFETCH_CACHE = 20

// Virtual scrolling: render window around current index for performance
const RENDER_WINDOW = 3

interface GalleryClientProps {
  images: {
    file: string
    thumbHashDataURL: string
    dateTime: string
  }[]
}

export function GalleryClient({ images }: GalleryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetIndexRef = useRef(0)
  const prefetchedRef = useRef<Set<number>>(new Set())
  const shouldScrollToSelectedRef = useRef(false)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [gridOpen, setGridOpen] = useState(false)

  // Transform-based animation for 120fps on ProMotion displays
  const yOffset = useMotionValue(0)
  const springY = useSpring(yOffset, SPRING_CONFIG)

  // Mark image as loaded
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }, [])

  // Prefetch upcoming images using link prefetch (better browser integration)
  useEffect(() => {
    const linksAdded: HTMLLinkElement[] = []

    // Clear cache if it grows too large to prevent unbounded memory growth
    if (prefetchedRef.current.size > MAX_PREFETCH_CACHE) {
      prefetchedRef.current.clear()
    }

    for (let i = 1; i <= PREFETCH_COUNT; i++) {
      const indices = [displayIndex + i, displayIndex - i]
      for (const idx of indices) {
        if (
          idx >= 0 &&
          idx < images.length &&
          !prefetchedRef.current.has(idx)
        ) {
          prefetchedRef.current.add(idx)
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.as = 'image'
          link.href = `/gallery/images/${images[idx].file}`
          document.head.appendChild(link)
          linksAdded.push(link)
        }
      }
    }

    return () => {
      linksAdded.forEach((link) => link.remove())
    }
  }, [displayIndex, images])

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current) return
      const clampedIndex = Math.max(0, Math.min(index, images.length - 1))

      // Skip if already at target
      if (clampedIndex === targetIndexRef.current) return

      targetIndexRef.current = clampedIndex
      setDisplayIndex(clampedIndex)

      // Update motion value - spring handles the animation on compositor thread
      const viewportHeight = containerRef.current.clientHeight
      yOffset.set(-clampedIndex * viewportHeight)
    },
    [images.length, yOffset],
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

  // Set flag to scroll when grid opens
  useEffect(() => {
    if (gridOpen) {
      shouldScrollToSelectedRef.current = true
    }
  }, [gridOpen])

  // Callback ref that scrolls selected thumbnail into view when it mounts
  const selectedThumbnailRef = useCallback((node: HTMLButtonElement | null) => {
    if (node && shouldScrollToSelectedRef.current) {
      shouldScrollToSelectedRef.current = false
      setTimeout(() => {
        node.scrollIntoView({ block: 'center', behavior: 'instant' })
      }, 0)
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        scrollToIndex(targetIndexRef.current + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        scrollToIndex(targetIndexRef.current - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollToIndex])

  // Memoize thumbnail grid to avoid re-renders when popover state changes
  const thumbnailGrid = useMemo(
    () => (
      <div className='grid grid-cols-2 gap-1.5 sm:grid-cols-3'>
        {images.map(({ file, thumbHashDataURL }, index) => (
          <button
            key={file}
            ref={index === displayIndex ? selectedThumbnailRef : null}
            onClick={() => {
              scrollToIndex(index)
              setGridOpen(false)
            }}
            className={`relative aspect-square overflow-hidden rounded transition-all focus:outline-none ${
              index === displayIndex
                ? 'ring-foreground ring-2'
                : 'opacity-70 hover:opacity-100 hover:ring-foreground/50 hover:ring-2'
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <CustomImage
              src={`/gallery/images/${file}`}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes='(min-width: 640px) 120px, 150px'
              className='object-cover shadow-none'
              placeholder='blur'
              blurDataURL={thumbHashDataURL}
            />
          </button>
        ))}
      </div>
    ),
    [images, displayIndex, scrollToIndex, selectedThumbnailRef],
  )

  return (
    <div className='relative h-dvh w-full overflow-hidden'>
      <motion.div
        ref={containerRef}
        className='h-full w-full'
        onPanEnd={handlePanEnd}
        style={{ touchAction: 'none' }}
      >
        <motion.div
          className='will-change-transform'
          style={{ y: springY }}
        >
          {images.map(({ file }, index) => {
            // Virtual scrolling: only render images within window of current index
            const shouldRender = Math.abs(index - displayIndex) <= RENDER_WINDOW

            if (!shouldRender) {
              // Render empty placeholder to maintain layout
              return (
                <div
                  key={file}
                  className='h-dvh w-full shrink-0'
                  aria-hidden='true'
                />
              )
            }

            const isLoaded = loadedImages.has(index)
            return (
              <motion.div
                key={file}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isLoaded
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{
                  type: 'spring',
                  ...SPRING_CONFIG,
                }}
                className='flex h-dvh w-full shrink-0 items-center justify-center px-4 pt-16 pb-32 md:px-12 md:pt-20 md:pb-32'
              >
                <div className='relative h-full w-full'>
                  <CustomImage
                    src={`/gallery/images/${file}`}
                    alt={`Gallery image ${file}`}
                    fill
                    preload={index < 2}
                    sizes='100vw'
                    className='object-contain shadow-none'
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>

      <div className='pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-4'>
        <div className='text-muted-foreground pointer-events-auto flex flex-col items-center gap-1 px-4 font-mono text-xs uppercase'>
          <span className='truncate'>{images[displayIndex]?.file}</span>
          <span>{images[displayIndex]?.dateTime}</span>
        </div>
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
          <Popover open={gridOpen} onOpenChange={setGridOpen}>
            <PopoverTrigger
              className='bg-background/20 hover:bg-background/40 text-muted-foreground hover:text-foreground pointer-events-auto flex min-w-20 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm backdrop-blur-md transition-all active:scale-95'
              aria-label='Open image gallery grid'
            >
              <Grid className='h-3.5 w-3.5' />
              {displayIndex + 1} / {images.length}
            </PopoverTrigger>
            <PopoverContent
              side='top'
              sideOffset={12}
              className='max-h-80 w-[calc(100vw-2rem)] max-w-sm overflow-y-auto p-2 sm:w-96 sm:max-w-none'
            >
              {thumbnailGrid}
            </PopoverContent>
          </Popover>
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
