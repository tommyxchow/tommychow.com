import { cn } from '@/lib/utils'

interface ProseProps {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-sm max-w-none prose-zinc prose-invert prose-headings:text-foreground prose-h1:text-lg prose-h1:font-semibold prose-h2:text-lg prose-h2:font-semibold sm:prose-h2:mt-8 prose-a:text-foreground prose-a:no-underline',
        className,
      )}
    >
      {children}
    </div>
  )
}
