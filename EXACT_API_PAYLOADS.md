# Exact API Payloads Being Sent to Supabase

This shows the EXACT structure of data being sent to Supabase for debugging RLS issues.

---

## 🔧 Supabase Client Configuration

```typescript
// lib/supabase.ts
const supabaseUrl = 'https://uwhamhqmwduyzbyqkjod.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // ANON key
export const SOLENERGY_ORG_ID = '3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d'

const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 📝 Contact Form - Exact Payload

### HTTP Request:
```
POST /rest/v1/contact_form_submissions
Headers:
  apikey: [ANON_KEY]
  Authorization: Bearer [ANON_KEY]
  Content-Type: application/json
  Prefer: return=representation
```

### JSON Body Being Sent:
```json
{
  "organization_id": "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+961 71 654 956",
  "message": "I need a solar installation",
  "city": "Beirut",
  "reason": "Solar system installation",
  "budget": "$7,000–$15,000",
  "contact_pref": "Email",
  "source": "website",
  "status": "new",
  "metadata": {
    "property": "Residential home",
    "solutions": ["Solar Panels", "Battery Storage"]
  }
}
```

### Example with minimal data:
```json
{
  "organization_id": "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": null,
  "message": null,
  "city": null,
  "reason": null,
  "budget": null,
  "contact_pref": null,
  "source": "website",
  "status": "new",
  "metadata": {}
}
```

---

## 📧 Newsletter Subscription - Exact Payload

### HTTP Request:
```
POST /rest/v1/newsletter_subscribers
Headers:
  apikey: [ANON_KEY]
  Authorization: Bearer [ANON_KEY]
  Content-Type: application/json
  Prefer: resolution=merge-duplicates,return=representation
```

### JSON Body Being Sent (with name and phone):
```json
{
  "organization_id": "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d",
  "email": "subscriber@example.com",
  "name": "Jane Doe",
  "phone": "+961 71 654 956",
  "source": "website",
  "status": "active"
}
```

### JSON Body Being Sent (email only):
```json
{
  "organization_id": "3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d",
  "email": "subscriber@example.com",
  "source": "website",
  "status": "active"
}
```

**Note**: Uses `upsert` with `onConflict: 'organization_id,email'` to handle duplicates.

---

## ✅ Required RLS Policies

For these inserts to work, you need these RLS policies in Supabase:

### For `contact_form_submissions`:
```sql
CREATE POLICY "Allow public inserts to contact_form_submissions"
ON contact_form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

### For `newsletter_subscribers`:
```sql
CREATE POLICY "Allow public inserts to newsletter_subscribers"
ON newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

---

## 🔍 Verification Checklist

- [ ] RLS is enabled on both tables
- [ ] Policies allow INSERT for `anon` role
- [ ] Using ANON key (not service_role key)
- [ ] Organization ID is correct: `3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d`
- [ ] Tables exist: `contact_form_submissions` and `newsletter_subscribers`
- [ ] All required columns exist in the tables
- [ ] Metadata column is JSONB type (if used)

