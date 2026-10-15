// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only the API is private. Google renders pages with their CSS and JS, so /_next/, /static/
        // and *.js / *.json must stay crawlable.
        disallow: ["/api/"]
      }
    ],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
  };
}
