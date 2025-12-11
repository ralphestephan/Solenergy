import { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Solenergy for Solar Energy & Generator Solutions",
  description:
    "Get expert consultation for solar energy systems, backup generators, and energy management solutions. We specialize in hybrid solar installations, battery storage, and Industry 4.0 integration in Lebanon.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us for Professional Solar & Energy Solutions | Solenergy",
    description:
      "Transform your energy infrastructure with our solar and backup power expertise. From solar panels to complete hybrid systems, we provide tailored energy independence solutions.",
    url: `${SITE.baseUrl}/contact`,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image", site: "@solenergy" },
  other: {
    keywords: "solar energy lebanon, solar panels, backup generators, hybrid solar systems, energy storage, battery systems, volvo penta generators, energy management, industry 4.0, renewable energy lebanon",
  },
};