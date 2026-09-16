import type { Metadata } from "next";

// A QR destination, not a page for search.
export const metadata: Metadata = {
  title: "Leave a Review",
  description: "How did we do? Rate Solenergy and leave a short review of your project.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: false },
};

export { default } from "./ReviewClient";
