import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// app/contact/page.tsx is a client component ("use client"), which cannot export metadata, so the
// contact page's own title and description live here. They used to sit in page.metadata.tsx, a file
// name Next.js never reads: the page was served with the site-wide default title and description.
export const metadata: Metadata = {
  title: "Contact Us: Free Solar & Generator Consultation",
  description:
    "Request a free solar consultation from Solenergy. Call, WhatsApp or email our Baabda, Lebanon and Lusail, Qatar offices, or send your project details and budget online.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Solenergy for a Free Solar Consultation",
    description:
      "Tell us about your solar, backup generator, battery storage or energy management project and our team will get back to you.",
    url: `${SITE.baseUrl}/contact`,
    images: [{ url: SITE.ogImage }],
  },
  other: {
    keywords:
      "solar energy lebanon, solar panels, backup generators, hybrid solar systems, energy storage, battery systems, volvo penta generators, energy management, smart manufacturing, renewable energy lebanon",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
