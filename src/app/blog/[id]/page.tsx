import { Prose } from '@/components/Prose';
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
    description: frontmatter?.summary,
    openGraph: {
      url: `https://www.tommychow.com/blog/${params.id}`,
    },
  };
}

export default function BlogPost({ params }: PageParams) {
  try {
    const MDXPost = dynamic(() => import(`../_posts/${params.id}/page.mdx`));

    const blogPost = getBlogPostFrontMatter(params.id);

    return (
      <Prose>
        <h1 className='mb-2 mt-8'>{blogPost.title}</h1>
        <time
          className='text-lg font-medium text-zinc-500 dark:text-zinc-400'
          dateTime={blogPost.date.toISOString()}
        >
          {formatDate(blogPost.date, true)}
        </time>

        <div className='mt-16'>
          <MDXPost />
        </div>
      </Prose>
    );
  } catch {
    notFound();
  }
}
