import { formatDate, getAllBlogPosts } from '@/lib/utils';
import Link from 'next/link';

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <h2>Blog</h2>

      {blogPosts.map((post) => (
        <article key={post.id}>
          <Link
            className='no-underline hover:underline'
            href={`/blog/${post.id}`}
          >
            <h3 className='mb-2'>{post.title}</h3>
          </Link>
          <time dateTime={post.date.toISOString()}>
            {formatDate(post.date, true)}
          </time>
        </article>
      ))}
    </>
  );
}
