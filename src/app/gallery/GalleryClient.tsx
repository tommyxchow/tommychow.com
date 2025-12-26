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

// Configuration for gallery behavior
const GALLERY_CONFIG = {
  SPRING: { stiffness: 100, damping: 20 },
  SCROLL_THRESHOLD: 0.15, // % of viewport for pan
  SCROLL_COOLDOWN: 500, // ms between scrolls
  WHEEL_THRESHOLD: 60, // delta sum to trigger scroll
  SILENCE_TIMEOUT: 150, // ms of no events to reset inertia
  RENDER_WINDOW: 5,
  PREFETCH_COUNT: 3,
}

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
  const lastScrollTimeRef = useRef(0)
  const prefetchedRef = useRef<Set<number>>(new Set())
  const shouldScrollToSelectedRef = useRef(false)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [gridOpen, setGridOpen] = useState(false)

  // Transform-based animation for 120fps on ProMotion displays
  const yOffset = useMotionValue(0)
  const springY = useSpring(yOffset, GALLERY_CONFIG.SPRING)

  // Mark image as loaded
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }, [])

  // Prefetch upcoming images using link prefetch
  useEffect(() => {
    const linksAdded: HTMLLinkElement[] = []
    const MAX_PREFETCH_CACHE = 20

    if (prefetchedRef.current.size > MAX_PREFETCH_CACHE) {
      prefetchedRef.current.clear()
    }

    // Start from 2 because index ±1 is already handled by high-priority 'preload' prop
    for (let i = 2; i <= GALLERY_CONFIG.PREFETCH_COUNT; i++) {
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

    return () => linksAdded.forEach((link) => link.remove())
  }, [displayIndex, images])

  const scrollToIndex = useCallback(
    (index: number, ignoreCooldown = false) => {
      if (!containerRef.current) return false
      const clampedIndex = Math.max(0, Math.min(index, images.length - 1))

      if (clampedIndex === targetIndexRef.current) return false

      const now = Date.now()
      if (
        !ignoreCooldown &&
        now - lastScrollTimeRef.current < GALLERY_CONFIG.SCROLL_COOLDOWN
      ) {
        return false
      }

      targetIndexRef.current = clampedIndex
      setDisplayIndex(clampedIndex)
      lastScrollTimeRef.current = now

      const viewportHeight = containerRef.current.clientHeight
      yOffset.set(-clampedIndex * viewportHeight)
      return true
    },
    [images.length, yOffset],
  )

  const handleScroll = useCallback(
    (direction: 'up' | 'down') => {
      const nextIndex =
        direction === 'down'
          ? targetIndexRef.current + 1
          : targetIndexRef.current - 1
      scrollToIndex(nextIndex, true)
    },
    [scrollToIndex],
  )

  const handlePanEnd = useCallback(
    (_event: PointerEvent, info: PanInfo) => {
      if (!containerRef.current) return
      const threshold =
        containerRef.current.clientHeight * GALLERY_CONFIG.SCROLL_THRESHOLD

      if (
        Math.abs(info.offset.y) >= threshold ||
        Math.abs(info.velocity.y) > 500
      ) {
        const direction = info.offset.y < 0 ? 1 : -1
        scrollToIndex(targetIndexRef.current + direction, true)
      }
    },
    [scrollToIndex],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let accumulatedDelta = 0
    let lastDelta = 0
    let isLocked = false
    let wheelTimeout: ReturnType<typeof setTimeout> | null = null

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTimeRef.current

      // 1. Silence Detection: Reset lock and delta after a pause in events
      if (wheelTimeout) clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        isLocked = false
        accumulatedDelta = 0
      }, GALLERY_CONFIG.SILENCE_TIMEOUT)

      // 2. Hard Cooldown: Ignore everything immediately after a scroll
      if (timeSinceLastScroll < GALLERY_CONFIG.SCROLL_COOLDOWN) {
        isLocked = true
        lastDelta = e.deltaY
        return
      }

      // 3. Inertia Lock: If locked, only unlock on new intentional action
      if (isLocked) {
        const isNewSwipe = Math.abs(e.deltaY) > Math.abs(lastDelta) + 20
        const isDirectionChange =
          Math.sign(e.deltaY) !== Math.sign(lastDelta) &&
          Math.abs(e.deltaY) > 10

        if (isNewSwipe || isDirectionChange) {
          isLocked = false
          accumulatedDelta = 0
        } else {
          lastDelta = e.deltaY
          return
        }
      }

      // 4. Accumulate and Trigger
      accumulatedDelta += e.deltaY
      lastDelta = e.deltaY

      if (Math.abs(accumulatedDelta) >= GALLERY_CONFIG.WHEEL_THRESHOLD) {
        const direction = Math.sign(accumulatedDelta)
        if (scrollToIndex(targetIndexRef.current + direction)) {
          isLocked = true
          accumulatedDelta = 0
        }
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (wheelTimeout) clearTimeout(wheelTimeout)
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
              scrollToIndex(index, true)
              setGridOpen(false)
            }}
            className={`relative aspect-square overflow-hidden rounded transition-all focus:outline-none ${
              index === displayIndex
                ? 'ring-foreground ring-2'
                : 'hover:ring-foreground/50 opacity-70 hover:opacity-100 hover:ring-2'
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
        <motion.div className='will-change-transform' style={{ y: springY }}>
          {images.map(({ file }, index) => {
            // Virtual scrolling: only render images within window of current index
            const shouldRender =
              Math.abs(index - displayIndex) <= GALLERY_CONFIG.RENDER_WINDOW

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
                  ...GALLERY_CONFIG.SPRING,
                }}
                className='flex h-dvh w-full shrink-0 items-center justify-center px-4 pt-16 pb-32 md:px-12 md:pt-20 md:pb-32'
              >
                <div className='relative h-full w-full'>
                  {/* Loading spinner */}
                  {!isLoaded && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='border-muted-foreground/30 border-t-muted-foreground size-8 animate-spin rounded-full border-2' />
                    </div>
                  )}
                  <CustomImage
                    src={`/gallery/images/${file}`}
                    alt={`Gallery image ${file}`}
                    fill
                    // Preload the first two images for LCP, and the immediate neighbors for smooth transitions
                    preload={index < 2 || Math.abs(index - displayIndex) <= 1}
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
              className='bg-background/20 hover:bg-background/40 text-muted-foreground hover:text-foreground pointer-events-auto flex min-w-20 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm tabular-nums backdrop-blur-md transition-all active:scale-95'
              aria-label='Open image gallery grid'
            >
              <Grid className='h-3.5 w-3.5' />
              <span
                className='inline-block text-right'
                style={{ minWidth: `${String(images.length).length}ch` }}
              >
                {displayIndex + 1}
              </span>
              {' / '}
              {images.length}
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
