// Screening for scripted submissions to /api/newsletter and /api/contact.
//
// WHY
// Both routes forward to BDI's website-public-submit (lib/submission.ts), and BDI
// runs confirmed opt-in: every newsletter signup makes BDI email a confirmation to
// the address given. A route that accepts any POST is therefore a way to make
// Solenergy's domain mail strangers. That is subscription bombing, and it is not
// hypothetical on this estate: via-vrgroup.com, running this same three-leg route,
// took 135 newsletter signups from 132 IPs between 2026-08-10 and 2026-09-07, one
// of which ever confirmed (BDI logs the mirror's user-agent, "node"). The bot POSTs
// straight at the endpoint without running the page. Solenergy had not been hit
// when this was added (read 2026-09-17: one contact row in BDI since August, a
// human sales pitch; no newsletter signups); this closes the same door before it is.
// Ported from ralphestephan/via lib/bot-screen.ts (0d992ac), same rules.
//
// FOUR CHECKS, ALL CHEAP, ALL SILENT
//   1. honeypot  - `hp`, a field no person can see or tab to. Filled -> a bot.
//   2. fill time - the form stamps `startedAt` in a client effect after mount and
//                  `submittedAt` when sent. Missing (the script never ran the
//                  page), under MIN_FILL_MS, or over MAX_FILL_MS -> dropped.
//                  Both stamps come from the VISITOR'S clock, so a laptop whose
//                  clock is minutes off is judged on how long it really took
//                  rather than on the skew between its clock and the server's.
//   3. origin    - a browser POST from this site carries an Origin (or at least
//                  a Referer) naming this site. Neither, or a foreign host ->
//                  dropped. The request's own Host counts as "this site", which
//                  keeps previews and local builds working without a host list.
//   4. gibberish - contact form only (opt-in per route). Scripted contact spam on
//                  this estate fills name and message with ONE random mixed-case
//                  token ("gJLjkAniBlQEIPECZ"). A field that is a single run of
//                  12+ letters with 4+ capitals after the first letter is that
//                  shape. Real text is not: a name has a space or at most a
//                  MacDonald-style capital or two, and a message has words.
//
// "Silent" means the dropped request gets the SAME JSON a stored submission gets.
// A bot that is told why it failed adapts; one told it succeeded moves on. The
// reason is logged server-side, and nothing is written to the backup, mailed, or
// mirrored to BDI.
//
// NOT DONE: a per-IP rate limit. It needs shared state, and in-memory counters on
// serverless are per-instance and reset on every cold start. BDI keeps its own
// per-IP and per-org limits on the mirror.
import { SITE } from "./site";
import type { SubmissionBody, SubmissionOutcome } from "./submission";

const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 24 * 60 * 60 * 1000;

/** What a stored submission looks like to the browser. Dropped bots get exactly this. */
export const SILENT_SUCCESS: SubmissionOutcome["json"] = { success: true, prisma: "ok", email: "off", bdi: "ok" };

export type Screen = { ok: true; body: SubmissionBody } | { ok: false; reason: string };

function num(v: unknown): number | null {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

function bareHost(h: string): string {
  return h.trim().toLowerCase().replace(/^www\./, "");
}

/** Hosts that count as this site: the request's own Host, and the configured site URL. */
function ownHosts(req: Request): Set<string> {
  const hosts = new Set<string>();
  for (const h of [req.headers.get("x-forwarded-host"), req.headers.get("host")]) {
    if (h) hosts.add(bareHost(h.split(",")[0]));
  }
  try {
    hosts.add(bareHost(new URL(SITE.baseUrl).host));
  } catch {
    /* an unparseable base URL just contributes nothing */
  }
  return hosts;
}

/** One random mixed-case token, the shape of scripted contact-form spam. */
export function looksLikeGibberish(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const v = value.trim();
  if (!/^[A-Za-z]{12,}$/.test(v)) return false;
  return (v.slice(1).match(/[A-Z]/g) || []).length >= 4;
}

export type ScreenOptions = { gibberishFields?: string[] };

export function screenSubmission(req: Request, body: SubmissionBody, opts: ScreenOptions = {}): Screen {
  // 1. Honeypot. Any non-empty value, whatever its type.
  const hp = body.hp;
  if (hp != null && String(hp).trim() !== "") return { ok: false, reason: "honeypot filled" };

  // 2. Fill time.
  const startedAt = num(body.startedAt);
  if (startedAt === null || startedAt <= 0) return { ok: false, reason: "no startedAt" };
  const submittedAt = num(body.submittedAt) ?? Date.now();
  const elapsed = submittedAt - startedAt;
  if (elapsed < MIN_FILL_MS) return { ok: false, reason: `filled in ${elapsed}ms` };
  if (elapsed > MAX_FILL_MS) return { ok: false, reason: `form open ${Math.round(elapsed / 3_600_000)}h` };

  // 3. Origin, falling back to Referer.
  const source = req.headers.get("origin") || req.headers.get("referer") || "";
  let sourceHost = "";
  try {
    sourceHost = source && source !== "null" ? bareHost(new URL(source).host) : "";
  } catch {
    sourceHost = "";
  }
  if (!sourceHost) return { ok: false, reason: "no Origin or Referer" };
  if (!ownHosts(req).has(sourceHost)) return { ok: false, reason: `foreign origin ${sourceHost}` };

  // 4. Gibberish, in the fields the route names.
  for (const f of opts.gibberishFields ?? []) {
    if (looksLikeGibberish(body[f])) return { ok: false, reason: `gibberish ${f}` };
  }

  // The screening fields have done their job; they are not part of the enquiry
  // and must not ride into the backup row, the owner email or BDI's payload.
  const clean: SubmissionBody = { ...body };
  delete clean.startedAt;
  delete clean.submittedAt;
  return { ok: true, body: clean };
}
