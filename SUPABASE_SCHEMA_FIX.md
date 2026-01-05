# Supabase Schema Fix - Removed `source` Column

## Error Fixed
```
Supabase error: {
  code: 'PGRST204',
  message: "Could not find the 'source' column of 'contact_form_submissions' in the schema cache"
}
```

## Changes Made

### 1. Contact Form (`app/api/contact/route.ts`)
**Removed** the `source: 'website'` field from the insert because it doesn't exist in your database schema.

**Before:**
```typescript
{
  organization_id: SOLENERGY_ORG_ID,
  name: form.name,
  email: form.email,
  // ... other fields
  source: 'website',  // ❌ This column doesn't exist
  status: 'new',
  metadata: metadata,
}
```

**After:**
```typescript
{
  organization_id: SOLENERGY_ORG_ID,
  name: form.name,
  email: form.email,
  // ... other fields
  // source field removed
  status: 'new',
  metadata: metadata,
}
```

### 2. Newsletter (`app/api/newsletter/route.ts`)
**Removed** the `source: 'website'` field from the insert as well.

**Before:**
```typescript
const insertData: any = {
  organization_id: SOLENERGY_ORG_ID,
  email: email,
  source: 'website',  // ❌ This column doesn't exist
  status: 'active',
};
```

**After:**
```typescript
const insertData: any = {
  organization_id: SOLENERGY_ORG_ID,
  email: email,
  // source field removed
  status: 'active',
};
```

## Notes

- The `source` field was being sent but doesn't exist in your database schema
- If you need to track the source of submissions/subscriptions, you can:
  1. Add it to the `metadata` object (if metadata column exists)
  2. Add the `source` column to your database schema
  3. Or just track it in metadata: `metadata: { source: 'website', ... }`

For now, I've removed it to fix the error. The contact forms and newsletter subscriptions will still work, they just won't have the `source` field tracked in the database.

