/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true,
      typedRoutes: true,
      serverComponentsExternalPackages: ["mysql2"],
      // runtime: "edge",
    },
  }
  
  module.exports = nextConfig
