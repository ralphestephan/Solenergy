/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [
  { protocol: 'https', hostname: 'cdn.shopify.com' },
  { protocol: 'https', hostname: 'shopify-assets.shopifycdn.com' },
  ],
  },
  async redirects() {
    return [
      {
        source: '/ecommerce',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/ecommerce/:path*',
        destination: '/shop/:path*',
        permanent: true,
      },
    ]
  },
  };


export default nextConfig;
