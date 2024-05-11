'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HoverUnderline } from './HoverUnderline';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const path = usePathname();

  const routes = ['Home', 'Projects', 'Blog'] as const;

  return (
    <header className='sticky inset-0 z-50 flex justify-between gap-4 bg-gradient-to-b from-zinc-50 py-8 dark:from-zinc-950'>
      <nav className='flex grow justify-between gap-4 font-medium'>
        <ul className='flex gap-4'>
          {routes.map((route) => (
            <li key={route}>
              <Link href={`/${route === 'Home' ? '' : route.toLowerCase()}`}>
                <HoverUnderline
                  showUnderline={path?.includes(route.toLowerCase())}
                >
                  {route}
                </HoverUnderline>
              </Link>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
