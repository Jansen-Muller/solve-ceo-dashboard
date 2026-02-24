/** @type {import('next').NextConfig} */

// Polyfill __dirname for ESM environments
if (typeof global !== 'undefined' && !global.__dirname) {
  global.__dirname = '/';
}

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
      // Polyfill __dirname for ESM/Edge runtime compatibility
      config.output.globalObject = 'globalThis';
    }
    return config;
  },
};

module.exports = nextConfig;
