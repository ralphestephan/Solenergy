# Environment Variables Setup

## Current Status

The credentials are currently **hardcoded as fallbacks** in the code, which means the app will work, but for better security, you should use environment variables.

## Option 1: Create .env.local File (Recommended for Local Development)

Create a file called `.env.local` in the root directory of your project (same level as `package.json`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://REDACTED_SUPABASE_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REDACTED_SUPABASE_ANON_KEY
RESEND_API_KEY=REDACTED_RESEND_API_KEY
```

**Important**: The `.env.local` file is already in `.gitignore`, so it won't be committed to git.

## Option 2: Keep Hardcoded (Current Setup)

The code already has the credentials as fallbacks, so it will work without creating a `.env.local` file. However, this is less secure.

## For Vercel Deployment

When deploying to Vercel, you need to add these environment variables in the Vercel dashboard:

1. Go to your project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Add these three variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://REDACTED_SUPABASE_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = REDACTED_SUPABASE_ANON_KEY
RESEND_API_KEY = REDACTED_RESEND_API_KEY
```

4. Make sure to set them for **Production**, **Preview**, and **Development** environments
5. Redeploy your site after adding the variables

## Quick Setup (Create .env.local)

If you want to create the `.env.local` file now, run this in your terminal:

**Windows (PowerShell):**
```powershell
@"
NEXT_PUBLIC_SUPABASE_URL=https://REDACTED_SUPABASE_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REDACTED_SUPABASE_ANON_KEY
RESEND_API_KEY=REDACTED_RESEND_API_KEY
"@ | Out-File -FilePath .env.local -Encoding utf8
```

Or simply create the file manually in your code editor.

## Summary

- **Current**: Credentials are hardcoded as fallbacks (works, but not ideal)
- **Recommended**: Create `.env.local` file in root directory
- **For Vercel**: Add environment variables in Vercel dashboard
- **Security**: `.env.local` is already in `.gitignore`, so it's safe

The app will work either way, but using `.env.local` is the best practice!

