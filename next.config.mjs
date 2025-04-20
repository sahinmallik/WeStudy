/** @type {import('next').NextConfig} */
const nextConfig = {
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
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Client-side specific configurations
    if (!isServer) {
      // Configure fallbacks for node modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        fs: false,
        path: false,
        os: false,
      };

      // Add specific rule for crypto-js
      config.module.rules.push({
        test: /node_modules\/crypto-js/,
        sideEffects: false,
      });
    }

    return config;
  },
  // Added to help with dependency issues in production
  transpilePackages: ["@zegocloud/zego-uikit-prebuilt", "crypto-js"],
};

export default nextConfig;
