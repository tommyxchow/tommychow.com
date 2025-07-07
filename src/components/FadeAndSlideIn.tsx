interface FadeInProps {
  children: React.ReactNode
}

export function FadeAndSlideIn({ children }: FadeInProps) {
  return (
    <div className='animate-in fade-in slide-in-from-top-2 duration-300 ease-out'>
      {children}
    </div>
  )
}
