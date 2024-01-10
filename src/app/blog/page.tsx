import { getAllBlogPostsFrontmatter } from '@/lib/server-utils';
import { formatDate } from '@/lib/utils';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Tommy Chow',
};

export default function BlogPage() {
  const blogPosts = getAllBlogPostsFrontmatter();

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
