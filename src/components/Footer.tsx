import { source } from '@/lib/links';

export function Footer() {
  return (
    <footer className='flex py-8 text-sm text-neutral-600 dark:text-neutral-400'>
      <a className='hover:underline' href={source} target='_blank'>
        Last updated on Dec. 2023
      </a>
    </footer>
  );
}
