import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi2';

interface SectionProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

export default function Section({ title, href, children }: SectionProps) {
  return (
    <section className='flex flex-col gap-4'>
      <Link
        className='-mx-4 flex items-center justify-between border-b border-zinc-300 p-4 transition-[background] hover:bg-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-900'
        href={href}
      >
        <h2 className='text-lg font-semibold'>{title}</h2>
        <HiArrowRight />
      </Link>
      {children}
    </section>
  );
}
