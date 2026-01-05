# Resend Setup Checklist

## ✅ Common Issues When Emails Don't Send

### 1. Domain Verification (MOST COMMON)
**Problem**: `solenergypower.com` domain is not verified in Resend

**Solution**:
1. Go to Resend Dashboard → **Domains**
2. Add `solenergypower.com` as a domain
3. Add the DNS records Resend provides to your domain DNS settings
4. Wait for verification (usually takes a few minutes)

**OR** (for testing):
- Use a verified domain like `onboarding.resend.dev` temporarily
- Change `from: "Solenergy <info@solenergypower.com>"` to `from: "Solenergy <onboarding@resend.dev>"`

### 2. API Key Issues
**Problem**: Invalid or inactive API key

**Check**:
- Go to Resend Dashboard → **API Keys**
- Verify the key `re_GNE1Zft7_FK2SbKxwuNFrxumZQNP9wVi1` is active
- Make sure it's the correct key (not a test key that's expired)

### 3. Email Address Issues
**Problem**: Invalid "to" email address

**Check**:
- Contact form sends to: `form.email` (user's email)
- Newsletter sends to: `email` (subscriber's email)
- Admin notifications send to: `info@solenergypower.com`

**Note**: All "to" addresses must be valid email addresses

### 4. Silent Failures (Now Fixed)
**Problem**: Errors were being caught but not logged properly

**Fixed**: Added detailed error logging that shows:
- Error message
- Status code
- Response body
- Full error object

### 5. Check Logs
**Where to check**:
- **Local development**: Check your terminal/console where `npm run dev` is running
- **Production (Vercel)**: 
  - Go to Vercel Dashboard → Your Project → **Functions** tab
  - Click on a function invocation to see logs
  - Look for `✅` (success) or `❌` (error) messages

### 6. Resend Dashboard Logs
**Check**: 
- Go to Resend Dashboard → **Logs** or **Emails**
- Look for recent email attempts
- Check status (sent, failed, pending)
- Check error messages if failed

## 🔧 Quick Test

To test if Resend is working, you can temporarily use a verified domain:

```typescript
// Change this:
from: "Solenergy <info@solenergypower.com>"

// To this (temporarily for testing):
from: "Solenergy <onboarding@resend.dev>"
```

If emails work with `onboarding@resend.dev`, then the issue is domain verification.

## 📋 Next Steps

1. Check Resend Dashboard → Domains → Verify `solenergypower.com` is verified
2. Check Resend Dashboard → Logs → See if emails are being attempted
3. Check Vercel Function Logs → Look for error messages
4. If domain not verified, either:
   - Verify the domain in Resend
   - OR use `onboarding@resend.dev` for testing

