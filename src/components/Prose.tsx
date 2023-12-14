import { twMerge } from 'tailwind-merge';

export function Prose({
  className,
  children,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={twMerge(
        'prose prose-neutral max-w-none dark:prose-invert prose-headings:uppercase',
        className,
      )}
    >
      {children}
    </div>
  );
}
