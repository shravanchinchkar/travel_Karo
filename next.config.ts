import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Ignore TypeScript build errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint warnings
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Suppress warnings about unused exports
    config.stats = "errors-only";
    return config;
  },
};

export default nextConfig;
