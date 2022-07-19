import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Skills', 'Projects', 'Blog', 'About'];

  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className='sticky inset-0 flex flex-col p-4 pb-0 backdrop-blur'>
      <div className='flex items-center justify-between'>
        <h1
          className={`text-4xl font-extrabold ${
            router.pathname == '/' ? undefined : 'text-gray-400'
          }`}
        >
          <Link href='/'>
            <a>Tommy Chow</a>
          </Link>
        </h1>

        <button
          className='rounded-md border-2 border-black p-1'
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <HiSun /> : <HiMoon />}
        </button>
      </div>

      <nav className='flex gap-2 overflow-auto pb-2'>
        {routes.map((route) => (
          <Link key={route} href={'/' + route.toLowerCase()}>
            <a
              className={`text-2xl font-bold ${
                router.pathname == '/' + route.toLowerCase()
                  ? undefined
                  : 'text-gray-400'
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
