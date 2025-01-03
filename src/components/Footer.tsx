'use client';

import { usePathname } from 'next/navigation';
import { LastUpdated } from './LastUpdated';

export function Footer() {
  const path = usePathname();

  if (path !== '/') {
    return null;
  }

  return (
    <footer className='mt-8 flex justify-center text-sm text-zinc-400 dark:text-zinc-500'>
      <LastUpdated />
    </footer>
  );
}
