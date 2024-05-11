import { LastUpdated } from './LastUpdated';

export function Footer() {
  return (
    <footer className='mt-16 flex justify-between gap-2 text-sm text-zinc-500 dark:text-zinc-400'>
      <LastUpdated />

      <p>NY & CA</p>
    </footer>
  );
}
