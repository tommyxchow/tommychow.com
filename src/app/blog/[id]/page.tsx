import { formatDate, getBlogPostFrontMatter } from '@/lib/utils';
import dynamic from 'next/dynamic';

// export async function generateStaticParams() {
//   const blogPosts = await getAllBlogPosts();

//   return blogPosts.map((post) => ({
//     id: post.id,
//   }));
// }

export default function BlogPost({ params }: { params: { id: string } }) {
  const MDXPost = dynamic(() => import(`../_posts/${params.id}/page.mdx`));

  const blogPost = getBlogPostFrontMatter(params.id);

  return (
    <>
      <h2 className='mb-2'>{blogPost.title}</h2>
      <time dateTime={blogPost.date.toISOString()}>
        {formatDate(blogPost.date, true)}
      </time>

      <MDXPost />
    </>
  );
}
