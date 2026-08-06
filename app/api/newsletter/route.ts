// Newsletter subscriptions for solenergypower.com.
//
// Same story as ./contact/route.ts: this was a thin proxy to a BDI endpoint that
// does not exist on the configured host, so not one of this org's subscribers
// was ever persisted anywhere (0 rows in Prisma NewsletterSubscriber and 0 in
// Supabase website_submissions for org 3041e8aa, read 2026-08-06). It now runs
// the same three legs — Prisma backup, dormant Resend, BDI mirror — via
// lib/submission.ts.
//
// The form_type is pinned to "newsletter" so the backup lands in
// NewsletterSubscriber rather than the lead table, and so the BDI CRM fan-out
// treats it as a subscribe. A body that names some other form_type is honoured
// only if it is one website-public-submit accepts; anything unknown falls back
// to "newsletter" here (the contact route falls back to "contact"), which keeps
// the Prisma row and the CRM row describing the same thing.
//
// Contract change: HTTP 200 with `{success:boolean, ...}` — components/SiteFooter.tsx
// branches on `json.success`, not on `res.ok`.
import { NextResponse } from "next/server";
import { handleSubmission } from "@/lib/submission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { status, json } = await handleSubmission(req, "newsletter");
  return NextResponse.json(json, { status });
}
