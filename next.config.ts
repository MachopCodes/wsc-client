import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static export
  trailingSlash: true, // Ensure trailing slashes for all paths
  images: {
    unoptimized: true, // Disable image optimization (GitHub Pages doesn't support this)
  },
  basePath: "/wsc-client", 
};

export default nextConfig;
