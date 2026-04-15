interface ProseProps {
  children: React.ReactNode
}

export function Prose({ children }: ProseProps) {
  return (
    <div className='prose prose-sm max-w-none prose-zinc prose-invert sm:prose-base prose-headings:text-foreground prose-h1:text-lg prose-h1:font-semibold prose-h2:text-lg prose-h2:font-semibold sm:prose-h2:mt-8 prose-a:text-foreground prose-a:no-underline'>
      {children}
    </div>
  )
}
