import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiMenu, FiMoon, FiX } from 'react-icons/fi';
import Skills from '../pages/skills';

const NavBar = () => {
  const router = useRouter();

  const routes = ['Skills', 'Projects', 'Thoughts', 'Bio'];

  return (
    <header className='sticky inset-0 flex flex-col border-b-2 border-black pb-1 backdrop-blur'>
      <div className='flex items-center justify-between px-4 pt-4'>
        <h1 className='text-4xl font-extrabold'>
          <Link href='/'>
            <a>{"Tommy Chow's"}</a>
          </Link>
        </h1>
        <FiMoon className='border border-black p-1 text-2xl' />
      </div>

      <nav className='flex snap-x snap-mandatory scroll-pl-4 items-center gap-4 overflow-auto pb-4'>
        <Link href='/'>
          <a
            className={`snap-start pl-4 text-4xl font-extrabold ${
              router.pathname == '/' ? undefined : 'text-neutral-400'
            }`}
          >
            Intro
          </a>
        </Link>
        {routes.map((route) => (
          <Link key={route} href={'/' + route.toLowerCase()}>
            <a
              className={`snap-start text-4xl font-extrabold last:pr-[calc(100%-4rem)]
                  ${
                    router.pathname == '/' + route.toLowerCase()
                      ? undefined
                      : 'text-neutral-400'
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
