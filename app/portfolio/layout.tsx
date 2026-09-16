import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// app/portfolio/page.tsx is a client component ("use client"), which cannot export metadata, so the
// portfolio index's title and description live here; without them it was served with the site-wide
// default. Case-study pages under /portfolio/[slug] set their own title, description and canonical in
// generateMetadata, which overrides every field below.
//
// The title is an object on purpose. A plain string title in a layout RESETS the root layout's
// "%s | Solenergy" template for every page below it, so the case studies lost their brand suffix.
// `template` re-declares it for /portfolio/[slug]; `absolute` keeps the index from being suffixed twice.
export const metadata: Metadata = {
  title: {
    absolute: "Portfolio: Solar & Generator Projects in Lebanon and Qatar | Solenergy",
    template: "%s | Solenergy",
  },
  description:
    "Browse Solenergy's installed work: off-grid, hybrid and grid-tie solar systems for homes, restaurants, churches, commercial and industrial sites across Lebanon and Qatar.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Solenergy Portfolio",
    description:
      "Solar energy, generator and energy management projects delivered by Solenergy across Lebanon and Qatar.",
    url: `${SITE.baseUrl}/portfolio`,
    images: [{ url: SITE.ogImage }],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
