interface ProseProps {
  children: React.ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    <div className='prose prose-zinc max-w-none dark:prose-invert prose-headings:text-zinc-900 prose-h1:text-xl prose-h1:font-bold prose-h2:mt-4 prose-h2:text-lg prose-h2:font-semibold prose-a:text-zinc-900 dark:prose-headings:text-zinc-100 dark:prose-a:text-zinc-100 sm:prose-h2:mt-8'>
      {children}
    </div>
  );
}
