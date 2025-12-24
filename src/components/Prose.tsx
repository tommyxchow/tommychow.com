interface ProseProps {
  children: React.ReactNode
}

export function Prose({ children }: ProseProps) {
  return (
    <div className='prose prose-zinc prose-invert prose-headings:text-foreground prose-h1:text-lg prose-h1:font-semibold prose-h2:text-lg prose-h2:font-semibold prose-a:text-foreground prose-a:no-underline sm:prose-h2:mt-8 max-w-none'>
      {children}
    </div>
  )
}
