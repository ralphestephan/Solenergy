// Server-side fetch of this org's brand + tracking from the central BDI platform (org settings),
// via the public get_tenant_brand RPC. Makes brand/contact/tracking settings-driven: edit the
// org's settings.brand in BDI to update the live site — no code change, no redeploy (hourly ISR).
// Every field falls back to "" so callers keep their own hardcoded defaults; analytics/contact can
// never silently blank out.
export type TenantBrand = {
  /** BDI's own GA4 (settings.brand.tracking.ga4_measurement_id). */
  ga4Id: string;
  metaPixelId: string;
  /** Solenergy's own GA4 (settings.brand.tracking.client_ga4_measurement_id). */
  clientGa4Id: string;
  contact: { email: string; phone: string; whatsapp: string };
};

const EMPTY: TenantBrand = {
  ga4Id: "",
  metaPixelId: "",
  clientGa4Id: "",
  contact: { email: "", phone: "", whatsapp: "" },
};

export async function getTenantBrand(): Promise<TenantBrand> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const org = process.env.BDI_ORGANIZATION_ID || process.env.NEXT_PUBLIC_BDI_ORGANIZATION_ID;
  if (!url || !key || !org) return EMPTY;
  try {
    const res = await fetch(`${url}/rest/v1/rpc/get_tenant_brand`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_org_id: org }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return EMPTY;
    const brand = (await res.json()) as {
      tracking?: Record<string, unknown>;
      contact?: Record<string, unknown>;
    } | null;
    const t = brand?.tracking ?? {};
    const c = brand?.contact ?? {};
    return {
      ga4Id: (t.ga4_measurement_id as string) || "",
      metaPixelId: (t.meta_pixel_id as string) || "",
      clientGa4Id: (t.client_ga4_measurement_id as string) || "",
      contact: {
        email: (c.email as string) || "",
        phone: (c.phone as string) || "",
        whatsapp: (c.whatsapp as string) || "",
      },
    };
  } catch {
    return EMPTY;
  }
}

// Every GA4 id to configure: BDI's own and Solenergy's own. They go into an inline <script>,
// and the client_* id is typed by the tenant in BDI, so anything that is not exactly the shape
// of an id is dropped rather than escaped; the same id twice is configured once, or every
// visit would be counted twice.
const GA4_ID = /^G-[A-Z0-9]{4,20}$/;
export function ga4Ids(b: TenantBrand): string[] {
  const out: string[] = [];
  for (const raw of [b.ga4Id, b.clientGa4Id]) {
    const v = String(raw || "").trim();
    if (GA4_ID.test(v) && !out.includes(v)) out.push(v);
  }
  return out;
}

// Back-compat: some callers only need the tracking ids.
export async function getTenantTracking(): Promise<{ ga4Id: string; metaPixelId: string }> {
  const b = await getTenantBrand();
  return { ga4Id: b.ga4Id, metaPixelId: b.metaPixelId };
}
