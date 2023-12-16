import { formatDate, getAllBlogPosts, getBlogPost } from '@/lib/utils';

export async function generateStaticParams() {
  const blogPosts = await getAllBlogPosts();

  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const blogPost = await getBlogPost(params.id);

  return (
    <>
      <h2>{blogPost.title}</h2>
      <time>{formatDate(blogPost.date, true)}</time>

      {blogPost.content}
    </>
  );
}
