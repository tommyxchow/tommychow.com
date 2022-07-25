import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Skills', 'Projects', 'Blog', 'About'];

  const { resolvedTheme, setTheme } = useTheme();

  // Wait until the component is mounted to set the theme.
  // This prevents a hydration error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='sticky inset-0 z-50 flex w-full justify-center overflow-auto bg-neutral-100 bg-opacity-80 backdrop-blur dark:bg-neutral-900 dark:bg-opacity-80'>
      <div className='flex w-full max-w-screen-md grid-cols-3 justify-between gap-2 p-4 sm:grid sm:gap-8 sm:p-8'>
        <nav>
          <Link href='/'>
            <a
              className={`w-fit whitespace-nowrap border-b border-lime-500 font-semibold transition dark:border-lime-400 ${
                router.pathname === '/'
                  ? undefined
                  : 'border-opacity-0 text-neutral-500 hover:border-opacity-50 dark:border-opacity-0 dark:text-neutral-400 dark:hover:border-opacity-50'
              }`}
            >
              Tommy Chow
            </a>
          </Link>
        </nav>

        <nav className='col-span-2 flex justify-between gap-2'>
          {routes.map((route) => (
            <Link key={route} href={'/' + route.toLowerCase()}>
              <a
                className={`border-b border-lime-500 font-semibold transition dark:border-lime-400 ${
                  router.pathname === '/' + route.toLowerCase()
                    ? undefined
                    : 'border-opacity-0 text-neutral-500 hover:border-opacity-50 dark:border-opacity-0 dark:text-neutral-400 dark:hover:border-opacity-50'
                }`}
              >
                {route}
              </a>
            </Link>
          ))}

          <button
            title={`Toggle ${
              resolvedTheme === 'dark' ? 'light mode' : 'dark mode'
            }`}
            className={`px-1${!mounted ? ' invisible' : ''}`}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && (resolvedTheme === 'dark' ? <FaSun /> : <FaMoon />)}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
