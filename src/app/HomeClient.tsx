'use client'

import { MOTION_EASING, narrowPageContainerClassName } from '@/lib/constants'
import { motion, useReducedMotion } from 'motion/react'
import { Children, type ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'

const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const containerClassName = twJoin(narrowPageContainerClassName, 'gap-6')

interface HomeClientProps {
  children: ReactNode
}

export function HomeClient({ children }: HomeClientProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={containerClassName}>{children}</div>
  }

  return (
    <motion.div
      initial='hidden'
      animate='show'
      transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
      className={containerClassName}
    >
      {/* eslint-disable-next-line @eslint-react/no-children-map -- RSC children are opaque; this preserves streamed children during hydration. */}
      {Children.map(children, (child) => (
        <motion.div
          variants={item}
          transition={{ duration: 0.6, ease: MOTION_EASING }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
