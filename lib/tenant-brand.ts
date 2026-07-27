// Server-side fetch of this org's brand + tracking from the central BDI platform (org settings),
// via the public get_tenant_brand RPC. Makes brand/contact/tracking settings-driven: edit the
// org's settings.brand in BDI to update the live site — no code change, no redeploy (hourly ISR).
// Every field falls back to "" so callers keep their own hardcoded defaults; analytics/contact can
// never silently blank out.
export type TenantBrand = {
  ga4Id: string;
  metaPixelId: string;
  contact: { email: string; phone: string; whatsapp: string };
};

const EMPTY: TenantBrand = {
  ga4Id: "",
  metaPixelId: "",
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

// Back-compat: some callers only need the tracking ids.
export async function getTenantTracking(): Promise<{ ga4Id: string; metaPixelId: string }> {
  const b = await getTenantBrand();
  return { ga4Id: b.ga4Id, metaPixelId: b.metaPixelId };
}
