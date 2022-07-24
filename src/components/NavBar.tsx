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
    <header className='sticky inset-0 z-50 flex w-full justify-center overflow-auto bg-neutral-100 bg-opacity-20 backdrop-blur transition dark:bg-neutral-900 dark:bg-opacity-20'>
      <div className='flex w-full max-w-screen-md grid-cols-3 justify-between gap-2 p-4 sm:grid sm:gap-8 sm:p-8'>
        <nav>
          <Link href='/'>
            <a
              className={`w-fit whitespace-nowrap border-b border-lime-500 font-semibold transition dark:border-lime-400 ${
                router.pathname == '/'
                  ? undefined
                  : 'border-opacity-0 text-neutral-400 hover:border-opacity-50 dark:border-opacity-0 dark:text-neutral-500 dark:hover:border-opacity-50'
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
      </div>
    </header>
  );
};

export default NavBar;
