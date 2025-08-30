'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi2'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className='size-4' />

  const isDarkMode = resolvedTheme === 'dark'

  return (
    <Button
      variant='ghost'
      size='icon'
      className='animate-in fade-in duration-300 ease-out'
      aria-label={`Toggle ${isDarkMode ? 'light mode' : 'dark mode'}`}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {isDarkMode ? <HiSun /> : <HiMoon />}
    </Button>
  )
}
