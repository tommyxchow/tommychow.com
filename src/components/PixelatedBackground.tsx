'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useSyncExternalStore } from 'react'

const MOBILE_QUERY = '(max-width: 767px)'

const subscribeMobile = (callback: () => void) => {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}
const getIsMobile = () => window.matchMedia(MOBILE_QUERY).matches
const getServerIsMobile = () => false

// Configuration for the pixelated background effect
const CONFIG = {
  pixelScale: 24, // Screen pixels per canvas pixel (desktop)
  pixelScaleMobile: 18, // Smaller scale on mobile to show more detail
  animationSpeed: 0.002,
  contrast: 1.5, // Hardcoded as `value * sqrt(value)` in the inner loop
}

// Pre-shifted RGBA palette as a single Uint32Array. One write per pixel
// instead of four byte writes — assumes little-endian (all consumer platforms).
const PALETTE_SIZE = 256
const PALETTE = new Uint32Array(PALETTE_SIZE)

const buildPalette = () => {
  // Black and white thermal scope style
  const stops: [number, number, number, number][] = [
    [0.0, 0, 0, 0],
    [0.3, 20, 20, 20],
    [0.5, 60, 60, 60],
    [0.7, 140, 140, 140],
    [0.9, 220, 220, 220],
    [1.0, 255, 255, 255],
  ]

  for (let i = 0; i < PALETTE_SIZE; i++) {
    const t = i / (PALETTE_SIZE - 1)

    let s1 = stops[0]!
    let s2 = stops[stops.length - 1]!

    for (let j = 0; j < stops.length - 1; j++) {
      if (t >= stops[j]![0] && t <= stops[j + 1]![0]) {
        s1 = stops[j]!
        s2 = stops[j + 1]!
        break
      }
    }

    const localT = (t - s1[0]) / (s2[0] - s1[0])
    const r = Math.floor(s1[1] + (s2[1] - s1[1]) * localT)
    const g = Math.floor(s1[2] + (s2[2] - s1[2]) * localT)
    const b = Math.floor(s1[3] + (s2[3] - s1[3]) * localT)

    PALETTE[i] = ((0xff << 24) | (b << 16) | (g << 8) | r) >>> 0
  }
}

buildPalette()

// Precomputed dither noise — avoids Math.random() per pixel per frame
const NOISE_SIZE = 4096
const NOISE_MASK = NOISE_SIZE - 1
const NOISE = new Float32Array(NOISE_SIZE)
for (let i = 0; i < NOISE_SIZE; i++) {
  NOISE[i] = (Math.random() - 0.5) / 128
}

const MAX_PULSES = 8
const PULSE_WIDTH = 0.15
const INV_PULSE_WIDTH_SQ = 1 / (PULSE_WIDTH * PULSE_WIDTH)

export function PixelatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getIsMobile,
    getServerIsMobile,
  )
  const targetOpacity = isMobile ? 0.25 : 0.15

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // alpha: false is faster when we don't need transparency on the canvas
    // itself (we control opacity via CSS).
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const mql = window.matchMedia(MOBILE_QUERY)

    let w = 0
    let h = 0
    let imageData!: ImageData
    let pixels32!: Uint32Array

    // Returns true if the cell grid changed and the canvas was reallocated.
    const updateSize = () => {
      const pixelScale = mql.matches
        ? CONFIG.pixelScaleMobile
        : CONFIG.pixelScale

      const newW = Math.max(1, Math.ceil(window.innerWidth / pixelScale))
      const newH = Math.max(1, Math.ceil(window.innerHeight / pixelScale))
      if (newW === w && newH === h) return false

      w = newW
      h = newH
      canvas.width = w
      canvas.height = h

      // Reuse the buffer across frames; only reallocate on resize.
      imageData = ctx.createImageData(w, h)
      pixels32 = new Uint32Array(imageData.data.buffer)
      return true
    }

    updateSize()

    let time = Math.random() * 1000

    let mouseX = 0.5
    let mouseY = 0.5
    let targetMouseX = 0.5
    let targetMouseY = 0.5

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth
      targetMouseY = e.clientY / window.innerHeight
    }

    const pulses: { x: number; y: number; startTime: number }[] = []

    // Pre-allocated per-frame pulse state (avoids per-frame allocation).
    const pulseX = new Float32Array(MAX_PULSES)
    const pulseY = new Float32Array(MAX_PULSES)
    const pulseRadius = new Float32Array(MAX_PULSES)
    const pulseFade = new Float32Array(MAX_PULSES)

    let lastPulseTime = 0
    const handlePointerDown = (e: PointerEvent) => {
      const now = performance.now()
      // Cooldown to prevent spam from overloading the visuals (150ms)
      if (now - lastPulseTime < 150) return

      // Don't trigger pulses on buttons/links to avoid cluttering interactions
      if ((e.target as HTMLElement).closest('button, a')) return

      lastPulseTime = now
      pulses.push({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        startTime: now,
      })
      if (pulses.length > MAX_PULSES) pulses.shift()
    }

    let animationId = 0
    let startTime: number | null = null

    const render = (now: number) => {
      // Skip animation state advancement in reduced motion so that resize
      // redraws stay static instead of slowly drifting.
      if (!prefersReducedMotion) {
        startTime ??= now
        const elapsed = now - startTime

        // Cleanup expired pulses (older than 2 seconds)
        for (let i = pulses.length - 1; i >= 0; i--) {
          if (now - pulses[i]!.startTime > 2000) {
            pulses.splice(i, 1)
          }
        }

        const easedProgress = Math.min(elapsed / 2000, 1)
        const introProgress = 1 - (1 - easedProgress) ** 3

        time += CONFIG.animationSpeed * introProgress

        // Smooth mouse movement (lerp)
        mouseX += (targetMouseX - mouseX) * 0.05
        mouseY += (targetMouseY - mouseY) * 0.05
      }

      // Pre-calculate frame-constant values
      const width = w
      const height = h
      const invW = 1 / width
      const invH = 1 / height

      // Snapshot pulse state once per frame instead of per pixel
      const pulseCount = pulses.length
      for (let i = 0; i < pulseCount; i++) {
        const p = pulses[i]!
        const age = (now - p.startTime) / 1000
        pulseX[i] = p.x
        pulseY[i] = p.y
        pulseRadius[i] = age * 0.8
        pulseFade[i] = 1 - age / 2
      }

      let index = 0

      for (let y = 0; y < height; y++) {
        const ny = y * invH
        const ySin = Math.sin(ny * 6 - time * 0.8)
        const dy = ny - mouseY
        const dySq = dy * dy

        for (let x = 0; x < width; x++) {
          const nx = x * invW

          // Wave interference pattern using normalized coordinates
          const v1 = Math.sin(nx * 4 + time)
          const v3 = Math.sin((nx + ny) * 5 + time * 1.2)

          // Radial component follows mouse
          const dx = nx - mouseX
          const dist = Math.sqrt(dx * dx + dySq)
          const v4 = Math.sin(dist * 8 - time)

          // Click/tap pulses
          let pulseVal = 0
          for (let i = 0; i < pulseCount; i++) {
            const dxP = nx - pulseX[i]!
            const dyP = ny - pulseY[i]!
            const pDist = Math.sqrt(dxP * dxP + dyP * dyP)
            const d = pDist - pulseRadius[i]!
            const wave = Math.exp(-(d * d) * INV_PULSE_WIDTH_SQ)
            pulseVal += wave * pulseFade[i]!
          }

          // Cap to avoid blinding white artifacts during overlaps
          if (pulseVal > 1) pulseVal = 1

          let value = (v1 + ySin + v3 + v4) / 4 + pulseVal * 0.4

          // Normalize to [0, 1] then apply contrast = 1.5 → x * sqrt(x)
          value = (value + 1) / 2
          value = value * Math.sqrt(value)

          // Dither (precomputed noise table)
          value += NOISE[index & NOISE_MASK]!

          if (value < 0) value = 0
          else if (value > 1) value = 1

          const paletteIndex = (value * 255) | 0
          pixels32[index] = PALETTE[paletteIndex]!
          index++
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const tick = (now: number) => {
      render(now)
      animationId = requestAnimationFrame(tick)
    }

    // ResizeObserver fires between layout and paint, so re-rendering here
    // fills the new backing store before the same frame's paint — no flash
    // of empty canvas, no stretched-rectangle cells during drag.
    const handleViewportResize = () => {
      if (!updateSize()) return
      render(performance.now())
    }
    const resizeObserver = new ResizeObserver(handleViewportResize)
    resizeObserver.observe(document.documentElement)

    // Reduced motion: render a single static frame and skip listeners
    if (prefersReducedMotion) {
      render(performance.now())
      return () => {
        resizeObserver.disconnect()
      }
    }

    // Trigger an initial center pulse on mount
    pulses.push({
      x: 0.5,
      y: 0.5,
      startTime: performance.now(),
    })

    // Pause the animation loop when the tab is hidden — rAF throttles
    // automatically but doesn't fully stop, and still burns battery.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
        animationId = 0
      } else if (animationId === 0) {
        animationId = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    animationId = requestAnimationFrame(tick)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationId)
    }
  }, [prefersReducedMotion])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }}
      animate={{ opacity: targetOpacity, scale: 1 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className='pointer-events-none fixed inset-0 -z-50 h-full w-full'
      style={{
        imageRendering: 'pixelated',
      }}
      aria-hidden='true'
    />
  )
}
