import { links } from '@/lib/links';
import { HoverUnderline } from './HoverUnderline';
import { LastUpdated } from './LastUpdated';

export function Footer() {
  return (
    <footer className='mt-16 flex flex-col justify-between gap-2 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row'>
      <ul className='flex gap-4'>
        {links.map((link) => (
          <li key={link.title}>
            <HoverUnderline>
              <a href={link.href} target='_blank'>
                {link.title}
              </a>
            </HoverUnderline>
          </li>
        ))}
      </ul>

      <LastUpdated />
    </footer>
  );
}
