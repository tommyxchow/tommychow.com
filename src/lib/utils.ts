import fs from 'fs';
import matter from 'gray-matter';
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

interface BlogPostFrontmatter {
  title: string;
  date: Date;
}

interface BlogPost extends BlogPostFrontmatter {
  id: string;
}

const blogPostsDirectory = path.resolve('src/app/blog/_posts');

export function getBlogPostFrontMatter(id: string): BlogPost {
  const mdxFilePath = path.resolve(blogPostsDirectory, id, 'page.mdx');

  const { data } = matter.read(mdxFilePath);

  return { id, ...(data as BlogPostFrontmatter) };
}

export function getAllBlogPostsFrontmatter(): BlogPost[] {
  const postFolders = fs.readdirSync(blogPostsDirectory);

  const allFrontmatter = postFolders.map((folderName) =>
    getBlogPostFrontMatter(folderName),
  );

  // Sort by newest.
  return allFrontmatter.sort((a, b) => b.date.getTime() - a.date.getTime());
}
