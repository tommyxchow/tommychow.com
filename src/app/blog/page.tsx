import BlogPostCard from '@/components/BlogPostCard';
import { getAllBlogPostsFrontmatter } from '@/lib/server-utils';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Tommy Chow',
};

export default function BlogPage() {
  const blogPosts = getAllBlogPostsFrontmatter();

  return (
    <>
      <h2>Blog</h2>

      {blogPosts.map((post) => (
        <BlogPostCard key={post.id} {...post} />
      ))}
    </>
  );
}
