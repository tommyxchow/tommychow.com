import { LastUpdated } from './LastUpdated';

export function Footer() {
  return (
    <footer className='mt-16 flex items-center justify-center gap-2 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400'>
      <LastUpdated />
    </footer>
  );
}
