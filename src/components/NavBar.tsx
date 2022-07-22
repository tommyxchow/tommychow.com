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
    <header className='sticky inset-0 z-50 flex items-center justify-between gap-2 p-4 backdrop-blur sm:p-8 md:gap-4'>
      <div className='flex justify-between'>
        <Link href='/'>
          <a
            className={`border-b border-lime-500 font-semibold transition dark:border-lime-400 ${
              router.pathname == '/'
                ? undefined
                : 'border-opacity-0 text-neutral-400 hover:border-opacity-50 dark:border-opacity-0 dark:text-neutral-500 dark:hover:border-opacity-50'
            }`}
          >
            Tommy Chow
          </a>
        </Link>
      </div>

      <nav className='flex gap-2 overflow-auto sm:overflow-visible'>
        {routes.map((route) => (
          <Link key={route} href={'/' + route.toLowerCase()}>
            <a
              className={`border-b border-lime-500 font-semibold transition dark:border-lime-400 ${
                router.pathname == '/' + route.toLowerCase()
                  ? undefined
                  : 'border-opacity-0 text-neutral-400 hover:border-opacity-50 dark:border-opacity-0 dark:text-neutral-500 dark:hover:border-opacity-50'
              }`}
            >
              {route}
            </a>
          </Link>
        ))}

        <button
          className='px-1'
          onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        >
          {theme == 'dark' ? <HiSun /> : <HiMoon />}
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
