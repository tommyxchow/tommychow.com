interface HoverUnderlineProps {
  children: React.ReactNode
}

export function HoverUnderline({ children }: HoverUnderlineProps) {
  return (
    <span className='border-muted-foreground/50 hover:border-muted-foreground border-b transition-colors'>
      {children}
    </span>
  )
}
