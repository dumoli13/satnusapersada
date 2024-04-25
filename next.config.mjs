/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true,
      },
    ];
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
