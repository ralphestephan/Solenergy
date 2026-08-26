// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import solutions from "@/data/solutions";
import { insights } from "@/data/insights";
import { projects } from "@/data/projects";

// Every path here must be a route that exists in app/. /homedome and /shop were
// listed for months and have never been built — both answered 404 to Google and
// to anyone who followed them. Removed rather than stubbed: an empty page is a
// worse answer than no page. If either is wanted, build the route and add it back.
const staticPaths = [
  { path: "", priority: 1.0 },
  { path: "/solutions", priority: 0.9 },
  { path: "/portfolio", priority: 0.9 },
  { path: "/insights", priority: 0.8 },
  { path: "/glossary", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/faqs", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const base = staticPaths.map((p) => ({
    url: `${SITE.baseUrl}${p.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p.priority,
  }));

  const solutionPages = solutions.map((s) => ({
    url: `${SITE.baseUrl}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const insightPages = insights ? insights.map((i) => ({
    url: `${SITE.baseUrl}/insights/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })) : [];

  // Derived from the same data that app/portfolio/[slug] builds from, exactly as
  // solutions and insights above already are. It used to be a hand-written list of
  // twelve slugs that no longer matched a single real project — Solenergy's actual
  // work is named after the sites it was installed on, so every one of those twelve
  // 404'd while the twelve real case studies were invisible to search.
  const projectPages = projects.map((p) => ({
    url: `${SITE.baseUrl}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...base, ...solutionPages, ...insightPages, ...projectPages];
}
