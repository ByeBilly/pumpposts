import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // @ts-ignore
    ignoreBuildErrors: true,
  },
  eslint: {
    // @ts-ignore
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
