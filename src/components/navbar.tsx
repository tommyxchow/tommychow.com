import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import { LinkInfo } from '../types';

const NavBar = ({ links }: NavBarProps) => {
  const router = useRouter();

  const routes = ['Skills', 'Projects', 'Blog', 'About'];

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted to set the theme.
  // This prevents a hydration error.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className='sticky inset-0 z-50 flex flex-col p-4 pb-0 backdrop-blur md:gap-2 lg:static lg:gap-4 lg:p-8 lg:py-32'>
      <div className='flex items-end justify-between'>
        <h1
          className={`text-4xl font-extrabold md:text-5xl lg:text-6xl ${
            router.pathname == '/'
              ? undefined
              : 'text-neutral-400 dark:text-neutral-500'
          }`}
        >
          <Link href='/'>
            <a>Tommy Chow</a>
          </Link>
        </h1>

        <button
          className='rounded-md border-2 p-1 sm:hidden'
          onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        >
          {theme == 'dark' ? <HiSun /> : <HiMoon />}
        </button>
      </div>

      <div className='flex justify-between'>
        <nav className='flex gap-2 overflow-auto pb-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:gap-8'>
          {routes.map((route) => (
            <Link key={route} href={'/' + route.toLowerCase()}>
              <a
                className={`text-2xl font-bold md:text-3xl lg:text-5xl ${
                  router.pathname == '/' + route.toLowerCase()
                    ? undefined
                    : 'text-neutral-400 dark:text-neutral-500'
                }`}
              >
                {route}
              </a>
            </Link>
          ))}
        </nav>

        <button
          className='hidden text-2xl font-bold text-neutral-400 dark:text-neutral-500 sm:block md:text-3xl lg:text-5xl'
          onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        >
          {theme == 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
};

interface NavBarProps {
  links: LinkInfo[];
}

export default NavBar;
