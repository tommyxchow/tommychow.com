import BlogPostCard from '@/components/BlogPostCard'
import { getAllBlogPostsFrontmatter } from '@/lib/server-utils'

export default async function BlogPage() {
  const blogPosts = await getAllBlogPostsFrontmatter()

  return (
    <ul className='flex flex-col gap-2'>
      {blogPosts.map((post) => (
        <li key={post.id}>
          <BlogPostCard {...post} />
        </li>
      ))}
    </ul>
  )
}
