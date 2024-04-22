import { twJoin } from 'tailwind-merge';

interface HoverUnderlineProps {
  showUnderline?: boolean;
  children: React.ReactNode;
}

export function HoverUnderline({
  showUnderline,
  children,
}: HoverUnderlineProps) {
  return (
    <span
      className={twJoin(
        'border-b border-zinc-900 transition-colors hover:border-opacity-100 dark:border-zinc-50 dark:hover:border-opacity-100',
        showUnderline
          ? 'border-opacity-100'
          : 'border-opacity-0 dark:border-opacity-0',
      )}
    >
      {children}
    </span>
  );
}
