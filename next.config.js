/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com'],
    unoptimized: true,
  },
  ...(process.env.GITHUB_PAGES === 'true' ? {
    output: 'export',
    basePath: '/booksnuggle-web',
    images: {
      unoptimized: true,
    }
  } : {}),
};

module.exports = nextConfig;
