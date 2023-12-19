import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
  },
});

export default withMDX(nextConfig);
