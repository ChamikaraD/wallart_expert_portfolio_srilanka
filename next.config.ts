import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Let other devices on the local network (e.g. a phone at http://172.20.10.5:3000) load
  // dev scripts. Dev-only; has no effect on production builds.
  allowedDevOrigins: ["172.20.10.*", "192.168.*.*", "10.*.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Temporary development placeholders are served from Unsplash.
    // Remove this pattern once the company's own photographs live in /public/images.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
