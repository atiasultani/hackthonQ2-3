/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      }, {
        protocol: 'https',
        hostname: 'template1-neon-nu.vercel.app/api/products',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
