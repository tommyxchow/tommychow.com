import { twMerge } from 'tailwind-merge';

export function Prose({
  className,
  children,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={twMerge(
        'prose prose-zinc max-w-none dark:prose-invert prose-headings:text-zinc-900 prose-a:text-zinc-900 dark:prose-headings:text-zinc-100 dark:prose-a:text-zinc-100',
        className,
      )}
    >
      {children}
    </div>
  );
}
