import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static export
  trailingSlash: true, // Ensure trailing slashes for all paths
  images: {
    unoptimized: true, // Disable image optimization (GitHub Pages doesn't support this)
  },
  basePath: "https://github.com/MachopCodes/wsc-client.git", 
};

export default nextConfig;
