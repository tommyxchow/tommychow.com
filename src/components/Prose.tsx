interface ProseProps {
  children: React.ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    <div className='prose prose-zinc max-w-none text-pretty dark:prose-invert prose-headings:text-zinc-900 prose-headings:[font-variation-settings:"wdth"_112.5] prose-h2:mt-4 prose-a:text-zinc-900 dark:prose-headings:text-zinc-100 dark:prose-a:text-zinc-100 sm:prose-h2:mt-8'>
      {children}
    </div>
  );
}
