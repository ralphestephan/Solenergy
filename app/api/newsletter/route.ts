import { NextResponse } from "next/server";

// Thin proxy to the BDI central submissions API. The BDI route owns the
// upsert into NewsletterSubscriber, the Vealive-branded welcome email, and
// the MemberFlow forward. See ./contact/route.ts for the same pattern.

const BDI_API_BASE = process.env.BDI_API_BASE || "";
const ORG_ID = process.env.BDI_ORGANIZATION_ID || "";

function forwardHeaders(req: Request): Record<string, string> {
  const out: Record<string, string> = { "Content-Type": "application/json" };
  const xff = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ua = req.headers.get("user-agent");
  const ref = req.headers.get("referer");
  if (xff) out["x-forwarded-for"] = xff;
  if (realIp) out["x-real-ip"] = realIp;
  if (ua) out["user-agent"] = ua;
  if (ref) out["referer"] = ref;
  return out;
}

export async function POST(req: Request) {
  if (!BDI_API_BASE || !ORG_ID) {
    console.error("newsletter proxy: BDI_API_BASE or BDI_ORGANIZATION_ID missing");
    return NextResponse.json(
      { success: false, error: "Submissions API not configured" },
      { status: 500 },
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${BDI_API_BASE}/api/newsletter`, {
      method: "POST",
      headers: forwardHeaders(req),
      body: JSON.stringify({ ...body, organizationId: ORG_ID }),
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
    });
  } catch (err: unknown) {
    console.error("newsletter proxy: upstream call failed:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to subscribe" },
      { status: 502 },
    );
  }
}
