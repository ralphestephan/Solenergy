// app/robots.ts: BDI's shared robots rule (kit v2 core/structure.ts): every search and AI crawler named, each with this site's own private paths, then everyone else.
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Each crawler is named in its own group: a crawler named in a group reads only that group. */
const CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "*",
];
/** This site's private paths, in every group. */
const DISALLOW: string[] = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", ...(DISALLOW.length ? { disallow: DISALLOW } : {}) })),
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
  };
}
