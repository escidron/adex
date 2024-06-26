/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images : {
      domains : ['localhost','test.adexconnect.com','server.adexconnect.com'] // <== Domain name
    },
    experimental: {
      appDir: true,
      typedRoutes: true,
      serverComponentsExternalPackages: ["mysql2"],
      // runtime: "edge",
    },
    webpack: (config, { isServer }) => {
    
      // If client-side, don't polyfill `fs`
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
  
      return config;
    },
  }
  
  module.exports = nextConfig
