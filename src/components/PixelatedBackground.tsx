'use client'

import { useEffect, useRef } from 'react'

// Configuration for the pixelated background effect
const CONFIG = {
  // Visual Scale
  pixelScale: 24, // Screen pixels per canvas pixel (higher = blockier)

  // Animation
  animationSpeed: 0.003, // Lower = slower movement

  // Wave Pattern Settings
  // Controls the "zoom" or frequency of the noise pattern
  wave1Freq: 0.06,
  wave2Freq: 0.09,
  wave3Freq: 0.08,
  wave4Freq: 0.12,

  // Contrast
  // Higher value (>1) pushes mid-tones to dark/light, creating more negative space
  contrast: 1.8,
}

export function PixelatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Low resolution for pixelation
    // We'll update these on resize
    let w = 64
    let h = 64

    const updateSize = () => {
      // Calculate aspect ratio of the full document
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      )
      const docWidth = document.documentElement.clientWidth

      // Calculate canvas dimensions based on fixed pixel scale
      // This ensures the pattern size remains constant regardless of screen width
      w = Math.ceil(docWidth / CONFIG.pixelScale)
      h = Math.ceil(docHeight / CONFIG.pixelScale)

      // Ensure minimums
      if (w < 1) w = 1
      if (h < 1) h = 1

      canvas.width = w
      canvas.height = h
    }

    // Initial size
    updateSize()

    // Update on resize
    window.addEventListener('resize', updateSize)

    // Randomize starting parameters for uniqueness
    let time = Math.random() * 1000
    const offset1 = Math.random() * 100
    const offset2 = Math.random() * 100
    const offset3 = Math.random() * 100

    let animationId: number

    const animate = () => {
      time += CONFIG.animationSpeed

      // Create image data
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          // Use pixel coordinates directly for pattern generation
          // This ensures the pattern scale is independent of canvas size

          // Generate wave pattern
          const v1 = Math.sin(x * CONFIG.wave1Freq + time + offset1)
          const v2 = Math.sin(y * CONFIG.wave2Freq - time * 0.8 + offset2)
          const v3 = Math.sin((x + y) * CONFIG.wave3Freq + time * 1.2 + offset3)

          // Radial component centered roughly on the screen
          // We use a moving center to make it less static
          const cx = w / 2 + Math.sin(time * 0.5) * (w / 4)
          const cy = h / 2 + Math.cos(time * 0.3) * (h / 4)
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
          const v4 = Math.sin(dist * CONFIG.wave4Freq - time)

          // Combine and normalize to 0-1 range
          let value = (v1 + v2 + v3 + v4) / 4.0
          value = (value + 1.0) / 2.0

          // Increase contrast to create more dark areas
          // Power function pushes mid-tones towards 0
          value = Math.pow(value, CONFIG.contrast)

          // Infrared / Thermal Palette Mapping
          // 0.0 - 0.2: Black to Deep Purple
          // 0.2 - 0.4: Purple / Blue
          // 0.4 - 0.6: Red / Magenta
          // 0.6 - 0.8: Orange
          // 0.8 - 1.0: Yellow / White

          let r, g, b

          if (value < 0.2) {
            // Black to Dark Purple
            // #000000 to #1a0024
            const t = value / 0.2
            r = 26 * t
            g = 0
            b = 36 * t
          } else if (value < 0.4) {
            // Dark Purple to Blueish Purple
            // #1a0024 to #3c006b
            const t = (value - 0.2) / 0.2
            r = 26 + (60 - 26) * t
            g = 0
            b = 36 + (107 - 36) * t
          } else if (value < 0.6) {
            // Blueish Purple to Red
            // #3c006b to #ff0000
            const t = (value - 0.4) / 0.2
            r = 60 + (255 - 60) * t
            g = 0
            b = 107 * (1 - t)
          } else if (value < 0.8) {
            // Red to Yellow
            // #ff0000 to #ffff00
            const t = (value - 0.6) / 0.2
            r = 255
            g = 255 * t
            b = 0
          } else {
            // Yellow to White
            // #ffff00 to #ffffff
            const t = (value - 0.8) / 0.2
            r = 255
            g = 255
            b = 255 * t
          }

          const index = (x + y * w) * 4
          data[index] = Math.floor(r)
          data[index + 1] = Math.floor(g)
          data[index + 2] = Math.floor(b)
          data[index + 3] = 255 // Full opacity
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none absolute inset-0 -z-50 h-full w-full opacity-15'
      style={{
        imageRendering: 'pixelated',
      }}
    />
  )
}
