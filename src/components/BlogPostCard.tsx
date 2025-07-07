import type { BlogPost } from '@/lib/server-utils'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function BlogPostCard({ id, title, date }: BlogPost) {
  return (
    <Link href={`/blog/${id}`}>
      <article className='flex flex-col gap-1 py-2 font-medium transition-opacity hover:opacity-60 sm:flex-row sm:items-baseline sm:justify-between'>
        <h3>{title}</h3>
        <time
          className='text-sm text-zinc-500 dark:text-zinc-400'
          dateTime={date.toISOString()}
        >
          {formatDate(date, true)}
        </time>
      </article>
    </Link>
  )
}
