/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com'],
    unoptimized: true,
  },
  ...(process.env.GITHUB_PAGES === 'true' ? {
    output: 'export',
    images: {
      unoptimized: true,
    },
    webpack: (config, { isServer }) => {
      if (process.env.GITHUB_PAGES === 'true') {
        config.resolve.alias['@google-cloud/storage'] = false;
        config.resolve.alias['formidable'] = false;
      }
      return config;
    },
  } : {}),
};

module.exports = nextConfig;
