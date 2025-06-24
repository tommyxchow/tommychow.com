interface HoverUnderlineProps {
  children: React.ReactNode;
}

export function HoverUnderline({ children }: HoverUnderlineProps) {
  return (
    <span className='border-b border-zinc-500/50 transition-colors hover:border-zinc-500 dark:border-zinc-400/50 dark:hover:border-zinc-400'>
      {children}
    </span>
  );
}
