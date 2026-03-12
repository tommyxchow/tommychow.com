'use client'

import { MOTION_EASING } from '@/lib/constants'
import { motion } from 'motion/react'
import React from 'react'

const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function HomeClient({ children }: { children: React.ReactNode }) {
  // Convert children to array to apply staggered animations
  const childArray = React.Children.toArray(children)

  return (
    <motion.div
      initial='hidden'
      animate='show'
      transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
      className='mx-auto flex max-w-(--breakpoint-sm) flex-col gap-2 place-self-center px-4 py-20 md:px-0'
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
