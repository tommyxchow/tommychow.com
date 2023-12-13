'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  const path = usePathname();

  const routes = ['Projects', 'Blog', 'About'];

  return (
    <header className='sticky inset-0 z-50 mt-8 flex justify-between gap-4 bg-gradient-to-b from-neutral-950 py-4'>
      <nav className='flex grow justify-between gap-4 font-medium'>
        <Link href='/'>
          <h1>Tommy Chow</h1>
        </Link>

        <ul className='flex gap-4'>
          {routes.map((route) => (
            <li key={route}>
              <Link
                className={twJoin(
                  path?.includes(route.toLowerCase()) && 'underline',
                )}
                href={'/' + route.toLowerCase()}
              >
                {route}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ThemeToggle />
    </header>
  );
}
