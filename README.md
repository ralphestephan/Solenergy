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
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://<ref>.supabase.co`) | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon JWT for client-side reads/writes (RLS-gated) | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_BDI_ORGANIZATION_ID` | Solenergy's organization UUID in the BDI/MemberFlow database | BDI admin → Organizations → Solenergy → id, or `select id from organizations where slug = 'solenergy';` |
| `BDI_API_BASE` | Base URL of the BDI central submissions API used by `/api/contact` and `/api/newsletter` | `https://bdicorporate.com` for prod |
| `BDI_ORGANIZATION_ID` | Server-side mirror of the org UUID (read by the API proxy) | Same UUID as above |
| `NEXT_PUBLIC_BRAND_NAME` | Display name for SEO defaults | `Solenergy Power` |
| `RESEND_API_KEY` | Resend API key (only used if the site falls back to direct sends) | <https://resend.com/api-keys> |

> :warning: **Never commit real values.** `.env.local` and `.env.*` are
> already gitignored; `.env.example` is the only env file tracked in git
> and it carries placeholders only. If you discover a secret has been
> committed, rotate it immediately in the issuing dashboard (Supabase,
> Resend, etc.) before scrubbing the repo.

## Notes
- Remote images are whitelisted in `next.config.mjs`.
- Styling matches Solenergy: 40px rounded cards, soft shadows, solar-themed gradients.
