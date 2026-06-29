'use client'

import { MOTION_EASING } from '@/lib/constants'
import { motion, useReducedMotion } from 'motion/react'
import React from 'react'

const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const containerClassName =
  'mx-auto flex max-w-md flex-col gap-6 place-self-center px-4 py-16 md:px-0'

interface HomeClientProps {
  children: React.ReactNode
}

export function HomeClient({ children }: HomeClientProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={containerClassName}>{children}</div>
  }

  const childArray = React.Children.toArray(children)

  return (
    <motion.div
      initial='hidden'
      animate='show'
      transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
      className={containerClassName}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          variants={item}
          transition={{ duration: 0.6, ease: MOTION_EASING }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
