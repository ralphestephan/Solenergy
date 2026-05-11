import { NextResponse } from "next/server";

// Vealive's frontend posts to /api/contact on its own origin so it doesn't have
// to deal with CORS. This route is a thin proxy: it injects Vealive's
// organizationId and forwards to the BDI central submissions API, which owns
// the Prisma write, the per-tenant Resend email, and the MemberFlow forward.
//
// Required env:
//   BDI_API_BASE          e.g. https://bdicorporate.com
//   BDI_ORGANIZATION_ID   Vealive's org id in MemberFlow

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
    console.error("contact proxy: BDI_API_BASE or BDI_ORGANIZATION_ID missing");
    return NextResponse.json(
      { success: false, error: "Submissions API not configured" },
      { status: 500 },
    );
  }

  let form: Record<string, unknown> = {};
  try {
    form = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${BDI_API_BASE}/api/contact`, {
      method: "POST",
      headers: forwardHeaders(req),
      body: JSON.stringify({ ...form, organizationId: ORG_ID }),
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
    });
  } catch (err: unknown) {
    console.error("contact proxy: upstream call failed:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to send" },
      { status: 502 },
    );
  }
}
