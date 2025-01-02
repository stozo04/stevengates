import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['stevengates.io'], // Update this with domains you're loading images from
  },
  async headers() {
    return [
      {
        source: '/daily-log', // Protect this route
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow', // Prevent search engines from indexing or following this page
          },
        ],
      },
    ];
  },
};

export default nextConfig;
