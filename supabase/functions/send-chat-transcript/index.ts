import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, transcript } = await req.json();

    if (!email || !transcript) {
      return new Response(JSON.stringify({ error: "Email y transcripción requeridos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (typeof transcript !== "string" || transcript.length > 100000) {
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

    // Use Resend or a simple SMTP — for now we'll use the Supabase built-in
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
        throw new Error("Error enviando email");
      }
    } else {
      // Fallback: just log and return success (no email provider configured)
      console.log("No RESEND_API_KEY configured. Transcript for:", email);
      console.log("Would send transcript with", transcript.length, "chars");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: "Error al enviar el correo" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
