import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Skills', 'Projects', 'About'];

  const { resolvedTheme, setTheme } = useTheme();

  // Wait until the component is mounted to set the theme.
  // This prevents a hydration error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const underline = (
    <motion.div
      className='outline outline-1 outline-lime-500 dark:outline-lime-400'
      layoutId='underline'
    />
  );

  return (
    <header className='sticky inset-0 z-50 flex w-full justify-center overflow-auto bg-neutral-100 bg-opacity-80 backdrop-blur dark:bg-neutral-900 dark:bg-opacity-80'>
      <nav className='flex w-full max-w-screen-sm justify-between gap-2 p-4 font-medium sm:gap-8 md:py-8 md:px-0'>
        <div className='flex flex-col'>
          <Link href='/'>
            <a
              className={`whitespace-nowrap transition ${
                router.pathname !== '/' && 'opacity-60 hover:opacity-100'
              }`}
            >
              TC
            </a>
          </Link>
          {router.pathname === '/' && underline}
        </div>

        <div className='flex gap-4'>
          <ul className='flex gap-4'>
            {routes.map((route) => (
              <li key={route} className='flex flex-col'>
                <Link href={'/' + route.toLowerCase()}>
                  <a
                    className={`transition ${
                      !router.pathname.includes(route.toLowerCase()) &&
                      'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {route}
                  </a>
                </Link>

                {router.pathname.includes(route.toLowerCase()) && underline}
              </li>
            ))}
          </ul>

          {mounted && (
            <button
              title={`Toggle ${
                resolvedTheme === 'dark' ? 'light mode' : 'dark mode'
              }`}
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
            >
              {resolvedTheme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
