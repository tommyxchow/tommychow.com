import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi2'

interface SectionProps {
  title: string
  href: string
  children: React.ReactNode
}

export default function Section({ title, href, children }: SectionProps) {
  return (
    <section className='flex flex-col'>
      <Link
        className='flex items-center justify-between py-2 text-zinc-500 transition-opacity hover:opacity-60 dark:text-zinc-400'
        href={href}
      >
        <h2 className='text-sm font-semibold tracking-wider uppercase'>
          {title}
        </h2>
        <HiArrowRight />
      </Link>
      {children}
    </section>
  )
}
