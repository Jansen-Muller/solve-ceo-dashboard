/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',
  poweredByHeader: false,
};

module.exports = nextConfig;
