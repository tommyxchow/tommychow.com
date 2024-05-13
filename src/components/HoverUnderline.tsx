interface HoverUnderlineProps {
  children: React.ReactNode;
}

export function HoverUnderline({ children }: HoverUnderlineProps) {
  return (
    <span className='border-b border-zinc-500 border-opacity-50 transition-[border] hover:border-opacity-100 dark:border-zinc-400 dark:border-opacity-50 dark:hover:border-opacity-100'>
      {children}
    </span>
  );
}
