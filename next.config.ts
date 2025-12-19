import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Desabilitar otimização de chunks no servidor para evitar bug do <Html>
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      };
    }
    return config;
  },
};

export default nextConfig;
