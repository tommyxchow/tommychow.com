import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import CustomImage from './CustomImage';

export default function Header() {
  const router = useRouter();

  const { resolvedTheme, setTheme } = useTheme();

  // Wait until the component is mounted to set the theme.
  // This prevents a hydration error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={`w-full max-w-lg py-8 px-4 text-sm transition duration-500 sm:px-0 ${
        router.pathname !== '/' &&
        'opacity-80 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100'
      }`}
    >
      <div className='col-span-full col-start-2 flex justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <div className='relative z-0 h-8 w-8 shrink-0 overflow-hidden rounded-full shadow-md'>
            <CustomImage
              priority
              src='https://github.com/tommyxchow.png'
              alt='Portrait photo of me wearing my graduation gown with a flowery backdrop.'
            />
          </div>

          <p>Tommy Chow</p>
        </Link>

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
    </header>
  );
}
