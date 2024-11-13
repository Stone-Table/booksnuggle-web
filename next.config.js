/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES ? '/booksnuggle-web' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
