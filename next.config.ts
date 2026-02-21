import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - Turbopack root configuration
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
