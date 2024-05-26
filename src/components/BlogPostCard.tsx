import type { BlogPost } from '@/lib/server-utils';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function BlogPostCard({ id, title, date }: BlogPost) {
  return (
    <Link href={`/blog/${id}`}>
      <article className='-mx-4 flex flex-col gap-2 p-4 transition-[background] hover:bg-zinc-200 dark:hover:bg-zinc-900 sm:rounded-lg'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <time
          className='text-zinc-500 dark:text-zinc-400'
          dateTime={date.toISOString()}
        >
          {formatDate(date, true)}
        </time>
      </article>
    </Link>
  );
}
