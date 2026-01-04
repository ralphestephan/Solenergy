// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import solutions from "@/data/solutions";
import { insights } from "@/data/insights";

const staticPaths = [
  { path: "", priority: 1.0 },
  { path: "/solutions", priority: 0.9 },
  { path: "/portfolio", priority: 0.9 },
  { path: "/homedome", priority: 0.9 },
  { path: "/shop", priority: 0.8 },
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

  const projectPages = [
    { slug: "commercial-solar-beirut" },
    { slug: "industrial-generator-setup" },
    { slug: "smart-factory-integration" },
    { slug: "residential-solar-system" },
    { slug: "hybrid-power-hotel" },
    { slug: "commercial-solar-farm" },
    { slug: "backup-generator-hospital" },
    { slug: "residential-solar-battery" },
    { slug: "commercial-energy-management" },
    { slug: "industrial-solar-installation" },
    { slug: "residential-off-grid" },
    { slug: "generator-maintenance-upgrade" },
  ].map((p) => ({
    url: `${SITE.baseUrl}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...base, ...solutionPages, ...insightPages, ...projectPages];
}
