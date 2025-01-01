'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi2';
import { twJoin } from 'tailwind-merge';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const path = usePathname();
  const showBackButton = path.includes('/blog') || path.includes('/gallery');

  return (
    <header className='sticky inset-0 z-50 flex justify-between bg-gradient-to-b from-zinc-100 py-8 dark:from-zinc-950'>
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

      <ThemeToggle />
    </header>
  );
}
