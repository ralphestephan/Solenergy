// The ONE server-side submission engine for solenergypower.com.
//
// WHY THIS FILE EXISTS
// --------------------
// `app/api/contact/route.ts` and `app/api/newsletter/route.ts` were thin
// proxies: they forwarded the form body to `${BDI_API_BASE}/api/contact` and
// relayed whatever came back. Two things were wrong with that, both MEASURED on
// 2026-08-06 rather than reasoned about:
//
//   1. THE FORMS WERE DEAD. Solenergy's Vercel project has
//      BDI_API_BASE = https://systems.bdicorporate.com — the MemberFlow SPA, not
//      the BDI Corporate Next.js app (that is https://bdicorporate.com). The SPA
//      has no /api/contact route handler, so a POST there is answered by the
//      static asset layer with a bare `405 Method Not Allowed`. The proxy
//      relayed the 405 verbatim (old contact/route.ts:51-54), the browser saw
//      `!res.ok` and rendered "Something went wrong. Please try again."
//      Live probe, apex and www:
//        POST https://www.solenergypower.com/api/contact
//          -> HTTP 405, Content-Length: 0, Content-Type: application/json
//        POST https://systems.bdicorporate.com/api/contact
//          -> HTTP 405, Content-Length: 0
//      And the ledgers agree: 0 rows in Prisma ContactFormSubmission /
//      NewsletterSubscriber for org 3041e8aa, and 0 rows in Supabase
//      website_submissions for the same org. Not one lead has ever landed.
//
//   2. EVEN WHEN IT REACHED BDI IT WOULD HAVE BEEN MIS-ATTRIBUTED. BDI
//      Corporate's route resolves the tenant with `resolveTenant()`
//      (ralphestephan/bdi lib/tenant.ts:32-60), which falls back to
//      BDI_DEFAULT when there is no `Tenant` row for the organizationId
//      (:40) — and BDI_DEFAULT.organizationId is BDI's OWN org (:25). The live
//      Tenant table holds exactly ONE row, VeaLive360; there is no Solenergy
//      row. So every Solenergy lead would have been written with
//      organizationId = BDI Corporate's, its confirmation sent from BDI's
//      `RESEND_FROM`, and the owner notification delivered to BDI's
//      `ADMIN_EMAIL` instead of to Solenergy. That never happened only because
//      of defect 1.
//
// The architecture this restores is the one the two shipped reference repos
// already run (ralphestephan/abou-philippe-resort, ralphestephan/azarco-properties):
//
//     browser form -> this site's own server route
//                       1. Prisma write   PERMANENT backup, FIRST, own try/catch
//                       2. Resend         only when this site is armed to send
//                       3. mirror to BDI  LAST, time-bounded, best-effort
//
// ORDER IS LOAD-BEARING. The Prisma write goes first because a Resend outage
// must never cost a lead — that inversion (send first, persist after) is the
// live shape of BDI Corporate's own route (app/api/contact/route.ts:49-83,
// where the DB write sits behind two awaited `resend.emails.send()` calls) and
// it is deliberately not copied here.
//
// THE RESEND LEG IS PRESENT BUT DORMANT, AND THAT IS THE POINT.
// -------------------------------------------------------------
// Solenergy's BDI delivery flags are all EIGHT ON (automation_settings
// .website_settings for org 3041e8aa, read 2026-08-06: contact_form_owner,
// contact_form_customer, newsletter_signup_owner, newsletter_signup_customer,
// booking_request_*, order_placed_* — every one `enabled: true`). ON means BDI
// sends. If this route also sent, every enquirer would get two confirmations and
// the owner two notifications, from two different senders.
//
// So the leg is written, sits in the correct position (after the backup, before
// the mirror), and is gated on SITE_SENDS_EMAIL === "1". A key alone is NOT
// enough to arm it, deliberately: this project already carries RESEND_API_KEY
// (set 214d ago) and BDI's `provision-tenant` writes that variable into tenant
// Vercel projects on its own, so keying off the key would have started
// double-mailing a LIVE org the moment this deployed.
//
// OWNER_EMAIL, NOT ADMIN_EMAIL — AND THIS SITE IS THE PROOF.
// ----------------------------------------------------------
// `ADMIN_EMAIL` is NOT accepted as an alias. provision-tenant/index.ts:1011
// writes ["ADMIN_EMAIL", platformResendFrom] into tenant projects, and on THIS
// project both ADMIN_EMAIL and RESEND_FROM currently read literally
// "BDI Tenants <info@bdicorporate.com>" (verified 2026-08-06). Had this route
// honoured ADMIN_EMAIL, arming it would have mailed every Solenergy owner
// notification to BDI's own inbox — and Resend would have returned a real
// message id, so the cutover check below would have PASSED while the business
// received nothing. Requiring a variable nothing else writes is the only way
// that failure is visible: with no OWNER_EMAIL the answer says "no_recipient".
// RESEND_FROM is likewise required to be set to a Solenergy address before the
// leg can send as Solenergy.
//
// CUTOVER ORDER (all founder actions, in this order, per flow):
//   1. set RESEND_FROM + OWNER_EMAIL to Solenergy's own addresses
//      (RESEND_API_KEY already exists on this project)
//   2. set SITE_SENDS_EMAIL=1 -> the site now sends. BDI ALSO still sends: the
//      deliberate overlap window, duplicates but zero silence.
//   3. confirm a real Resend message id came back for BOTH copies
//   4. turn the matching BDI website_settings flags OFF -> overlap ends
// Doing 4 before 3 is the only ordering that can lose mail.
//
// NO CREDENTIAL, ORG ID OR PROJECT URL IS HARDCODED HERE.
// -------------------------------------------------------
// This is the one place this file deliberately DIVERGES from the two reference
// repos, which carry the Supabase URL / publishable key / organization UUID as
// inline fallbacks. Those repos are PRIVATE. `ralphestephan/Solenergy` is
// PUBLIC, and commit 035c49a ("fix(security): rotate prod creds to env vars;
// close credential leak", PR #1) removed exactly these literals from
// lib/supabase.ts, whose header now forbids reintroducing them. So every value
// comes from the environment.
//
// That does NOT reintroduce a hard failure on a missing variable — the rule the
// reference repos are actually protecting. Nothing throws: each leg reports its
// own configuration state ("skipped" for Prisma, "unconfigured" for the mirror)
// and the route still answers 200 with an honest `success`. All three variables
// the mirror needs (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
// BDI_ORGANIZATION_ID) are already set on this Vercel project, so on production
// this is fully configured on the first deploy.
import { getPrisma } from "@/lib/db";
import { SITE } from "@/lib/site";

/** Exactly the set `website-public-submit` accepts (index.ts:87). */
const FORM_TYPES = new Set(["contact", "booking", "order", "quote", "newsletter", "custom", "membership"]);

export type FormType = "contact" | "newsletter" | "quote" | "custom" | "membership" | "booking" | "order";

export type SubmissionBody = Record<string, unknown>;

const ORG = process.env.BDI_ORGANIZATION_ID || process.env.NEXT_PUBLIC_BDI_ORGANIZATION_ID || "";
const BDI_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
// The publishable (anon) key. Public by design — the browser already ships it
// via NEXT_PUBLIC_SUPABASE_ANON_KEY (lib/supabase.ts:20) — but read from env,
// never inlined, because this repo is public.
const BDI_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const MIRROR_TIMEOUT_MS = Number(process.env.BDI_MIRROR_TIMEOUT_MS || 6000);

const RESEND_KEY = process.env.RESEND_API_KEY || "";
const RESEND_FROM = process.env.RESEND_FROM || "";
const OWNER_EMAIL = process.env.OWNER_EMAIL || "";
const RESEND_REPLY_TO = process.env.RESEND_REPLY_TO || SITE.contact.email;
const RESEND_TIMEOUT_MS = Number(process.env.RESEND_TIMEOUT_MS || 8000);
const SITE_SENDS_EMAIL = process.env.SITE_SENDS_EMAIL === "1";
const BRAND = SITE.brand;

export type PrismaResult = "ok" | "duplicate" | "skipped" | "failed";
export type EmailResult = "off" | "sent" | "partial" | "failed" | "no_recipient";
export type MirrorResult = "ok" | "rejected" | "failed" | "unconfigured";

/** First non-empty string among the given keys, trimmed and length-capped. */
function pick(body: SubmissionBody, keys: string[], max: number): string | null {
  for (const k of keys) {
    const v = body[k];
    if (typeof v === "string" && v.trim() !== "") return v.trim().slice(0, max);
    if (typeof v === "number" && Number.isFinite(v)) return String(v).slice(0, max);
  }
  return null;
}

/**
 * Write the PERMANENT backup row.
 *
 * "skipped" means there is no DATABASE_URL — a configuration state, not an
 * error. The model set is the SHARED schema copied verbatim from
 * ralphestephan/bdi prisma/schema.prisma; that file's own header forbids
 * forking it, so a field this schema does not name survives in the BDI mirror's
 * free-form `payload` instead.
 */
export async function writeBackup(formType: FormType, body: SubmissionBody): Promise<PrismaResult> {
  const prisma = getPrisma();
  if (!prisma) return "skipped";
  if (!ORG) {
    // Writing a row with organizationId = null would put a Solenergy lead into
    // the shared multi-tenant table belonging to nobody, which is how the
    // attribution defect this file exists to fix happened in the first place.
    console.error("submit: BDI_ORGANIZATION_ID unset — refusing to write an untagged row");
    return "skipped";
  }

  try {
    if (formType === "newsletter") {
      const email = pick(body, ["email"], 200);
      if (!email) return "failed";
      try {
        await prisma.newsletterSubscriber.create({
          data: { email, status: "active", organizationId: ORG },
        });
        return "ok";
      } catch (e) {
        // NewsletterSubscriber.email is @unique GLOBALLY, not per organization
        // (prisma/schema.prisma:66), so a second org subscribing an address the
        // first org already holds collides. The row is NOT overwritten:
        // reassigning organizationId would silently move another tenant's
        // subscriber into this one. P2002 is reported as "duplicate" — the
        // address is durably in the table, and the BDI mirror below still
        // records the subscribe against THIS org. The constraint should become
        // @@unique([organizationId, email]); that is a shared-schema change and
        // is out of this repo's scope.
        if (typeof e === "object" && e !== null && (e as { code?: string }).code === "P2002") return "duplicate";
        throw e;
      }
    }

    // contact | quote | custom | membership | anything else -> the lead table.
    // `name` and `email` are NOT NULL in the shared schema (:49-50), so they get
    // "" rather than null when absent; "" is honest — it means the visitor left
    // it blank — and the raw values ride along to BDI.
    await prisma.contactFormSubmission.create({
      data: {
        name: pick(body, ["name", "full_name", "first_name"], 200) || "",
        email: pick(body, ["email"], 200) || "",
        phone: pick(body, ["phone", "telephone"], 200),
        city: pick(body, ["city", "country", "location"], 200),
        reason: pick(body, ["subject", "reason", "service", "lead_type"], 200),
        budget: pick(body, ["budget", "budget_range"], 200),
        contact_pref: pick(body, ["contact_pref", "preferred_contact", "preferred"], 200),
        message: pick(body, ["message", "notes", "comment"], 5000),
        status: "new",
        organizationId: ORG,
      },
    });
    return "ok";
  } catch (e) {
    console.error("submit: prisma write failed:", e instanceof Error ? e.message : e);
    return "failed";
  }
}

function esc(s: unknown): string {
  return String(s == null ? "" : s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

/** One Resend send. Never throws; returns true only on a real message id. */
async function resendOne(to: string, subject: string, html: string, replyTo?: string | null): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: RESEND_FROM, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    const j = (await res.json().catch(() => null)) as { id?: unknown } | null;
    // A message id is the ONLY proof. Resend answers 200 with an error body in
    // some failure modes, so res.ok on its own is not evidence of a send.
    if (res.ok && j && typeof j.id === "string" && j.id) return true;
    console.error(`submit: resend rejected (HTTP ${res.status}):`, j ? JSON.stringify(j).slice(0, 300) : "(no JSON)");
    return false;
  } catch (e) {
    console.error("submit: resend call failed:", e instanceof Error ? e.message : e);
    return false;
  }
}

/**
 * Leg 2: mail the enquirer AND the owner, from THIS site's own Resend account.
 * Dormant until SITE_SENDS_EMAIL === "1" — see the file header.
 */
export async function sendEmails(formType: FormType, body: SubmissionBody): Promise<EmailResult> {
  if (!SITE_SENDS_EMAIL || !RESEND_KEY || !RESEND_FROM) return "off";

  const customer = pick(body, ["email"], 200);
  const name = pick(body, ["name", "full_name", "first_name"], 200) || "";
  if (!customer && !OWNER_EMAIL) return "no_recipient";

  const isNewsletter = formType === "newsletter";
  const rows = Object.keys(body)
    .filter((k) => k !== "hp" && k !== "organizationId" && k !== "form_type" && body[k] !== "" && body[k] != null)
    .map(
      (k) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0">${esc(body[k])}</td></tr>`,
    )
    .join("");

  const customerHtml = isNewsletter
    ? `<p>Thank you for subscribing to ${esc(BRAND)}.</p><p>We'll write when there is something worth your time.</p>`
    : `<p>Dear ${esc(name) || "there"},</p><p>Thank you for your enquiry. We have it, and someone from ${esc(BRAND)} will reply shortly.</p><p>If it is urgent, call us on ${esc(SITE.contact.phone)}.</p>`;

  const ownerHtml = `<p>New ${esc(formType)} submission from solenergypower.com.</p><table style="border-collapse:collapse;font:14px system-ui">${rows}</table>`;

  const results = await Promise.all([
    customer
      ? resendOne(
          customer,
          isNewsletter ? `You're subscribed — ${BRAND}` : `We received your enquiry — ${BRAND}`,
          customerHtml,
          RESEND_REPLY_TO,
        )
      : Promise.resolve(null),
    OWNER_EMAIL
      ? resendOne(OWNER_EMAIL, `New ${formType} enquiry — ${BRAND}`, ownerHtml, customer || RESEND_REPLY_TO)
      : Promise.resolve(null),
  ]);

  const attempted = results.filter((r): r is boolean => r !== null);
  if (attempted.length === 0) return "no_recipient";
  if (attempted.every((r) => r === true)) return "sent";
  if (attempted.some((r) => r === true)) return "partial";
  return "failed";
}

/**
 * Leg 3: mirror to BDI — the CRM / system of record.
 *
 * The target is the Supabase edge function `website-public-submit`, NOT
 * `${BDI_API_BASE}/api/contact`. Two reasons, in order of weight:
 *   * the old target does not exist (see the header: 405 on every POST), and
 *   * the edge function reads organizationId straight off the body and rejects
 *     anything that is not a UUID (index.ts:200-202) — it never substitutes a
 *     default tenant, so a Solenergy lead cannot silently become a BDI Corporate
 *     lead the way the BDI Corporate Next.js route would make it.
 *
 * BDI_API_BASE is therefore no longer read by this site at all.
 *
 * The body is forwarded VERBATIM apart from forcing organizationId/form_type:
 * website-public-submit sweeps every unrecognised key into `payload`
 * (index.ts:204-211) and the CRM fan-out reads fields this file has never heard
 * of, so re-shaping here would quietly drop them.
 *
 * "failed" means no usable answer (timeout, network, non-JSON). The insert MAY
 * still have landed, which is exactly why nothing replays it.
 */
export async function mirrorToBdi(
  formType: FormType,
  body: SubmissionBody,
  ip: string | null,
  pageSlug: string | null,
): Promise<MirrorResult> {
  if (!BDI_URL || !BDI_ANON || !ORG) {
    console.error(
      "submit: BDI mirror unconfigured (need NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, BDI_ORGANIZATION_ID)",
    );
    return "unconfigured";
  }
  try {
    const res = await fetch(`${BDI_URL}/functions/v1/website-public-submit`, {
      method: "POST",
      // Node's undici fetch has NO default response timeout (~300s) against a
      // ~10s Vercel function limit. Without this a slow BDI turns a stored lead
      // into a 504 in the visitor's browser, which reads as failure and invites
      // a duplicate submission.
      signal: AbortSignal.timeout(MIRROR_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
        // BOTH ARE REQUIRED. Supabase's gateway rejects a function call with no
        // apikey even when the function itself is verify_jwt=false. The two
        // reference repos shipped without them on 2026-08-06 and the first live
        // probe came back {"success":false,"bdi":"failed"} on each; adding these
        // two headers is what turned it into "bdi":"ok". This is the publishable
        // key the browser already carries — same value, not a new secret.
        apikey: BDI_ANON,
        Authorization: `Bearer ${BDI_ANON}`,
        // Forward the VISITOR's address. clientIpForInet()
        // (_shared/request-origin.ts:136-140) reads the leftmost x-forwarded-for
        // entry first, so this is the intent — but MEASURED 2026-08-06 it does
        // NOT arrive: the edge gateway in front of the function owns that header
        // and a client-supplied value never reaches the code. So ip_address will
        // record VERCEL'S EGRESS, not the visitor. Still strictly better than
        // the NULL every row would otherwise carry, and it costs nothing — but
        // do not rely on it for forensics, and note the same mechanism puts
        // every visitor of this site in ONE per-IP rate-limit bucket (20/60s;
        // the per-org 120/300s cap is unchanged).
        ...(ip ? { "x-forwarded-for": ip } : {}),
      },
      body: JSON.stringify({
        ...body,
        organizationId: ORG,
        form_type: formType,
        page_slug: typeof body.page_slug === "string" && body.page_slug ? body.page_slug : pageSlug,
      }),
    });
    const j = (await res.json().catch(() => null)) as { success?: unknown } | null;
    if (res.ok && j && j.success === true) return "ok";
    if (j !== null) {
      console.warn(`submit: BDI mirror rejected (HTTP ${res.status}):`, JSON.stringify(j).slice(0, 300));
      return "rejected";
    }
    console.warn(`submit: BDI mirror gave no JSON (HTTP ${res.status})`);
    return "failed";
  } catch (e) {
    console.error("submit: BDI mirror failed:", e instanceof Error ? e.message : e);
    return "failed";
  }
}

export interface SubmissionOutcome {
  status: number;
  json: {
    success: boolean;
    prisma?: PrismaResult;
    email?: EmailResult;
    bdi?: MirrorResult;
    error?: string;
  };
}

/**
 * Run all three legs for one submission and produce the honest answer.
 *
 * `success` means the submission survived SOMEWHERE durable. It deliberately
 * does NOT include the email outcome: mail is not storage, and a lead that
 * reached Prisma but whose confirmation bounced is still a lead Solenergy has —
 * telling the visitor to retype it would only create a duplicate.
 */
export async function handleSubmission(req: Request, defaultFormType: FormType): Promise<SubmissionOutcome> {
  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return { status: 400, json: { success: false, error: "Invalid JSON" } };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { status: 400, json: { success: false, error: "Invalid body" } };
  }
  const body = parsed as SubmissionBody;

  // Honeypot: a silent 200, matching website-public-submit (index.ts:199), so
  // the bot learns nothing.
  if (typeof body.hp === "string" && body.hp.trim() !== "") {
    return { status: 200, json: { success: true, prisma: "skipped", bdi: "unconfigured" } };
  }

  const raw = String(body.form_type || body.formType || defaultFormType);
  const formType = (FORM_TYPES.has(raw) ? raw : defaultFormType) as FormType;

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || null;

  let pageSlug: string | null = null;
  try {
    const ref = req.headers.get("referer");
    if (ref) pageSlug = new URL(ref).pathname.slice(0, 200);
  } catch {
    /* a malformed Referer is not worth failing a lead over */
  }

  // 1. PERMANENT BACKUP FIRST.
  const prismaResult = await writeBackup(formType, body);
  // 2. Then this site's own mail — dormant until SITE_SENDS_EMAIL=1. Wrapped
  //    again here so that even a bug inside sendEmails cannot cost the mirror.
  let emailResult: EmailResult = "off";
  try {
    emailResult = await sendEmails(formType, body);
  } catch (e) {
    console.error("submit: email leg threw:", e instanceof Error ? e.message : e);
    emailResult = "failed";
  }
  // 3. The CRM mirror LAST, time-bounded, unable to fail either leg above.
  const bdiResult = await mirrorToBdi(formType, body, ip, pageSlug);

  const stored = prismaResult === "ok" || prismaResult === "duplicate" || bdiResult === "ok";

  return {
    status: 200,
    json: {
      success: stored,
      prisma: prismaResult,
      email: emailResult,
      bdi: bdiResult,
      ...(stored
        ? {}
        : { error: `We could not record that. Please try again, or call us on ${SITE.contact.phone}.` }),
    },
  };
}
