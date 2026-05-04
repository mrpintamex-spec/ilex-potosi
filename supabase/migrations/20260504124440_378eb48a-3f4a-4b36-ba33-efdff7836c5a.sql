-- Audit log for send-chat-transcript edge function
CREATE TABLE public.email_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email_hash TEXT,
  email_domain TEXT,
  transcript_length INTEGER,
  client_ip TEXT,
  user_agent TEXT,
  outcome TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  error_detail TEXT
);

-- Indexes for abuse-pattern queries
CREATE INDEX idx_email_audit_created_at ON public.email_audit_log (created_at DESC);
CREATE INDEX idx_email_audit_client_ip ON public.email_audit_log (client_ip, created_at DESC);
CREATE INDEX idx_email_audit_outcome ON public.email_audit_log (outcome, created_at DESC);
CREATE INDEX idx_email_audit_email_hash ON public.email_audit_log (email_hash, created_at DESC);

-- Enable RLS — no public policies; only service role can read/write
ALTER TABLE public.email_audit_log ENABLE ROW LEVEL SECURITY;