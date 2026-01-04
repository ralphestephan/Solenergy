-- RLS Policies for Solenergy Integration
-- Run these in your Supabase SQL Editor

-- Enable RLS if not already enabled (usually already enabled)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy for newsletter_subscribers: Allow inserts from anyone (for website subscriptions)
CREATE POLICY "Allow public inserts to newsletter_subscribers"
ON newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy for newsletter_subscribers: Allow service role to read/write all
CREATE POLICY "Allow service role full access to newsletter_subscribers"
ON newsletter_subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy for contact_form_submissions: Allow inserts from anyone (for contact forms)
CREATE POLICY "Allow public inserts to contact_form_submissions"
ON contact_form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy for contact_form_submissions: Allow service role to read/write all
CREATE POLICY "Allow service role full access to contact_form_submissions"
ON contact_form_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Note: If you need to read these records from the application (not just insert),
-- you may need additional SELECT policies. For now, these policies allow:
-- 1. Public inserts (from your website)
-- 2. Service role full access (for admin operations)

-- If you want to allow authenticated users to read their own records, add:
-- CREATE POLICY "Users can read their own newsletter subscriptions"
-- ON newsletter_subscribers
-- FOR SELECT
-- TO authenticated
-- USING (auth.uid()::text = (SELECT user_id FROM newsletter_subscribers WHERE id = newsletter_subscribers.id));

