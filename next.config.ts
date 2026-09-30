import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BOOKING_ENABLED: process.env.BOOKING_ENABLED,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
