-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule keep-alive function to run every 5 minutes
SELECT cron.schedule(
  'keep-database-alive',
  '*/5 * * * *', -- every 5 minutes
  $$
  SELECT
    net.http_post(
        url:='https://fmaryuhfiftzleqtlgos.supabase.co/functions/v1/keep-alive',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtYXJ5dWhmaWZ0emxlcXRsZ29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NzAwNDMsImV4cCI6MjA2NDA0NjA0M30.GicKq41Lr3Z3QddtqrE8uhUaQ1Uf8YJU8OvdD1t8dEo"}'::jsonb,
        body:='{"keepAlive": true}'::jsonb
    ) as request_id;
  $$
);