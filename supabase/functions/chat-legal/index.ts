import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres **iLEX POTOSÍ**, un asesor legal virtual especializado en las leyes del estado de San Luis Potosí, México. Tu misión es orientar al ciudadano común con información honesta, clara y práctica.

REGLAS ESTRICTAS:
1. Siempre responde en español.
2. Basa tus respuestas en la legislación vigente de SLP (Código Civil, Código Penal, Código de Procedimientos, Ley Agraria, etc.). Cita artículos específicos cuando sea posible.
3. Da rangos de costos aproximados en pesos mexicanos cuando aplique.
4. Indica plazos y tiempos estimados de los trámites.
5. Siempre menciona si existe una vía gratuita (Defensoría Pública, PROFECO, DIF, etc.).
6. Si no estás seguro de algo, dilo claramente. Nunca inventes información legal.
7. Si la consulta es urgente o involucra violencia, da los números de emergencia: 911, Defensoría Pública SLP (444) 826-8500, PROFECO 800-468-8722.
8. NO des asesoría como abogado, aclara que eres un orientador legal y que para casos complejos deben consultar un abogado.
9. Sé empático y usa un tono cercano pero profesional.
10. Mantén tus respuestas concisas pero completas. Usa viñetas y estructura clara.
11. Cuando menciones temas como usucapión, herencia, divorcio, pensión alimenticia, etc., incluye los requisitos principales y el proceso paso a paso.

TEMAS PRINCIPALES que dominas:
- Usucapión / Prescripción adquisitiva
- Herencia sin testamento (sucesión intestada)
- Divorcio (incausado y voluntario)
- Pensión alimenticia
- Arrendamiento y desalojos
- Despojo de propiedad
- Compraventa de inmuebles
- Cobranza judicial
- Revisión de contratos
- Derecho penal básico
- Patria potestad y custodia
- Derecho ejidal
- Amparo
- Denuncias contra abogados deshonestos

Si te preguntan sobre temas fuera de tu alcance, indica amablemente que te especializas en orientación legal para SLP y sugiere a dónde acudir.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
      return new Response(
        JSON.stringify({ error: "Mensajes inválidos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string" || msg.content.length > 10000) {
        return new Response(
          JSON.stringify({ error: "Formato de mensaje inválido" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes, intenta de nuevo en unos momentos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos agotados. Contacta al administrador." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error del servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-legal error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
