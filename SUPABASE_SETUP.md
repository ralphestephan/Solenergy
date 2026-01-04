# Supabase Integration - Complete Setup

## ✅ Integration Complete

Your Supabase integration is now fully configured with the BDI Systems schema!

## Configuration

### Environment Variables

The following are already configured in the code (with fallbacks), but you can also set them in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://REDACTED_SUPABASE_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REDACTED_SUPABASE_ANON_KEY
RESEND_API_KEY=REDACTED_RESEND_API_KEY
```

### Organization ID

**Solenergy Organization ID**: `REDACTED_ORG_UUID`

This is automatically included in all database inserts.

## Database Tables

### 1. `contact_form_submissions`

Stores all contact form submissions with:
- Organization ID (auto-set)
- Name, email, phone, message
- Status tracking (new, in_progress, resolved, spam)
- Source tracking (website, facebook, etc.)
- Metadata JSONB for additional form fields

### 2. `newsletter_subscribers`

Stores newsletter subscriptions with:
- Organization ID (auto-set)
- Email (unique per organization)
- Name, phone (optional)
- Status (active, unsubscribed, bounced, spam)
- Source tracking
- Tags array for segmentation
- Metadata JSONB

## Features

✅ **Contact Forms**:
- Saves to `contact_form_submissions` table
- Sends branded confirmation email to user
- Sends notification email to admin (info@solenergypower.com)
- All form fields stored in metadata JSONB

✅ **Newsletter Subscriptions**:
- Saves to `newsletter_subscribers` table
- Uses UPSERT to handle duplicate emails gracefully
- Sends branded welcome email to subscriber
- Sends notification email to admin
- Automatically sets source as 'website'

## Email Templates

All emails use your brand colors (yellow/orange gradient) and include:
- Updated contact information
- Professional branding
- Mobile-responsive design

## Testing

To test the integration:

1. **Contact Form**: Submit a form at `/contact`
2. **Newsletter**: Subscribe via footer or newsletter form

Both will:
- Save to Supabase
- Send confirmation emails
- Send admin notifications

## Notes

- The integration uses the BDI Systems schema exactly as provided
- Organization ID is automatically included in all inserts
- Newsletter uses UPSERT to prevent duplicate errors
- All additional form fields are stored in the `metadata` JSONB field
- Email sending continues even if database save fails (graceful degradation)
