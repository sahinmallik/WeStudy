/** @type {import('next').NextConfig} */
export default {
  experimental: {
    turbopack: true,
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
  webpack: async (config) => {
    // Custom Webpack configuration for Turbopack support
    const webpack = await import("webpack");

    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: await import("crypto-browserify"),
      stream: await import("stream-browserify"),
      assert: await import("assert"),
      buffer: await import("buffer"),
      process: await import("process/browser"),
    };

    config.plugins.push(
      new webpack.default.ProvidePlugin({
        process: ["process/browser"],
        Buffer: ["buffer", "Buffer"],
      })
    );

    return config;
  },
};
