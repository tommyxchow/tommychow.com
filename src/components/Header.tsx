'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi2';
import { twJoin } from 'tailwind-merge';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const path = usePathname();
  const isGalleryPage = path.includes('/gallery');
  const showBackButton = path.includes('/blog') || isGalleryPage;

  return (
    <header
      className={twJoin(
        'sticky inset-0 z-50 flex justify-between py-8',
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

      <ThemeToggle />
    </header>
  );
}
