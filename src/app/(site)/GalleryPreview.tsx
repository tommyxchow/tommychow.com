'use client'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { buildSrcSet } from '@/lib/gallery-image'
import { thumbHashToPlaceholder } from '@/lib/thumbhash'
import { cn } from '@/lib/utils'
import { useReducedMotion } from 'motion/react'
import Link from 'next/link'
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { twJoin } from 'tailwind-merge'

// Uniform preview frames — aligned with HomeClient max-w-md (+ px-6 on small screens)
const SLIDE_CLASS =
  'aspect-[3/4] w-[min(calc(100vw-3rem),28rem)] md:w-md shrink-0 snap-center' as const
// Landscape images need extra source width because object-cover scales them by frame height.
const PREVIEW_IMG_SIZES =
  '(min-width: 768px) 56rem, calc(200vw - 6rem)' as const
const ARROW_CLASSNAME = twJoin(
  'absolute inset-y-0 z-10 my-auto hidden touch-manipulation rounded-full border-0',
  'bg-background/60 opacity-0 backdrop-blur-sm transition-opacity',
  'group-hover/gallery:opacity-100 group-focus-within/gallery:opacity-100 focus-visible:opacity-100 md:flex',
)
const SNAP_DURATION = 20
const FOCUS_DIMMED = 0.45
const FOCUS_FULL = 1
const FOCUS_TRANSITION =
  'transition-opacity duration-200 ease-out motion-reduce:transition-none'

function areFocusValuesEqual(current: number[], next: number[]) {
  if (current.length !== next.length) return false

  return current.every(
    (value, index) => Math.abs(value - (next[index] ?? 0)) < 0.001,
  )
}

function setFocusIfChanged(
  setFocusByIndex: Dispatch<SetStateAction<number[]>>,
  nextFocusByIndex: number[],
) {
  setFocusByIndex((current) =>
    areFocusValuesEqual(current, nextFocusByIndex) ? current : nextFocusByIndex,
  )
}

function computeElementFocus(
  container: HTMLElement,
  slideElements: HTMLElement[],
): number[] {
  const slideCount = slideElements.length
  if (slideCount === 0) return []
  if (slideCount === 1) return [FOCUS_FULL]

  const containerRect = container.getBoundingClientRect()
  const containerCenter = containerRect.left + containerRect.width / 2

  const sortedDistances = slideElements
    .map((slide, index) => {
      const rect = slide.getBoundingClientRect()
      const slideCenter = rect.left + rect.width / 2
      return { index, distance: Math.abs(slideCenter - containerCenter) }
    })
    .sort((a, b) => a.distance - b.distance)

  const closest = sortedDistances[0]
  const neighbor = sortedDistances[1]
  const focus = Array.from({ length: slideCount }, () => FOCUS_DIMMED)

  if (!closest || !neighbor) return focus

  const segmentLength = closest.distance + neighbor.distance
  if (segmentLength === 0) {
    focus[closest.index] = FOCUS_FULL
    return focus
  }

  const t = Math.min(1, closest.distance / segmentLength)
  focus[closest.index] = FOCUS_FULL - t * (FOCUS_FULL - FOCUS_DIMMED)
  focus[neighbor.index] = FOCUS_DIMMED + t * (FOCUS_FULL - FOCUS_DIMMED)

  return focus
}

function useSlideFocus(api: CarouselApi | undefined, count: number) {
  const [focusByIndex, setFocusByIndex] = useState<number[]>(() =>
    Array.from({ length: count }, (_, index) =>
      index === 0 ? FOCUS_FULL : FOCUS_DIMMED,
    ),
  )

  useEffect(() => {
    if (!api) return

    let frameId = 0

    const update = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setFocusIfChanged(
          setFocusByIndex,
          computeElementFocus(api.rootNode(), api.slideNodes()),
        )
      })
    }

    api.on('scroll', update)
    api.on('reInit', update)
    api.on('select', update)
    update()

    return () => {
      cancelAnimationFrame(frameId)
      api.off('scroll', update)
      api.off('reInit', update)
      api.off('select', update)
    }
  }, [api, count])

  return focusByIndex
}

function useLoadedImages() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(() => new Set())

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => {
      if (prev.has(index)) return prev
      return new Set(prev).add(index)
    })
  }, [])

  return { loadedImages, handleImageLoad }
}

function useGalleryDrag(api: CarouselApi | undefined) {
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!api) return

    const onPointerDown = () => setIsDragging(true)
    const onPointerUp = () => setIsDragging(false)

    api.on('pointerDown', onPointerDown)
    api.on('pointerUp', onPointerUp)

    return () => {
      api.off('pointerDown', onPointerDown)
      api.off('pointerUp', onPointerUp)
    }
  }, [api])

  return isDragging
}

interface GalleryImage {
  file: string
  thumbHash: string
  width: number
  height: number
  variants: number[]
}

interface GalleryPreviewProps {
  images: GalleryImage[]
  remainingCount: number
}

interface PreviewImageProps {
  image: GalleryImage
  index: number
  onLoad: (index: number) => void
  isLoaded: boolean
  focus?: number
}

interface GalleryArchiveLinkProps {
  remainingCount: number
}

interface GalleryFrameProps {
  children: ReactNode
  isDragging: boolean
}

function GalleryFrame({ children, isDragging }: GalleryFrameProps) {
  return (
    <div
      className={cn(
        'relative left-1/2 w-screen -translate-x-1/2',
        isDragging && 'cursor-grabbing',
      )}
    >
      {children}
    </div>
  )
}

function PreviewImage({
  image,
  index,
  onLoad,
  isLoaded,
  focus = FOCUS_FULL,
}: PreviewImageProps) {
  const { file, thumbHash, width, height, variants } = image

  return (
    <Link
      href={`/gallery?image=${file}`}
      aria-label={`View ${file} in gallery`}
      draggable={false}
      className={cn(
        'relative block overflow-hidden rounded-sm ring-1 ring-transparent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
        'cursor-pointer',
        FOCUS_TRANSITION,
        SLIDE_CLASS,
      )}
      style={{
        backgroundImage: `url(${thumbHashToPlaceholder(thumbHash)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: isLoaded ? focus : 1,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static pre-generated variants, not served by next/image */}
      <img
        ref={(img) => {
          if (img?.complete) onLoad(index)
        }}
        srcSet={buildSrcSet(file, variants)}
        sizes={PREVIEW_IMG_SIZES}
        width={width}
        height={height}
        alt=''
        fetchPriority={index === 0 ? 'high' : 'auto'}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding='async'
        onLoad={() => onLoad(index)}
        className={twJoin(
          'size-full object-cover object-center shadow-none',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </Link>
  )
}

function GalleryArchiveLink({ remainingCount }: GalleryArchiveLinkProps) {
  const label =
    remainingCount > 0 ? `view ${remainingCount} more` : 'view gallery'

  return (
    <div className='mt-2 flex justify-center'>
      <Button
        render={<Link href='/gallery' />}
        nativeButton={false}
        variant='ghost'
        size='xs'
        className='font-mono text-muted-foreground uppercase hover:text-foreground'
      >
        {label}
      </Button>
    </div>
  )
}

function ScrollGallery({ images }: { images: GalleryImage[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { loadedImages, handleImageLoad } = useLoadedImages()
  const [focusByIndex, setFocusByIndex] = useState<number[]>(() =>
    Array.from({ length: images.length }, (_, index) =>
      index === 0 ? FOCUS_FULL : FOCUS_DIMMED,
    ),
  )
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const slideElements = Array.from(
      node.querySelectorAll<HTMLElement>('[data-gallery-slide]'),
    )

    let frameId = 0

    const update = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setFocusIfChanged(
          setFocusByIndex,
          computeElementFocus(node, slideElements),
        )
      })
    }

    update()
    node.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(frameId)
      node.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [images.length])

  return (
    <GalleryFrame isDragging={isDragging}>
      <div
        ref={containerRef}
        aria-label='Gallery preview'
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
        className='flex snap-x snap-mandatory scrollbar-none items-center overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
      >
        {images.map((image, index) => (
          <div
            key={image.file}
            data-gallery-slide
            className='shrink-0 pl-1 md:pl-2'
          >
            <PreviewImage
              image={image}
              index={index}
              isLoaded={loadedImages.has(index)}
              onLoad={handleImageLoad}
              focus={focusByIndex[index] ?? FOCUS_DIMMED}
            />
          </div>
        ))}
      </div>
    </GalleryFrame>
  )
}

function EmblaGallery({ images }: { images: GalleryImage[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const { loadedImages, handleImageLoad } = useLoadedImages()
  const focusByIndex = useSlideFocus(api, images.length)
  const isDragging = useGalleryDrag(api)

  return (
    <GalleryFrame isDragging={isDragging}>
      <Carousel
        setApi={setApi}
        aria-label='Gallery preview'
        opts={{
          loop: true,
          dragFree: false,
          skipSnaps: false,
          align: 'center',
          dragThreshold: 12,
          duration: SNAP_DURATION,
        }}
        className='group/gallery w-full'
      >
        <CarouselContent className='-ml-1 items-center md:-ml-2'>
          {images.map((image, index) => (
            <CarouselItem key={image.file} className='basis-auto pl-1 md:pl-2'>
              <PreviewImage
                image={image}
                index={index}
                isLoaded={loadedImages.has(index)}
                onLoad={handleImageLoad}
                focus={focusByIndex[index] ?? FOCUS_DIMMED}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          variant='ghost'
          disabled={false}
          className={cn(ARROW_CLASSNAME, 'left-2')}
        />
        <CarouselNext
          variant='ghost'
          disabled={false}
          className={cn(ARROW_CLASSNAME, 'right-2')}
        />
      </Carousel>
    </GalleryFrame>
  )
}

export function GalleryPreview({
  images,
  remainingCount,
}: GalleryPreviewProps) {
  const prefersReducedMotion = useReducedMotion()

  const gallery = prefersReducedMotion ? (
    <ScrollGallery images={images} />
  ) : (
    <EmblaGallery images={images} />
  )

  return (
    <>
      {gallery}
      <GalleryArchiveLink remainingCount={remainingCount} />
    </>
  )
}
