import { twMerge } from 'tailwind-merge';

export function Prose({
  className,
  children,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={twMerge(
        'prose prose-neutral max-w-none dark:prose-invert prose-headings:text-neutral-900 prose-a:text-neutral-900 dark:prose-headings:text-neutral-100 dark:prose-a:text-neutral-100',
        className,
      )}
    >
      {children}
    </div>
  );
}
