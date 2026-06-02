// lib/supabase.ts
//
// Supabase browser/server client for the Solenergy site.
//
// All connection values MUST come from environment variables. No secrets or
// project identifiers are allowed to be hardcoded here — the repo is public
// and prior hardcoded fallbacks leaked the prod Supabase URL, anon JWT, and
// organization UUID. If env vars are missing the client throws at call time
// so a misconfigured deploy fails fast instead of silently pointing at a
// stale project.
//
// Required env (set in .env.local for dev and in Vercel for prod):
//   NEXT_PUBLIC_SUPABASE_URL          e.g. https://<project-ref>.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY     anon (public) JWT from the Supabase dashboard
//   NEXT_PUBLIC_BDI_ORGANIZATION_ID   Solenergy's organization UUID in BDI/MemberFlow

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Solenergy Organization ID — sourced from env so the same code can run for
// preview branches / other tenants without code edits.
export const SOLENERGY_ORG_ID = process.env.NEXT_PUBLIC_BDI_ORGANIZATION_ID ?? '';

let _client: SupabaseClient | null = null;

/**
 * Lazily build a Supabase client. Throws if required env vars are missing
 * so misconfiguration surfaces immediately at the first call site instead of
 * silently writing to the wrong project.
 */
export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).',
    );
  }
  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

// Backwards-compatible named export. Code that imported `supabase` directly
// will still work; the client is built on first property access.
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseClient();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

// Types for our tables matching the BDI Systems schema
export interface ContactFormSubmission {
  id?: string;
  organization_id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status?: 'new' | 'in_progress' | 'resolved' | 'spam';
  source?: string;
  metadata?: Record<string, any>;
  assigned_to?: string;
  replied_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  organization_id: string;
  email: string;
  name?: string;
  phone?: string;
  source?: string;
  status?: 'active' | 'unsubscribed' | 'bounced' | 'spam';
  tags?: string[];
  metadata?: Record<string, any>;
  subscribed_at?: string;
  unsubscribed_at?: string;
  created_at?: string;
  updated_at?: string;
}
