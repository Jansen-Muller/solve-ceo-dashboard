/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Required: Skip type checking during build (types are checked in CI via tsc)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Required: Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
