// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uwhamhqmwduyzbyqkjod.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aGFtaHFtd2R1eXpieXFram9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzI1OTUsImV4cCI6MjA3Nzc0ODU5NX0.QJdRkGoBK5kBDiKuFKBDGFf4zempzGG5-pHAr-ujbBY';

// Solenergy Organization ID
export const SOLENERGY_ORG_ID = '3041e8aa-1139-42c9-ba3c-ebf9f2d98b5d';

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

