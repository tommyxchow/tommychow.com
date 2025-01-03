'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi2';
import { twJoin } from 'tailwind-merge';
import { ThemeToggle } from './ThemeToggle';

const routeToHeader: Record<string, string> = {
  '/gallery': 'Gallery',
  '/blog': 'Blog',
  '/projects': 'Projects',
};

export function Header() {
  const path = usePathname();
  const isGalleryPage = path.includes('/gallery');
  const showBackButton = path !== '/';

  const header = Object.entries(routeToHeader).find(([route, _]) => {
    if (route === '/gallery') {
      return path.startsWith(route);
    }
    return path === route;
  })?.[1];

  return (
    <header
      className={twJoin(
        'sticky inset-0 z-50 -mx-4 flex items-center justify-between px-4 py-8',
        isGalleryPage
          ? 'bg-zinc-100 dark:bg-zinc-950'
          : 'bg-gradient-to-b from-zinc-100 dark:from-zinc-950',
      )}
    >
      <Link
        aria-label='Go back to home page'
        className={twJoin(
          'transition-opacity hover:opacity-50',
          showBackButton
            ? 'duration-300 ease-out animate-in fade-in'
            : 'invisible',
        )}
        href='/'
      >
        <HiArrowLeft />
      </Link>

      {header && (
        <h2 className='flex h-0 items-center text-lg font-medium duration-300 ease-out animate-in fade-in'>
          {header}
        </h2>
      )}

      <ThemeToggle />
    </header>
  );
}
