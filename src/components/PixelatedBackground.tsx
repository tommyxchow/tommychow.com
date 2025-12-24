'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

// Configuration for the pixelated background effect
const CONFIG = {
  pixelScale: 24, // Screen pixels per canvas pixel
  animationSpeed: 0.002, // Slower for a more relaxed feel
  contrast: 1.5, // Adjusted for better dynamic range with the new palette
}

// Precompute a color palette (Lookup Table) for performance
// This avoids calculating RGB values for every pixel every frame
const PALETTE_SIZE = 256
const PALETTE = new Uint8Array(PALETTE_SIZE * 3)

const createGradient = () => {
  // Define keyframes: [position, r, g, b]
  // Black and white thermal scope style
  const stops = [
    [0.0, 0, 0, 0], // Black
    [0.3, 20, 20, 20], // Very dark grey
    [0.5, 60, 60, 60], // Dark grey
    [0.7, 140, 140, 140], // Grey
    [0.9, 220, 220, 220], // Light grey
    [1.0, 255, 255, 255], // White
  ]

  for (let i = 0; i < PALETTE_SIZE; i++) {
    const t = i / (PALETTE_SIZE - 1)

    // Find the stops we are between
    let s1 = stops[0]
    let s2 = stops[stops.length - 1]

    for (let j = 0; j < stops.length - 1; j++) {
      if (t >= stops[j][0] && t <= stops[j + 1][0]) {
        s1 = stops[j]
        s2 = stops[j + 1]
        break
      }
    }

    // Interpolate
    const localT = (t - s1[0]) / (s2[0] - s1[0])

    PALETTE[i * 3] = Math.floor(s1[1] + (s2[1] - s1[1]) * localT)
    PALETTE[i * 3 + 1] = Math.floor(s1[2] + (s2[2] - s1[2]) * localT)
    PALETTE[i * 3 + 2] = Math.floor(s1[3] + (s2[3] - s1[3]) * localT)
  }
}

// Initialize palette once
createGradient()

export function PixelatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true))
    const canvas = canvasRef.current
    if (!canvas) return

    // Optimization: alpha: false is faster if we don't need transparency on the canvas itself
    // (We control opacity via CSS)
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let w = 0
    let h = 0
    let imageData: ImageData
    let data: Uint8ClampedArray

    const updateSize = () => {
      const isMobile = window.innerWidth < 768
      // Use a smaller scale on mobile to show more detail in the pattern
      const pixelScale = isMobile ? 18 : CONFIG.pixelScale

      w = Math.ceil(window.innerWidth / pixelScale)
      h = Math.ceil(window.innerHeight / pixelScale)

      if (w < 1) w = 1
      if (h < 1) h = 1

      canvas.width = w
      canvas.height = h

      // Optimization: Create ImageData once on resize, reuse the buffer
      imageData = ctx.createImageData(w, h)
      data = imageData.data
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    // Animation state
    let time = Math.random() * 1000

    // Mouse interaction state
    let mouseX = 0.5
    let mouseY = 0.5
    let targetMouseX = 0.5
    let targetMouseY = 0.5

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / window.innerWidth
      targetMouseY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationId: number
    let startTime: number | null = null

    const animate = (now: number) => {
      startTime ??= now
      const elapsed = now - startTime
      const introProgress = Math.min(elapsed / 2000, 1)
      const easedProgress = 1 - Math.pow(1 - introProgress, 3)

      time += CONFIG.animationSpeed * easedProgress

      // Smooth mouse movement (lerp)
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Pre-calculate constants for the frame
      const width = w
      const height = h
      const contrast = CONFIG.contrast

      // Optimization: Use a single loop index
      let index = 0

      for (let y = 0; y < height; y++) {
        // Use normalized coordinates (0 to 1) so the pattern scales with screen size
        const ny = y / height
        const ySin = Math.sin(ny * 6 - time * 0.8)
        const dy = ny - mouseY
        const dySq = dy * dy

        for (let x = 0; x < width; x++) {
          const nx = x / width

          // Wave interference pattern using normalized coordinates
          const v1 = Math.sin(nx * 4 + time)
          const v2 = ySin
          const v3 = Math.sin((nx + ny) * 5 + time * 1.2)

          // Radial component follows mouse (using normalized distance)
          const dx = nx - mouseX
          const dist = Math.sqrt(dx * dx + dySq)
          const v4 = Math.sin(dist * 8 - time)

          let value = (v1 + v2 + v3 + v4) / 4.0

          // Normalize and apply contrast
          value = (value + 1.0) / 2.0
          value = Math.pow(value, contrast)

          // Dithering to reduce banding artifacts
          // Adds subtle noise to break up hard edges between palette colors
          value += (Math.random() - 0.5) * (1 / 128)

          // Clamp
          if (value < 0) value = 0
          if (value > 1) value = 1

          // Map to palette (LUT)
          const paletteIndex = Math.floor(value * 255) * 3

          data[index++] = PALETTE[paletteIndex]
          data[index++] = PALETTE[paletteIndex + 1]
          data[index++] = PALETTE[paletteIndex + 2]
          data[index++] = 255 // Full opacity
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'pointer-events-none fixed inset-0 -z-50 h-full w-full transition-all duration-1000 ease-out',
        isMounted
          ? 'scale-100 opacity-25 md:opacity-15'
          : 'scale-105 opacity-0',
      )}
      style={{
        imageRendering: 'pixelated',
      }}
      aria-hidden='true'
    />
  )
}
