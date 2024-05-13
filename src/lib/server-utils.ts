import 'server-only';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface BlogPostFrontmatter {
  title: string;
  summary: string;
  date: Date;
}

export interface BlogPost extends BlogPostFrontmatter {
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
