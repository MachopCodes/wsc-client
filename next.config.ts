import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'], // Add the Cloudinary domain
  },
  trailingSlash: true,
};

export default nextConfig;
