// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";
import BackToTopFab from "@/components/ui/BackToTopFab";
import Header from "@/components/Header";

import GoogleAnalytics from '@/components/GoogleAnalytics';
import { ga4Ids } from '@/lib/tenant-brand';
import CookieConsent from '@/components/CookieConsent';
import { getTenantBrand } from "@/lib/tenant-brand";

const poppins = Poppins({ subsets: ["latin"], display: "swap", variable: "--font-poppins", weight: ["700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: SITE.name,
    template: `%s | Solenergy`,
  },
  description: SITE.description,
  icons: {
    icon: "/favicon.ico",       // default favicon
    shortcut: "/favicon.ico",   // legacy browsers
    apple: "/favicon.ico",      // Apple touch icon
  },
  keywords: Array.from(SITE.keywords),
  openGraph: {
    type: "website",
    url: SITE.baseUrl,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  // Twitter metadata disabled until further notice
  // twitter: {
  //   card: "summary_large_image",
  //   site: SITE.socials.twitter,
  //   creator: SITE.socials.twitter,
  //   title: SITE.name,
  //   description: SITE.description,
  //   images: [SITE.ogImage],
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: SITE.baseUrl },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Tracking IDs come from the org's BDI settings (settings.brand.tracking), and BOTH GA4
  // properties fire: BDI's own (ga4_measurement_id, G-433WQHXDBQ), which fills BDI's Analytics
  // page, and Solenergy's own (client_ga4_measurement_id, G-NF65BFYXVT), which holds the site's
  // history since January and keeps receiving every visit. G-NF65BFYXVT was verified on
  // 2026-09-23 to be on none of the properties under BDI's GA account — it is Solenergy's — and
  // stays the fallback, so analytics never blanks if the settings fetch fails.
  // Neither GA4 nor the Meta Pixel loads until the visitor consents (components/CookieConsent.tsx).
  const brand = await getTenantBrand();
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="google-site-verification" content="aSFML--c4EYr4rrZliksliZ-zE69910E17yB9C_xUlw" />
        <GoogleAnalytics gaIds={ga4Ids(brand).length ? ga4Ids(brand) : ["G-NF65BFYXVT"]} pixelId={brand.metaPixelId} />
      </head>
      <body className="min-h-screen text-zinc-800 antialiased overflow-x-hidden">

        <Header />
        <main className="w-full overflow-x-clip">{children}</main>
        <BackToTopFab insetClass="bottom-6 right-6 sm:bottom-8 sm:right-8" size={56} />
        <SiteFooter contact={brand.contact} />
        <CookieConsent />
      </body>
    </html>
  );
}
