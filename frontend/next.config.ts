// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Không set output: "export" nếu muốn dùng API routes / route handlers
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
    domains: ["himpaper.vn", "inkzinh.netlify.app"],
  },
};

export default nextConfig;
