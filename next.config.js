/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com'],
    unoptimized: true,
  },
  // Conditionally add output: 'export' only when building for GitHub Pages
  ...(process.env.GITHUB_PAGES === 'true' ? {
    output: 'export',
    // When using static export, we need to disable features that require a server
    images: {
      unoptimized: true,
    },
  } : {}),
};

module.exports = nextConfig;
