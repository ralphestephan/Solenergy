// Server-side fetch of this org's tracking IDs from the central BDI platform (org settings),
// via the public get_tenant_brand RPC. This makes tracking settings-driven: to point the site at
// a different GA4/Meta account, edit the org's settings.brand.tracking in BDI — no code change.
// Returns empty strings on any failure; callers keep their hardcoded id as a fallback so analytics
// can never silently blank out.
export type TenantTracking = { ga4Id: string; metaPixelId: string };

const EMPTY: TenantTracking = { ga4Id: "", metaPixelId: "" };

export async function getTenantTracking(): Promise<TenantTracking> {
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
      // Refresh hourly (ISR-friendly) so a settings flip propagates without a redeploy.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return EMPTY;
    const brand = (await res.json()) as { tracking?: Record<string, unknown> } | null;
    const t = brand?.tracking ?? {};
    return {
      ga4Id: (t.ga4_measurement_id as string) || "",
      metaPixelId: (t.meta_pixel_id as string) || "",
    };
  } catch {
    return EMPTY;
  }
}
