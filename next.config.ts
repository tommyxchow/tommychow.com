import { remarkCodeHike } from '@code-hike/mdx';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import remarkFrontmatter from 'remark-frontmatter';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
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
