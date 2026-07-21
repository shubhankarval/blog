import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // You can specify a more restrictive pathname if needed
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/umami.js',
        destination: 'https://umami.shubhankarval.dev/umami.js',
      },
      {
        source: '/api/send',
        destination: 'https://umami.shubhankarval.dev/api/send',
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter'],
    rehypePlugins: ['rehype-mdx-code-props', 'rehype-unwrap-images'],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
