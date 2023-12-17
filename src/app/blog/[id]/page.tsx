import {
  formatDate,
  getAllBlogPostsFrontmatter,
  getBlogPostFrontMatter,
} from '@/lib/utils';
import dynamic from 'next/dynamic';

export function generateStaticParams() {
  const allFrontmatter = getAllBlogPostsFrontmatter();

  return allFrontmatter.map((frontmatter) => ({
    id: frontmatter.id,
  }));
}

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
