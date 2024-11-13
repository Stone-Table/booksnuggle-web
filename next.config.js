/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES ? '/booksnuggle-web' : '',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "@google-cloud/storage": false,
      "formidable": false
    };
    return config;
  }
};

module.exports = nextConfig;
