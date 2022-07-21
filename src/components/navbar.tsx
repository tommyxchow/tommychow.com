import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const NavBar = () => {
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
    <header className='z-50 flex flex-col gap-2 p-4 pb-0 backdrop-blur sm:p-8 md:gap-4 lg:static lg:p-16 lg:pt-32 lg:pb-16'>
      <div className='flex justify-between'>
        <h1>
          <Link href='/'>
            <a
              className={`border-b-2 border-lime-700 text-4xl font-extrabold transition dark:border-lime-400 md:text-5xl lg:text-6xl  ${
                router.pathname == '/'
                  ? undefined
                  : 'border-opacity-0 text-neutral-400 hover:border-opacity-50 dark:border-opacity-0 dark:text-neutral-500 dark:hover:border-opacity-50'
              }`}
            >
              Tommy Chow
            </a>
          </Link>
        </h1>

        <button
          className='text-2xl md:text-3xl lg:text-4xl'
          onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        >
          {theme == 'dark' ? <HiSun /> : <HiMoon />}
        </button>
      </div>

      <nav className='flex gap-2 overflow-auto pb-2 sm:overflow-visible lg:gap-8'>
        {routes.map((route) => (
          <Link key={route} href={'/' + route.toLowerCase()}>
            <a
              className={`border-b-2 border-lime-700 text-2xl font-bold transition dark:border-lime-400 md:text-3xl lg:text-5xl ${
                router.pathname == '/' + route.toLowerCase()
                  ? undefined
                  : 'border-opacity-0 text-neutral-400 hover:border-opacity-50 dark:border-opacity-0 dark:text-neutral-500 dark:hover:border-opacity-50'
              }`}
            >
              {route}
            </a>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default NavBar;
