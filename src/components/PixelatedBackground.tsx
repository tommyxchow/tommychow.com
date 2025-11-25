'use client'

import { useEffect, useRef } from 'react'

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
  // "Thermal/Infrared" inspired but smoother
  const stops = [
    [0.0, 10, 0, 20], // Deep dark purple/black
    [0.2, 40, 0, 80], // Rich purple
    [0.4, 80, 0, 180], // Blue-purple
    [0.6, 200, 0, 100], // Red-pink
    [0.8, 255, 180, 0], // Orange-gold
    [1.0, 255, 255, 200], // White-yellow
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

  useEffect(() => {
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
      w = Math.ceil(window.innerWidth / CONFIG.pixelScale)
      h = Math.ceil(window.innerHeight / CONFIG.pixelScale)

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

    const animate = () => {
      time += CONFIG.animationSpeed

      // Smooth mouse movement (lerp)
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Pre-calculate constants for the frame
      const cx = w * mouseX
      const cy = h * mouseY
      const width = w
      const height = h
      const contrast = CONFIG.contrast

      // Optimization: Use a single loop index
      let index = 0

      for (let y = 0; y < height; y++) {
        // Optimization: Pre-calculate y-dependent values outside the inner loop
        const ySin = Math.sin(y * 0.09 - time * 0.8)
        const ySq = (y - cy) ** 2

        for (let x = 0; x < width; x++) {
          // Wave interference pattern
          const v1 = Math.sin(x * 0.06 + time)
          const v2 = ySin
          const v3 = Math.sin((x + y) * 0.08 + time * 1.2)

          // Radial component follows mouse
          const dist = Math.sqrt((x - cx) ** 2 + ySq)
          const v4 = Math.sin(dist * 0.12 - time)

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

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none fixed inset-0 -z-50 h-full w-full opacity-15'
      style={{
        imageRendering: 'pixelated',
      }}
      aria-hidden='true'
    />
  )
}
