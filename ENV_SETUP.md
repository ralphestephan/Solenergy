# Environment Variables Setup

## Current Status

Credentials are **required** in env vars. The previous hardcoded fallbacks
have been removed as part of the credential-rotation security fix. The app
will not start without the required env vars set.

See [`.env.example`](./.env.example) for the canonical list of variables.

## Option 1: Create .env.local File (Local Development)

Create a file called `.env.local` in the root directory of your project
(same level as `package.json`) by copying `.env.example` and filling in real
values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-jwt>
NEXT_PUBLIC_BDI_ORGANIZATION_ID=<solenergy-organization-uuid>
BDI_API_BASE=https://bdicorporate.com
BDI_ORGANIZATION_ID=<solenergy-organization-uuid>
RESEND_API_KEY=<your-resend-api-key>
```

**Important**: `.env.local` is gitignored, so it won't be committed.

## For Vercel Deployment

When deploying to Vercel, add the same environment variables in the Vercel
dashboard:

1. Go to your project in Vercel.
2. Go to **Settings** → **Environment Variables**.
3. Add each variable from `.env.example` with its real value.
4. Set them for **Production**, **Preview**, and **Development** environments.
5. Redeploy your site after adding the variables.

## Quick Setup (Create .env.local)

```bash
cp .env.example .env.local
# then edit .env.local and fill in real values from your password manager
```

## Where to find the values

- **Supabase URL / anon key** — Supabase dashboard → Project Settings → API.
- **Organization UUID** — BDI admin → Organizations → Solenergy → id, or run
  `select id from organizations where slug = 'solenergy';` against the BDI
  database.
- **Resend API key** — <https://resend.com/api-keys>.

## Summary

- **`.env.local`** for local dev — never committed.
- **Vercel dashboard** for prod / preview / dev environments.
- **Never** put real credentials in tracked files; `.env.example` is the only
  env file that lives in git, and it carries placeholders only.

