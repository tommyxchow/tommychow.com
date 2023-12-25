import { remarkCodeHike } from '@code-hike/mdx';
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [
        remarkCodeHike,
        {
          theme: 'github-from-css',
          lineNumbers: true,
          showCopyButton: true,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
