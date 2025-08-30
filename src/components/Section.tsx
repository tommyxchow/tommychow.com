import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi2'
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
        className='flex items-center justify-between py-2 transition-opacity hover:opacity-60 mb-4'
        href={href}
      >
        <SectionHeadline>{title}</SectionHeadline>
        <HiArrowRight className='text-muted-foreground' />
      </Link>
      {children}
    </section>
  )
}
