// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*",
          "/_next/*",
          "/static/*",
          "/*.js$",
          "/*.json$"
        ]
      }
    ],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
  };
}
