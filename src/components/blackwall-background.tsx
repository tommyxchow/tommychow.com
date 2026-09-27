'use client'

import { useEffect, useRef } from 'react'
import styles from './blackwall-background.module.css'
import { startBlackwall } from './blackwall-renderer'

export function BlackwallBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    return startBlackwall(canvas)
  }, [])

  return (
    <div className={styles.background} aria-hidden='true'>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
