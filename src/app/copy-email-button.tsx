'use client'

import { EMAIL } from '@/lib/links'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

const IDLE_LABEL = 'Email'
const SCRAMBLE_GLYPHS = '#%&*+=<>/[]{}01'
const FRAME_MS = 40
// Each letter settles this long after the one before it, left to right.
const SETTLE_STEP_MS = 45
const HOLD_MS = 1400

// Cycles every letter through random glyphs until it settles on the target,
// like a corrupted signal resolving. Returns a function that stops it.
function scramble(
  target: string,
  onFrame: (text: string) => void,
  onDone?: () => void,
) {
  const start = performance.now()
  const id = setInterval(() => {
    const elapsed = performance.now() - start
    const letters = Array.from(target, (letter, index) =>
      elapsed >= (index + 1) * SETTLE_STEP_MS
        ? letter
        : (SCRAMBLE_GLYPHS[
            Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)
          ] ?? letter),
    )
    onFrame(letters.join(''))
    if (elapsed >= target.length * SETTLE_STEP_MS) {
      clearInterval(id)
      onDone?.()
    }
  }, FRAME_MS)
  return () => clearInterval(id)
}

export function CopyEmailButton({ className }: { className: string }) {
  const [label, setLabel] = useState(IDLE_LABEL)
  const [status, setStatus] = useState('')
  const stopRef = useRef<(() => void) | null>(null)

  // Next keeps a route mounted but hidden when you navigate away, so stopping
  // the timers alone would leave a half-scrambled label for when you return.
  useEffect(
    () => () => {
      stopRef.current?.()
      stopRef.current = null
      setLabel(IDLE_LABEL)
      setStatus('')
    },
    [],
  )

  const show = (result: string) => {
    stopRef.current?.()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLabel(result)
      const hold = setTimeout(() => setLabel(IDLE_LABEL), HOLD_MS)
      stopRef.current = () => clearTimeout(hold)
      return
    }

    let hold: ReturnType<typeof setTimeout> | undefined
    let stopReturn: (() => void) | undefined
    const stopReveal = scramble(result, setLabel, () => {
      hold = setTimeout(() => {
        stopReturn = scramble(IDLE_LABEL, setLabel)
      }, HOLD_MS)
    })
    stopRef.current = () => {
      stopReveal()
      clearTimeout(hold)
      stopReturn?.()
    }
  }

  const copy = async () => {
    // Clear first so a repeat copy still reads out as a change.
    setStatus('')
    try {
      await navigator.clipboard.writeText(EMAIL)
      setStatus('Email copied')
      show('Copied')
    } catch {
      setStatus('Could not copy email')
      show('Failed')
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={() => void copy()}
        aria-label='Copy email'
        className={cn(className, label !== IDLE_LABEL && 'text-foreground')}
      >
        {/* Reserve the widest label so the letters swap in place. */}
        <span className='inline-grid text-start md:text-end'>
          <span
            aria-hidden='true'
            className='invisible col-start-1 row-start-1'
          >
            Copied
          </span>
          <span className='col-start-1 row-start-1'>{label}</span>
        </span>
      </button>
      <span role='status' className='sr-only'>
        {status}
      </span>
    </>
  )
}
