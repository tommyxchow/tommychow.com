import { source } from '@/lib/links';

export function Footer() {
  return (
    <footer className='flex justify-end py-8 text-sm text-neutral-600 dark:text-neutral-400 md:px-0'>
      <a
        className='underline-offset-2 hover:underline'
        href={source}
        target='_blank'
      >
        Last updated Oct. 2023
      </a>
    </footer>
  );
}
