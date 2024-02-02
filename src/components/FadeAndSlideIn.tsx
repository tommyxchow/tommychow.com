interface FadeInProps {
  children: React.ReactNode;
}

export function FadeAndSlideIn({ children }: FadeInProps) {
  return (
    <div className='duration-300 ease-out animate-in fade-in slide-in-from-top-2'>
      {children}
    </div>
  );
}
