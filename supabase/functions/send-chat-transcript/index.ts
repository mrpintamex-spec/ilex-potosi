import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getClientIp(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip");
}

// Fire-and-forget audit log — never throws to caller
async function logAudit(entry: {
  email?: string;
  transcriptLength?: number;
  clientIp: string | null;
  userAgent: string | null;
  outcome: string;
  statusCode: number;
  errorDetail?: string;
}) {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) {
      console.warn("Audit skipped: missing service credentials");
      return;
    }
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    let email_hash: string | null = null;
    let email_domain: string | null = null;
    if (entry.email && typeof entry.email === "string") {
      const normalized = entry.email.trim().toLowerCase();
      email_hash = await sha256Hex(normalized);
      const at = normalized.lastIndexOf("@");
      email_domain = at >= 0 ? normalized.slice(at + 1).slice(0, 253) : null;
    }

    const { error } = await supabase.from("email_audit_log").insert({
      email_hash,
      email_domain,
      transcript_length: entry.transcriptLength ?? null,
      client_ip: entry.clientIp,
      user_agent: entry.userAgent ? entry.userAgent.slice(0, 500) : null,
      outcome: entry.outcome,
      status_code: entry.statusCode,
      error_detail: entry.errorDetail ? entry.errorDetail.slice(0, 500) : null,
    });
    if (error) console.error("Audit insert error:", error.message);
  } catch (e) {
    console.error("Audit unexpected error:", e);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = getClientIp(req);
  const userAgent = req.headers.get("user-agent");

  let email: string | undefined;
  let transcript: string | undefined;

  try {
    const body = await req.json();
    email = body?.email;
    transcript = body?.transcript;

    if (!email || !transcript) {
      await logAudit({
        email,
        clientIp,
        userAgent,
        outcome: "missing_fields",
        statusCode: 400,
      });
      return new Response(JSON.stringify({ error: "Email y transcripción requeridos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isValidEmail(email)) {
      await logAudit({
        email,
        clientIp,
        userAgent,
        outcome: "invalid_email",
        statusCode: 400,
      });
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (typeof transcript !== "string" || transcript.length > 100000) {
      await logAudit({
        email,
        transcriptLength: typeof transcript === "string" ? transcript.length : 0,
        clientIp,
        userAgent,
        outcome: "invalid_transcript",
        statusCode: 400,
      });
      return new Response(JSON.stringify({ error: "Transcripción inválida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Format transcript as HTML
    const htmlTranscript = transcript
      .split("\n\n---\n\n")
      .map((block: string) => {
        const isUser = block.startsWith("TÚ:");
        const content = escapeHtml(block.replace(/^(TÚ|iLEX):\s*/, ""));
        const label = isUser ? "TÚ" : "iLEX POTOSÍ 🤖⚖️";
        const bgColor = isUser ? "#1a5c4c" : "#faf8f5";
        const textColor = isUser ? "#ffffff" : "#1a3a2a";
        const labelColor = isUser ? "#e8a54b" : "#1a5c4c";
        return `
          <div style="margin-bottom:12px;">
            <div style="font-weight:700;font-size:12px;color:${labelColor};margin-bottom:4px;">${label}</div>
            <div style="background:${bgColor};color:${textColor};padding:12px 16px;border-radius:10px;font-size:14px;line-height:1.7;">
              ${content.replace(/\n/g, "<br>")}
            </div>
          </div>`;
      })
      .join("");

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:linear-gradient(135deg,#1a3a2a,#1a5c4c);padding:20px 24px;border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff;font-size:20px;margin:0;">🤖⚖️ iLEX POTOSÍ</h1>
          <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:4px 0 0;">Copia de tu consulta legal</p>
        </div>
        <div style="background:#ffffff;padding:24px;border:1px solid #e8e0d4;border-top:none;border-radius:0 0 12px 12px;">
          ${htmlTranscript}
          <hr style="border:none;border-top:1px solid #e8e0d4;margin:20px 0;">
          <p style="font-size:11px;color:#999;text-align:center;">
            Este correo fue generado por iLEX POTOSÍ — orientación legal gratuita para San Luis Potosí.<br>
            <a href="https://ilex-potosi.lovable.app" style="color:#1a5c4c;">ilex-potosi.lovable.app</a>
          </p>
        </div>
      </div>`;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "iLEX POTOSÍ <noreply@ilex-potosi.lovable.app>",
          to: [email],
          subject: "📋 Tu consulta legal — iLEX POTOSÍ",
          html,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        await logAudit({
          email,
          transcriptLength: transcript.length,
          clientIp,
          userAgent,
          outcome: "provider_error",
          statusCode: 502,
          errorDetail: `resend_${res.status}`,
        });
        return new Response(JSON.stringify({ error: "Error al enviar el correo" }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      console.log("No RESEND_API_KEY configured. Transcript for:", email);
      console.log("Would send transcript with", transcript.length, "chars");
    }

    await logAudit({
      email,
      transcriptLength: transcript.length,
      clientIp,
      userAgent,
      outcome: "success",
      statusCode: 200,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    await logAudit({
      email,
      transcriptLength: typeof transcript === "string" ? transcript.length : undefined,
      clientIp,
      userAgent,
      outcome: "internal_error",
      statusCode: 500,
      errorDetail: e instanceof Error ? e.message.slice(0, 500) : String(e).slice(0, 500),
    });
    return new Response(JSON.stringify({ error: "Error al enviar el correo" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
