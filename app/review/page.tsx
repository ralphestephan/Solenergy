import type { Metadata } from "next";

// A QR destination, not a page for search.
export const metadata: Metadata = {
  title: "Leave a review \u00b7 Solenergy",
  description: "Tell Solenergy how it went.",
  robots: { index: false, follow: false },
};

export { default } from "./ReviewClient";
