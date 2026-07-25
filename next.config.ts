import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/games',
        destination: '/topics/games',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
