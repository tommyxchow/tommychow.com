import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiMenu, FiMoon, FiX } from 'react-icons/fi';
import Skills from '../pages/skills';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Skills', 'Projects', 'Thoughts', 'Bio'];

  return (
    <header className='sticky inset-0 flex flex-col pb-0'>
      <div className='flex items-center justify-between bg-white p-4 pb-0'>
        <h1
          className={`text-4xl font-extrabold ${
            router.pathname == '/' ? undefined : 'text-gray-400'
          }`}
        >
          <Link href='/'>
            <a>Tommy Chow</a>
          </Link>
        </h1>
        {/* <FiMoon className='text-2xl' /> */}
      </div>

      <nav className='flex items-end gap-2 overflow-auto bg-white px-4 pb-2'>
        {routes.map((route) => (
          <Link key={route} href={'/' + route.toLowerCase()}>
            <a
              className={`w-fit text-2xl font-bold ${
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
      {/* <div className='sticky inset-0 h-12 bg-gradient-to-b from-white to-transparent'></div> */}
    </header>
  );
};

export default NavBar;
