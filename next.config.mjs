/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ── VERCEL IMAGE-TRANSFORMATION BUDGET ────────────────────────────────
    // Vercel bills one transformation per unique (source image, width, format,
    // quality). Next's DEFAULTS are 8 deviceSizes x 2 formats = up to 16 per
    // source image. Across ~10 Vercel projects sharing ONE free team that
    // exhausted the 5,000/month allowance on 2026-09-07 -- and past the cap
    // further transformations ERROR, i.e. broken images on a customer's site.
    //
    // 3 device widths + 2 small widths, ONE format => at most 5 per source
    // image instead of 16. Images stay optimized and responsive.
    deviceSizes: [640, 1080, 1920],
    imageSizes: [96, 256],
    // WebP only. AVIF compresses ~20% better but DOUBLES the variant matrix,
    // which is the wrong trade when the matrix is what overflowed.
    formats: ['image/webp'],
    // A year. An expired variant is regenerated AND re-counted, so a short TTL
    // quietly re-buys the same image every time it lapses.
    minimumCacheTTL: 31536000,
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
