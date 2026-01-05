# API Data Structure - How Data is Sent to Supabase

This document shows exactly how data is being sent from the website to Supabase.

---

## 📝 Contact Form (`/api/contact/route.ts`)

### Request Body Received from Frontend:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+961 71 654 956",
  city: "Beirut",
  reason: "Solar system installation",
  property: "Residential home",
  solutions: ["Solar Panels", "Battery Storage"],
  budget: "$7,000–$15,000",
  contact_pref: "Email",
  message: "I need a quote for solar installation"
}
```

### Data Sent to Supabase:
```javascript
{
  organization_id: "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d",
  name: "John Doe",
  email: "john@example.com",
  phone: "+961 71 654 956",  // or null if not provided
  message: "I need a quote for solar installation",  // or null if not provided
  city: "Beirut",  // or null if not provided
  reason: "Solar system installation",  // or null if not provided
  budget: "$7,000–$15,000",  // or null if not provided
  contact_pref: "Email",  // or null if not provided
  source: "website",
  status: "new",
  metadata: {
    property: "Residential home",
    solutions: ["Solar Panels", "Battery Storage"]
  }
  // Note: metadata is sent as object, NOT stringified
  // If no extra fields: metadata: {}
}
```

### Code Implementation:
```typescript
// Prepare metadata - only for extra data NOT in the database schema
const metadata: Record<string, any> = {};
if (form.property) metadata.property = form.property;
if (form.solutions) {
  metadata.solutions = Array.isArray(form.solutions) ? form.solutions : [form.solutions];
}

const { data, error } = await supabase
  .from('contact_form_submissions')
  .insert([
    {
      organization_id: SOLENERGY_ORG_ID, // "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d"
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || null,
      city: form.city || null,
      reason: form.reason || null,
      budget: form.budget || null,
      contact_pref: form.contact_pref || null,
      source: 'website',
      status: 'new',
      metadata: metadata, // Object, not stringified
    }
  ])
  .select();
```

---

## 📧 Newsletter Subscription (`/api/newsletter/route.ts`)

### Request Body Received from Frontend:
```javascript
{
  email: "subscriber@example.com",
  name: "Jane Doe",  // optional
  phone: "+961 71 654 956"  // optional
}
```

### Data Sent to Supabase:
```javascript
{
  organization_id: "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d",
  email: "subscriber@example.com",
  name: "Jane Doe",  // only included if provided
  phone: "+961 71 654 956",  // only included if provided
  source: "website",
  status: "active"
  // No metadata field sent (not needed)
}
```

### Code Implementation:
```typescript
// Prepare data for Supabase - only include fields that exist in the schema
const insertData: any = {
  organization_id: SOLENERGY_ORG_ID, // "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d"
  email: email,
  source: 'website',
  status: 'active',
};

// Only add optional fields if they exist
if (name) insertData.name = name;
if (phone) insertData.phone = phone;

const { data, error } = await supabase
  .from('newsletter_subscribers')
  .upsert(
    insertData,
    {
      onConflict: 'organization_id,email',
    }
  )
  .select();
```

---

## 🔑 Key Points:

1. **Organization ID**: Always included: `"3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d"`

2. **Metadata**: 
   - Sent as JavaScript object (NOT stringified/JSON.stringify)
   - Can be empty object `{}` if no extra fields
   - Only contains data NOT in the database schema

3. **Using ANON Key**: 
   - Using `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not service_role)
   - Client created with: `createClient(supabaseUrl, supabaseAnonKey)`

4. **Upsert for Newsletter**: 
   - Uses `upsert` with `onConflict: 'organization_id,email'`
   - Prevents duplicate errors

5. **Contact Form**: 
   - Uses `insert` (allows multiple submissions)

---

## 🚨 RLS Error Details:

**Error Code**: `42501`
**Message**: `new row violates row-level security policy for table "newsletter_subscribers"`

This means the RLS policies need to be set up in Supabase. The data structure is correct, but the database is blocking the insert due to missing or incorrect RLS policies.

