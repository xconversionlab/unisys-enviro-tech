import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  async redirects() {
    // Retired placeholder routes
    return [
      { source: "/projects", destination: "/services", permanent: false },
      { source: "/gallery", destination: "/services", permanent: false },
    ];
  },
};

export default nextConfig;
