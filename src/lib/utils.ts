import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export function formatDateString(date: string, showDays = false): string {
  const parsedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
    day: showDays ? 'numeric' : undefined,
  };

  return parsedDate.toLocaleDateString('default', options);
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

const blogPostsDirectory = path.resolve('src/app/blog/posts');

export function getBlogPost(id: string): BlogPost {
  const postFilePath = path.resolve(blogPostsDirectory, `${id}.mdx`);

  const { data, content: markdownContent } = matter.read(postFilePath);

  return {
    id,
    ...data,
    content: markdownContent,
  } as BlogPost;
}

export function getAllBlogPosts(): BlogPost[] {
  const postsDirectory = path.resolve(blogPostsDirectory);

  const posts = fs.readdirSync(postsDirectory).map((post) => {
    const id = post.replace(/\.mdx$/, '');

    return getBlogPost(id);
  });

  return posts;
}
