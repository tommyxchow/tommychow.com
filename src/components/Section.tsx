import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SectionHeadline } from './SectionHeadline'

interface SectionProps {
  title: string
  href: string
  children: React.ReactNode
}

export default function Section({ title, href, children }: SectionProps) {
  return (
    <section className='flex flex-col'>
      <Link
        className='mb-4 flex items-center justify-between py-2 transition-opacity hover:opacity-60'
        href={href}
      >
        <SectionHeadline>{title}</SectionHeadline>
        <ArrowRight className='text-muted-foreground h-4 w-4' />
      </Link>
      {children}
    </section>
  )
}
