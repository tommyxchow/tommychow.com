import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import Time from './Time';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  // Wait until the component is mounted to set the theme.
  // This prevents a hydration error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='grid-cols-4 gap-8 py-8 px-4 font-medium uppercase tracking-wider sm:grid md:px-0'>
      <p className='place-self-end'>New York, NY</p>

      <div className='col-span-full col-start-2 flex justify-between'>
        <Time />

        {mounted && (
          <button
            title={`Toggle ${
              resolvedTheme === 'dark' ? 'light mode' : 'dark mode'
            }`}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {resolvedTheme === 'dark' ? <HiSun /> : <HiMoon />}
          </button>
        )}
      </div>
    </header>
  );
}
