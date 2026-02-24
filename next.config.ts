import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://fullstack-120-project-group-1-backend.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
