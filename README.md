# Solenergy — Next.js + Tailwind

This repo creates **solenergy.com** as a statically rendered Next.js app using the App Router and TailwindCSS.

## Tech
- Next.js 14 (App Router)
- TailwindCSS
- TypeScript
- Simple dynamic route for solutions

## Routes
- `/` — Home
- `/solutions` — Solutions index
- `/solutions/[slug]` — Lighting, Climate, Safety, Studio, Utility
- `/contact` — Contact form (mailto)

## Content
Meta titles, descriptions, and images were parsed from the uploaded HTML pages. You can edit content in `data/solutions.ts`.

## Run
```bash
npm i
cp .env.example .env.local   # then fill in real values
npm run dev
```

## Build
```bash
npm run build && npm start
```

## Environment Configuration

All connection values come from environment variables — **no credentials are
hardcoded**. See [`.env.example`](./.env.example) for the canonical list of
required vars. Copy it to `.env.local` for local development; for production,
set the same vars in the Vercel dashboard under **Settings → Environment
Variables** for Production, Preview, and Development.

| Variable | What it is | Where to get it |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://<ref>.supabase.co`) — also the base for the `website-public-submit` edge function | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon/publishable key for client-side reads/writes (RLS-gated) and for the server-side mirror call | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_BDI_ORGANIZATION_ID` | Solenergy's organization UUID in the BDI/MemberFlow database | BDI admin → Organizations → Solenergy → id, or `select id from organizations where slug = 'solenergy';` |
| `BDI_ORGANIZATION_ID` | Server-side mirror of the org UUID. Tags every Prisma row and every mirrored submission | Same UUID as above |
| `DATABASE_URL` / `DIRECT_URL` | Shared BDI Postgres — the permanent backup leg | Vercel storage / BDI |
| `NEXT_PUBLIC_BRAND_NAME` | Display name for SEO defaults | `Solenergy` |
| `RESEND_API_KEY` | Resend API key. **Does not arm sending on its own** — see below | <https://resend.com/api-keys> |
| `SITE_SENDS_EMAIL` | The only switch that arms this site's own mail. Must be exactly `1` | Founder decision, see cutover order below |
| `RESEND_FROM` / `OWNER_EMAIL` | From: header and owner-notification inbox for this site's own mail | Must be **Solenergy** addresses |

`BDI_API_BASE` is **no longer read** — see "Form submissions" below.

> :warning: **Never commit real values.** `.env.local` and `.env.*` are
> already gitignored; `.env.example` is the only env file tracked in git
> and it carries placeholders only. If you discover a secret has been
> committed, rotate it immediately in the issuing dashboard (Supabase,
> Resend, etc.) before scrubbing the repo.

## Form submissions

Forms POST to this site's **own** API routes, which run three legs in this order:

| Route | Flow | What it does |
|---|---|---|
| `POST /api/contact` | contact, quote | Prisma backup **first**, then a dormant Resend leg, then mirrors to the BDI edge function `website-public-submit`. |
| `POST /api/newsletter` | newsletter | Same three legs, pinned to `form_type: "newsletter"` so the backup lands in `NewsletterSubscriber`. |

Both answer **HTTP 200** with `{ success, prisma, email, bdi }`. `success` is true only
when the submission survived somewhere durable — the Prisma backup **or** the BDI mirror.
The browser must branch on `json.success`, not on `res.ok`.

### What this replaced, and why

Both routes used to be thin proxies to `${BDI_API_BASE}/api/contact`. Two defects, both
measured on 2026-08-06:

1. **The forms were dead.** `BDI_API_BASE` on this Vercel project is
   `https://systems.bdicorporate.com` — the MemberFlow SPA, not the BDI Corporate Next.js
   app (`https://bdicorporate.com`). The SPA has no `/api/contact` handler, so a POST is
   answered `405 Method Not Allowed` by the static layer, and the proxy relayed that 405
   verbatim. Every visitor saw *"Something went wrong. Please try again."* The ledgers
   agree: **0** rows in Prisma `ContactFormSubmission` / `NewsletterSubscriber` for this
   org, and **0** rows in Supabase `website_submissions`. Not one lead had ever landed.
2. **Even reaching BDI, the rows would have been mis-attributed.** BDI Corporate's route
   resolves the tenant with `resolveTenant()`, which falls back to BDI's own defaults when
   there is no `Tenant` row for the `organizationId` — and there is no Solenergy row (the
   live table holds exactly one, VeaLive360). Solenergy leads would have been written under
   **BDI Corporate's** org id, mailed from BDI's `RESEND_FROM`, with the owner notification
   delivered to BDI's `ADMIN_EMAIL`.

The mirror now targets `website-public-submit`, which reads `organizationId` off the body
and rejects anything that is not a valid org — it never substitutes a default tenant, so
the mis-attribution cannot recur.

### Email is wired but DORMANT, and that is the point

This org's BDI delivery flags are **all eight ON**, which means **BDI** sends the contact
and newsletter mail today. If this route also sent, every enquirer would get two
confirmations from two different senders. So the Resend leg sits in the correct position
(after the backup, before the mirror) and only fires when `SITE_SENDS_EMAIL=1`.

A key alone does **not** arm it, on purpose: this project already carries `RESEND_API_KEY`,
and BDI's `provision-tenant` writes that variable into tenant projects by itself.

`ADMIN_EMAIL` is deliberately **not** accepted as an alias for `OWNER_EMAIL`. On this
project `ADMIN_EMAIL` and `RESEND_FROM` both currently read
`BDI Tenants <info@bdicorporate.com>` — provision-tenant put them there. Honouring
`ADMIN_EMAIL` would mail every owner notification to BDI's inbox and Resend would return a
real message id, so the cutover check below would have *passed* while the business received
nothing.

**Cutover order — 4 before 3 is the only sequence that can lose mail:**
1. set `RESEND_FROM` and `OWNER_EMAIL` to **Solenergy** addresses
2. set `SITE_SENDS_EMAIL=1` — the site now sends *and BDI still sends*: a deliberate
   overlap, duplicates but zero silence
3. confirm a real Resend message id came back for **both** the customer and the owner copy
4. turn the matching BDI `automation_settings.website_settings` flags OFF — overlap ends

### Deploying

Vercel injects environment variables at **build** time. Setting a variable does not change
an existing deployment — rebuild after setting one, then prove it by reading a row back.
A success log is not proof.

## Notes
- Remote images are whitelisted in `next.config.mjs`.
- Styling matches Solenergy: 40px rounded cards, soft shadows, solar-themed gradients.
