import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';

export function formatDate(date: string | Date, showDays = false): string {
  const parsedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
    day: showDays ? 'numeric' : undefined,
  };

  return parsedDate.toLocaleDateString('default', options);
}

interface BlogPostMetadata {
  title: string;
  date: Date;
}

interface BlogPost extends BlogPostMetadata {
  id: string;
  content: React.ReactNode;
}

const blogPostsDirectory = path.resolve('src/app/blog/posts');

export async function getBlogPost(id: string): Promise<BlogPost> {
  const postFilePath = path.join(blogPostsDirectory, `${id}.mdx`);
  const source = fs.readFileSync(postFilePath, 'utf8');

  const { content, frontmatter } = await compileMDX<BlogPostMetadata>({
    source,
    options: { parseFrontmatter: true },
  });

  return { id, ...frontmatter, content };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const postFileNames = fs
    .readdirSync(blogPostsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'));

  const posts = postFileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    return getBlogPost(id);
  });

  const allPosts = await Promise.all(posts);

  // Sort by newest.
  return allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
