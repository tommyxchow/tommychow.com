'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const path = usePathname();

  const routes = ['Projects', 'Blog', 'About'];

  return (
    <header className='sticky inset-0 z-50 flex justify-between gap-4 bg-gradient-to-b from-zinc-50 py-8 dark:from-zinc-950'>
      <nav className='flex grow justify-between gap-4 font-medium [font-variation-settings:"wdth"_112.5]'>
        <Link className='hover:underline' href='/'>
          <h1>Tommy Chow</h1>
        </Link>

        <div className='flex items-center gap-4 self-start'>
          <ul className='flex gap-4'>
            {routes.map((route) => (
              <li key={route}>
                <Link
                  className={twJoin(
                    path?.includes(route.toLowerCase())
                      ? 'underline'
                      : 'hover:underline',
                  )}
                  href={'/' + route.toLowerCase()}
                >
                  {route}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
