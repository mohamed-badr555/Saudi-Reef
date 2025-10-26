import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['recharts', 'react-apexcharts', 'react-icons'],
  },
};

export default nextConfig;
