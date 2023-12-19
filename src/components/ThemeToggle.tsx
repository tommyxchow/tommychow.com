'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Wait until the component is mounted to set the theme.
  // This prevents a hydration error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <button
      aria-label={`Toggle ${
        resolvedTheme === 'dark' ? 'light mode' : 'dark mode'
      }`}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <HiSun /> : <HiMoon />}
    </button>
  ) : (
    <div className='w-4' />
  );
}
