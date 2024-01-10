import {
  getAllBlogPostsFrontmatter,
  getBlogPostFrontMatter,
} from '@/lib/server-utils';
import { formatDate } from '@/lib/utils';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

interface PageParams {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export function generateStaticParams() {
  return getAllBlogPostsFrontmatter().map((frontmatter) => ({
    id: frontmatter.id,
  }));
}

export function generateMetadata({ params }: PageParams): Metadata {
  const frontmatter = getAllBlogPostsFrontmatter().find(
    (frontmatter) => frontmatter.id === params.id,
  );

  return {
    title: `${frontmatter?.title} | Tommy Chow`,
    description: null,
  };
}

export default function BlogPost({ params }: PageParams) {
  try {
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
  } catch {
    notFound();
  }
}
