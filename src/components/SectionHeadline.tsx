export function SectionHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='text-sm font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400'>
      {children}
    </h2>
  )
}
