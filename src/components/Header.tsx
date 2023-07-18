import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import NavBar from './NavBar';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  // Wait until the component is mounted to set the theme.
  // This prevents a hydration error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='sticky inset-0 z-50 w-full rounded-b-lg bg-gradient-to-b from-neutral-100 dark:from-black'>
      <div className='mt-4 w-full rounded-lg bg-neutral-200 p-4 shadow-md dark:bg-neutral-900 sm:mt-8'>
        <div className='flex justify-between'>
          <NavBar />
          {mounted && (
            <button
              aria-label={`Toggle ${
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
      </div>
    </header>
  );
}
