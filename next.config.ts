import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // ⛔ Disable Turbopack completely
  },
};

export default nextConfig;
