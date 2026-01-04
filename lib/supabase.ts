// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://REDACTED_SUPABASE_REF.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'REDACTED_SUPABASE_ANON_KEY';

// Solenergy Organization ID
export const SOLENERGY_ORG_ID = 'REDACTED_ORG_UUID';

// Create client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

