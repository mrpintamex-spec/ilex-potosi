-- Índices para acelerar consultas de detección de abuso
CREATE INDEX IF NOT EXISTS idx_email_audit_log_ip_created
  ON public.email_audit_log (client_ip, created_at DESC)
  WHERE client_ip IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_email_audit_log_domain_created
  ON public.email_audit_log (email_domain, created_at DESC)
  WHERE email_domain IS NOT NULL;

-- Tabla de alertas de abuso
CREATE TABLE public.abuse_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  scope TEXT NOT NULL,                  -- 'ip' o 'domain'
  scope_value TEXT NOT NULL,            -- IP o dominio detectado
  window_minutes INTEGER NOT NULL,
  failure_count INTEGER NOT NULL,
  outcomes_breakdown JSONB,             -- { "invalid_transcript": 7, "provider_error": 3 }
  window_start TIMESTAMP WITH TIME ZONE NOT NULL,
  window_end TIMESTAMP WITH TIME ZONE NOT NULL,
  notified BOOLEAN NOT NULL DEFAULT false,
  notification_error TEXT
);

-- Evita duplicar alertas para la misma ventana/scope
CREATE UNIQUE INDEX idx_abuse_alerts_dedupe
  ON public.abuse_alerts (scope, scope_value, window_start);

CREATE INDEX idx_abuse_alerts_created
  ON public.abuse_alerts (created_at DESC);

-- RLS: tabla privada — solo accesible vía service role desde edge functions
ALTER TABLE public.abuse_alerts ENABLE ROW LEVEL SECURITY;
-- Sin policies públicas: ningún cliente anónimo o autenticado puede leer/escribir

-- Habilitar extensiones para cron + http (si no están)
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;