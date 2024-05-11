import type { BlogPost } from '@/lib/server-utils';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function BlogPostCard({ id, title, date }: BlogPost) {
  return (
    <article>
      <Link className='no-underline hover:underline' href={`/blog/${id}`}>
        <h3 className='mb-2'>{title}</h3>
      </Link>
      <time dateTime={date.toISOString()}>{formatDate(date, true)}</time>
    </article>
  );
}
