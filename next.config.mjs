/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: true, // enable Turbopack for development
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
