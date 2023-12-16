import { formatDateString, getAllBlogPosts, getBlogPost } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';

export function generateStaticParams() {
  const blogPosts = getAllBlogPosts();

  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const blogPost = getBlogPost(id);

  return (
    <>
      <h2>{blogPost.title}</h2>
      <time>{formatDateString(blogPost.date, true)}</time>

      <MDXRemote source={blogPost.content} />
    </>
  );
}
