// lib/portfolio.ts
//
// The portfolio, read from BDI.
//
// Solenergy edits its projects in the BDI dashboard (Website > Portfolio): each
// project is filed under a category (Solar Systems, Generators, ...) and carries
// its card text, its "Project Overview", location, year, facts (Capacity, System
// type) and photos. This module reads what is PUBLISHED through the
// anon-executable `get_tenant_portfolio` RPC -- the same call and the same shape
// Via Interiors' site reads -- and maps it onto the `Project` shape the pages
// have always rendered (data/projects.ts), so the markup does not change.
//
// SERVER ONLY. Call it from server components, generateStaticParams,
// generateMetadata and app/sitemap.ts; client components receive the result as
// props. (Only `import type` from a client file.)
//
// FRESHNESS: the fetch is cached for 60 s under the `portfolio` tag, so an edit
// in BDI shows on the next ISR regeneration of /portfolio, /portfolio/<slug> and
// the home page's Feature Works, with no redeploy.
//
// FALLBACK: if the call fails, times out (5 s), or BDI holds no published project,
// the pages render the hard-coded portfolio they shipped with (data/projects.ts).
// `source` says which one rendered; the pages put it on their root element as
// data-portfolio-source="bdi" | "fallback", so anyone can check which source a
// live page came from.
//
// ORDER: BDI numbers a category's projects 10, 20, 30... (Move up/down renumbers
// them within the category). The grid lists every project by that number across
// categories, ties going to the earlier category, so it keeps the order the site
// has always shown (the old ids x 10) and a move in BDI moves the card. A project
// marked Featured in BDI comes first.
//
// SHAPE returned by get_tenant_portfolio(p_org_id uuid):
//   { "collections": [ { id, slug, name, tagline, description, cover_url,
//       image_urls[], sort_order,
//       "items": [ { id, slug, title, summary, body, location, year, client_label,
//         attributes: [{label,value}], sections: [{heading,text}], features[],
//         image_urls[], video_url, is_featured, sort_order } ] } ] }
// Published collections and published items only, already ordered.

import { cache } from "react";
import { projects as FALLBACK_PROJECTS, type Project } from "@/data/projects";

export type PortfolioSource = "bdi" | "fallback";

export type ProjectFact = { label: string; value: string };
export type ProjectSection = { heading: string; text: string };

/** One project as the pages render it: the data/projects.ts shape, with the
 *  category and system type widened to whatever BDI holds. */
export type PortfolioProject = Omit<Project, "category" | "systemType"> & {
  /** The BDI category's name. */
  category: string;
  systemType?: string;
  /** Facts beyond Capacity and System type, shown in the sidebar after Year. */
  extraFacts: ProjectFact[];
  /** Headed paragraphs, shown under the Project Overview. */
  sections: ProjectSection[];
  isFeatured: boolean;
};

/** What a grid card needs; all a client component is handed. */
export type ProjectCard = Pick<
  PortfolioProject,
  "id" | "slug" | "title" | "category" | "capacity" | "location" | "image" | "description"
>;

export type PortfolioData = {
  source: PortfolioSource;
  /** The filter bar after "All Projects", in order. */
  categories: string[];
  /** Every project, in grid order. */
  projects: PortfolioProject[];
};

const RPC_TIMEOUT_MS = 5000;

// The org lib/tenant-brand.ts reads. Vercel sets BDI_ORGANIZATION_ID for
// Production and Preview alike, so a preview deploy reads the same portfolio.
const PORTFOLIO_ORG_ID =
  process.env.BDI_ORGANIZATION_ID || process.env.NEXT_PUBLIC_BDI_ORGANIZATION_ID || "";

// ── fallback ────────────────────────────────────────────────────────────────

/** The filter bar the site shipped with. */
const FALLBACK_CATEGORIES: string[] = [
  "Solar Systems",
  "Generators",
  "Energy Management",
  "Commercial",
  "Residential",
  "Institutional",
];

const FALLBACK: PortfolioData = {
  source: "fallback",
  categories: FALLBACK_CATEGORIES,
  projects: FALLBACK_PROJECTS.map((p) => ({ ...p, extraFacts: [], sections: [], isFeatured: false })),
};

// ── mapping ─────────────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const num = (v: unknown): number => (typeof v === "number" && Number.isFinite(v) ? v : 0);
const rows = (v: unknown): Row[] =>
  Array.isArray(v) ? v.filter((r): r is Row => !!r && typeof r === "object" && !Array.isArray(r)) : [];
const strings = (v: unknown): string[] => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);

/** Absolute URLs and site-relative paths pass through. A bare storage path
 *  ("website/<org>/portfolio/...") is turned into its public `uploads` URL. */
function imageUrl(raw: string, supabaseUrl: string): string {
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw) || raw.startsWith("/")) return raw;
  return `${supabaseUrl.replace(/\/+$/, "")}/storage/v1/object/public/uploads/${raw.replace(/^\/+/, "")}`;
}

const isCapacity = (label: string) => /^capacity$/i.test(label.trim());
const isSystemType = (label: string) => /^system[\s_-]*type$/i.test(label.trim());

function mapItem(item: Row, category: string, categoryCover: string, supabaseUrl: string): PortfolioProject | null {
  const slug = str(item.slug);
  const title = str(item.title);
  if (!slug || !title) return null;

  const facts = rows(item.attributes)
    .map((a) => ({ label: str(a.label), value: str(a.value) }))
    .filter((a) => a.label && a.value);
  const gallery = strings(item.image_urls).map((u) => imageUrl(u, supabaseUrl)).filter(Boolean);
  const body = str(item.body);
  const client = str(item.client_label);
  const year = str(item.year);
  const systemType = facts.find((f) => isSystemType(f.label))?.value;

  return {
    id: str(item.id) || slug,
    slug,
    title,
    category,
    capacity: facts.find((f) => isCapacity(f.label))?.value ?? "",
    location: str(item.location),
    // The first photo is the cover; a project with none shows its category's.
    image: gallery[0] || categoryCover,
    description: str(item.summary),
    ...(body ? { fullDescription: body } : {}),
    features: strings(item.features),
    ...(client ? { client } : {}),
    ...(year ? { year } : {}),
    ...(systemType ? { systemType } : {}),
    gallery,
    extraFacts: facts.filter((f) => !isCapacity(f.label) && !isSystemType(f.label)),
    sections: rows(item.sections)
      .map((s) => ({ heading: str(s.heading), text: str(s.text) }))
      .filter((s) => s.heading || s.text),
    isFeatured: item.is_featured === true,
  };
}

function mapResponse(payload: unknown, supabaseUrl: string): PortfolioData | null {
  if (!payload || typeof payload !== "object") return null;
  const collections = rows((payload as Row).collections)
    .map((c, i) => ({ c, i }))
    // The RPC already orders; this keeps the order stable if it ever does not.
    .sort((a, b) => num(a.c.sort_order) - num(b.c.sort_order) || a.i - b.i)
    .map(({ c }) => c);

  const categories: string[] = [];
  const found: { p: PortfolioProject; order: number; category: number; position: number }[] = [];
  const seen = new Set<string>();

  collections.forEach((c, ci) => {
    const name = str(c.name);
    if (!name) return;
    const cover = imageUrl(str(c.cover_url) || strings(c.image_urls)[0] || "", supabaseUrl);
    let listed = 0;
    rows(c.items).forEach((it, position) => {
      const p = mapItem(it, name, cover, supabaseUrl);
      // Slugs are unique per org in BDI; guard anyway so a URL maps to one page.
      if (!p || seen.has(p.slug)) return;
      seen.add(p.slug);
      found.push({ p, order: num(it.sort_order), category: ci, position });
      listed++;
    });
    // A category with nothing published would be a filter that shows an empty grid.
    if (listed && !categories.includes(name)) categories.push(name);
  });

  if (!found.length) return null;
  const projects = found
    .sort(
      (a, b) =>
        Number(b.p.isFeatured) - Number(a.p.isFeatured) ||
        a.order - b.order ||
        a.category - b.category ||
        a.position - b.position,
    )
    .map(({ p }) => p);
  return { source: "bdi", categories, projects };
}

// ── fetch ───────────────────────────────────────────────────────────────────

async function fetchPortfolio(): Promise<PortfolioData> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!PORTFOLIO_ORG_ID || !url || !anon) return FALLBACK;

  try {
    const headers: Record<string, string> = {
      apikey: anon,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    // A legacy anon key is a JWT and goes in Authorization too, as supabase-js
    // sends it. A publishable (sb_publishable_...) key is not a JWT and must not.
    if (anon.startsWith("eyJ")) headers.Authorization = `Bearer ${anon}`;

    const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/rpc/get_tenant_portfolio`, {
      method: "POST",
      headers,
      body: JSON.stringify({ p_org_id: PORTFOLIO_ORG_ID }),
      next: { revalidate: 60, tags: ["portfolio"] },
      signal: AbortSignal.timeout(RPC_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.warn(`[portfolio] get_tenant_portfolio answered HTTP ${res.status}; rendering the built-in portfolio.`);
      return FALLBACK;
    }
    const mapped = mapResponse(await res.json(), url);
    if (!mapped) {
      console.warn("[portfolio] get_tenant_portfolio returned no published project; rendering the built-in portfolio.");
      return FALLBACK;
    }
    return mapped;
  } catch (err) {
    console.warn(
      `[portfolio] get_tenant_portfolio failed (${err instanceof Error ? err.name : "error"}); rendering the built-in portfolio.`,
    );
    return FALLBACK;
  }
}

/** The published portfolio, or the built-in one. Never throws. Deduped per
 *  request, so a page, its metadata and its params share one call. */
export const getPortfolio = cache(fetchPortfolio);

/** One project by slug, or null (the caller answers 404). */
export async function getPortfolioProject(
  slug: string,
): Promise<{ project: PortfolioProject | null; source: PortfolioSource }> {
  const data = await getPortfolio();
  return { project: data.projects.find((p) => p.slug === slug) ?? null, source: data.source };
}

/** The fields a grid card renders, and nothing else, for a client component. */
export function projectCards(projects: PortfolioProject[]): ProjectCard[] {
  return projects.map(({ id, slug, title, category, capacity, location, image, description }) => ({
    id,
    slug,
    title,
    category,
    capacity,
    location,
    image,
    description,
  }));
}
