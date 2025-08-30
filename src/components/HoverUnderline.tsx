interface HoverUnderlineProps {
  children: React.ReactNode
}

export function HoverUnderline({ children }: HoverUnderlineProps) {
  return (
    <span className='border-b border-muted-foreground/50 transition-colors hover:border-muted-foreground'>
      {children}
    </span>
  )
}
