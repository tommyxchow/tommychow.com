import { formatDateString, getAllBlogPosts } from '@/lib/utils';
import Link from 'next/link';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <>
      <h2>Blog</h2>

      {blogPosts.map((post) => (
        <article key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <time>{formatDateString(post.date, true)}</time>
        </article>
      ))}
    </>
  );
}
