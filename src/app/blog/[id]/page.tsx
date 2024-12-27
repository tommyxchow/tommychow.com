import { Prose } from '@/components/Prose';
import {
  getAllBlogPostsFrontmatter,
  getBlogPostFrontMatter,
} from '@/lib/server-utils';
import { formatDate } from '@/lib/utils';
import { type Metadata } from 'next';
import dynamic from 'next/dynamic';

export const dynamicParams = false;

interface PageParams {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllBlogPostsFrontmatter().map((frontmatter) => ({
    id: frontmatter.id,
  }));
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const params = await props.params;
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

export default async function BlogPost(props: PageParams) {
  const params = await props.params;
  const MDXPost = dynamic(() => import(`../_posts/${params.id}/page.mdx`));

  const blogPost = getBlogPostFrontMatter(params.id);

  return (
    <Prose>
      <h1 className='mb-2 mt-4'>{blogPost.title}</h1>
      <time
        className='text-zinc-500 dark:text-zinc-400'
        dateTime={blogPost.date.toISOString()}
      >
        {formatDate(blogPost.date, true)}
      </time>

      <div className='mt-16'>
        <MDXPost />
      </div>
    </Prose>
  );
}
