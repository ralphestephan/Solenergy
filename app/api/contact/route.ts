// Contact / quote submissions for solenergypower.com.
//
// This route used to be a thin proxy to `${BDI_API_BASE}/api/contact` — and its
// header comment described Vealive, because it was copied from that repo and
// never re-read. That target does not exist for this project (BDI_API_BASE is
// set to the MemberFlow SPA, which answers POST with 405), and even if it had,
// BDI Corporate's route would have written the row under BDI's OWN
// organizationId. Both defects, the live measurements behind them, and the
// three-leg architecture that replaces them are documented in lib/submission.ts.
//
// THE CONTRACT WITH THE BROWSER CHANGED, and app/contact/page.tsx changed with
// it: this route now answers HTTP 200 with `{success:boolean, ...}` instead of
// relaying an upstream status code, so the page branches on `json.success`, not
// on `res.ok`.
import { NextResponse } from "next/server";
import { handleSubmission } from "@/lib/submission";

// Prisma needs the Node runtime; it does not run on the edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { status, json } = await handleSubmission(req, "contact");
  return NextResponse.json(json, { status });
}
