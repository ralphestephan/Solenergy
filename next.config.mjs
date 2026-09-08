/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ── THE OPTIMIZER IS OFF, AND THAT IS THE FIX ─────────────────────────
    // Every source image under public/ is now pre-compressed at authoring time
    // (max 1920px wide; photographs quantized, anything with alpha left
    // lossless) -- 161 MB of raw camera/render/AI exports down to 32 MB across
    // the two sites. At that size Vercel's optimizer buys close to nothing.
    //
    // What it CHARGES, though, is a transformation per unique
    // (source, width, format, quality). The free team's 5,000/month allowance
    // was exhausted on 2026-09-07, and past the cap Vercel does not degrade --
    // it returns 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED. Already-cached
    // variants kept serving, so the failure was INVISIBLE on the pages anyone
    // happened to check and total on the ones they did not: solenergypower.com
    // /solutions and via-vrgroup.com were both serving broken images to
    // customers, with the source files sitting there returning a healthy 200.
    //
    // Capping the variant matrix (which is what this block used to do) makes
    // the allowance last longer. It does not stop a live client site from
    // breaking when the allowance runs out anyway. Serving pre-sized files
    // directly removes the quota from the serving path altogether, which is
    // the only version of this that cannot fail on the 1st of a bad month.
    //
    // The trade is real and accepted: no per-device downscaling, so a phone
    // fetches the same file a laptop does. On a 32 MB library where the median
    // image is ~170 KB that is worth paying to keep the sites up.
    //
    // If this is ever turned back on, re-shrink first (scripts are in the
    // session notes) and keep deviceSizes/formats capped -- the settings below
    // are deliberately left in place for that day.
    unoptimized: true,
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
