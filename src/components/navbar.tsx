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
    <header className='sticky inset-0 flex flex-col p-4 pb-0 backdrop-blur'>
      <div className='flex items-center justify-between'>
        <h1
          className={`text-4xl font-extrabold ${
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
          className='rounded-md border-2 p-1'
          onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        >
          {theme == 'dark' ? <HiSun /> : <HiMoon />}
        </button>
      </div>

      <nav className='flex gap-2 overflow-auto pb-2'>
        {routes.map((route) => (
          <Link key={route} href={'/' + route.toLowerCase()}>
            <a
              className={`text-2xl font-bold ${
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
    </header>
  );
};

export default NavBar;
