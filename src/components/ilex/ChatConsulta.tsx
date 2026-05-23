import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { topicLabels } from "./knowledgeBase";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatConsultaProps {
  pendingQuery?: string | null;
  onQueryConsumed?: () => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-legal`;

const chatTopics = [
  { key: "usucapion", icon: "🏠", label: "Usucapión" },
  { key: "herencia_intestada", icon: "📜", label: "Herencia" },
  { key: "divorcio_tramite", icon: "💔", label: "Divorcio" },
  { key: "pension_alimenticia", icon: "👶", label: "Pensión alimenticia" },
  { key: "arrendamiento", icon: "🔑", label: "Arrendamiento" },
  { key: "despojo", icon: "🚫", label: "Despojo" },
  { key: "compraventa", icon: "🤝", label: "Compraventa" },
  { key: "cobranza_judicial", icon: "💰", label: "Cobranza" },
  { key: "contratos_revision", icon: "📝", label: "Contratos" },
  { key: "derecho_penal_admin", icon: "🚔", label: "Penal" },
  { key: "patria_potestad", icon: "⚖", label: "Patria potestad" },
  { key: "ejido", icon: "🌾", label: "Ejido" },
  { key: "amparo", icon: "🛡", label: "Amparo" },
  { key: "abogado_deshonesto", icon: "⚠", label: "Abogados deshonestos" },
];

async function streamChat(
  messages: Message[],
  onDelta: (text: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      onError(errorData.error || "Error al consultar la IA");
      return;
    }

    if (!resp.body) {
      onError("Sin respuesta del servidor");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    // flush remaining
    if (buffer.trim()) {
      for (let raw of buffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Error de conexión");
  }
}

const ChatConsulta = ({ pendingQuery, onQueryConsumed }: ChatConsultaProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hola, soy **iLEX POTOSÍ** 🤖⚖️. Estoy aquí para darte orientación legal honesta y clara sobre tus derechos en San Luis Potosí.\n\n✅ Siempre te diré la verdad del asunto: qué opciones tienes, cuánto puede costar y si existe alguna salida gratuita. También puedes tocar uno de los temas de arriba.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const sendToAI = useCallback(
    (userText: string) => {
      const userMsg: Message = { role: "user", content: userText };
      setMessages((prev) => [...prev, userMsg]);
      setIsStreaming(true);

      let assistantSoFar = "";

      const allMessages = [...messages, userMsg].filter(
        (m) => m.role === "user" || m.role === "assistant"
      );

      streamChat(
        allMessages,
        (chunk) => {
          assistantSoFar += chunk;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && prev.length > 1 && assistantSoFar.startsWith(chunk.length < assistantSoFar.length ? assistantSoFar.slice(0, chunk.length) : chunk)) {
              // Update last assistant message
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
              );
            }
            if (last?.role === "user") {
              return [...prev, { role: "assistant", content: assistantSoFar }];
            }
            // Update existing assistant message
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
            );
          });
        },
        () => {
          setIsStreaming(false);
          setMessageCount((prev) => {
            const next = prev + 1;
            if (next >= 3 && !emailSent && !showEmailPrompt) {
              setShowEmailPrompt(true);
            }
            return next;
          });
        },
        (err) => {
          setIsStreaming(false);
          toast.error(err);
        }
      );
    },
    [messages]
  );

  useEffect(() => {
    if (pendingQuery) {
      sendToAI(pendingQuery);
      onQueryConsumed?.();
    }
  }, [pendingQuery, onQueryConsumed, sendToAI]);

  const handleSend = () => {
    const q = input.trim();
    if (!q || isStreaming) return;
    setInput("");
    sendToAI(q);
  };

  const handleTopicClick = (key: string) => {
    if (isStreaming) return;
    setActiveTopic(key);
    const label = topicLabels[key] || key;
    sendToAI(label);
  };

  return (
    <section id="consulta" className="py-[90px] px-5 md:px-10 bg-background">
      <div className="container">
        <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">
          Consulta Legal con IA
        </p>
        <h2
          className="font-display font-extrabold text-cream leading-[1.1] tracking-[-1px] mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
        >
          Pregúntame lo que necesitas
        </h2>
        <p className="text-base text-cream/70 leading-[1.8] max-w-[560px]">
          Usa el chat o selecciona un tema. Respondo con inteligencia artificial basada en la legislación vigente de SLP.
        </p>

        <div className="mt-12 max-w-[860px] mx-auto bg-card rounded-[20px] shadow-ilex-lg overflow-hidden border border-copper/15">
          {/* Header */}
          <div
            className="flex items-center gap-3 px-6 py-[18px]"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--teal-deep)), hsl(var(--teal)))",
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <h3 className="font-display text-sm font-bold text-cream flex-1">
              🤖⚖ iLEX POTOSÍ — Asesor Legal IA
            </h3>
            <span className="font-display text-[10px] text-cream/50 tracking-[1px]">
              {isStreaming ? "● PENSANDO..." : "● EN LÍNEA"}
            </span>
          </div>

          {/* Topics */}
          <div className="flex gap-2 px-5 py-4 overflow-x-auto border-b border-copper/15 scrollbar-none">
            {chatTopics.map((t) => (
              <button
                key={t.key}
                onClick={() => handleTopicClick(t.key)}
                disabled={isStreaming}
                className={`shrink-0 border-[1.5px] font-display text-xs font-medium px-3.5 py-1.5 rounded-full cursor-pointer transition-all whitespace-nowrap disabled:opacity-50 ${
                  activeTopic === t.key
                    ? "bg-copper border-copper text-primary-foreground"
                    : "bg-transparent border-copper/25 text-cream/70 hover:bg-copper hover:border-copper hover:text-primary-foreground"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="h-[520px] overflow-y-auto px-6 py-5 flex flex-col gap-3.5 scroll-smooth chat-scroll"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 max-w-full ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center font-display text-[11px] font-extrabold mt-0.5 ${
                    msg.role === "user"
                      ? "bg-copper text-primary-foreground"
                      : "bg-copper/20 text-copper text-sm border border-copper/40"
                  }`}
                >
                  {msg.role === "user" ? "TÚ" : "🤖"}
                </div>
                <div
                  className={`chat-bubble px-4 py-3 text-[13px] leading-[1.7] max-w-[78%] ${
                    msg.role === "user"
                      ? "rounded-[12px_3px_12px_12px] font-display text-cream"
                      : "rounded-[3px_12px_12px_12px] border border-copper/15 border-t-[3px] border-t-copper text-foreground bg-background"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background:
                            "linear-gradient(135deg, hsl(var(--teal-mid)), hsl(var(--teal-lit)))",
                        }
                      : undefined
                  }
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <div className="prose prose-sm max-w-none chat-md">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center bg-copper/20 text-copper border border-copper/40 text-sm">
                  🤖
                </div>
                <div className="px-4 py-3 bg-background border border-copper/15 rounded-[3px_12px_12px_12px]">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce-3" />
                  </div>
                </div>
              </div>
            )}

            {/* Email transcript prompt */}
            {showEmailPrompt && !emailSent && !isStreaming && (
              <div className="flex gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center bg-copper/20 text-copper border border-copper/40 text-sm">
                  🤖
                </div>
                <div className="px-4 py-3 rounded-[3px_12px_12px_12px] border border-copper/15 border-t-[3px] border-t-copper text-foreground bg-background max-w-[78%]">
                  <p className="font-display text-[13px] font-semibold text-cream mb-2">
                    📧 ¿Quieres recibir una copia de esta conversación en tu correo?
                  </p>
                  {!emailInput && emailInput === "" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEmailInput("escribir")}
                        className="font-display text-xs font-semibold px-4 py-2 rounded-lg bg-copper text-primary-foreground border-none cursor-pointer hover:-translate-y-px transition-all"
                      >
                        ✅ Sí, quiero
                      </button>
                      <button
                        onClick={() => { setShowEmailPrompt(false); setEmailSent(true); }}
                        className="font-display text-xs font-semibold px-4 py-2 rounded-lg bg-muted text-cream/70 border-none cursor-pointer hover:-translate-y-px transition-all"
                      >
                        No, gracias
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <input
                        type="email"
                        placeholder="tu@correo.com"
                        value={emailInput === "escribir" ? "" : emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="flex-1 border-[1.5px] border-copper/15 rounded-lg px-3 py-2 font-display text-[13px] text-foreground bg-background outline-none transition-colors focus:border-teal-mid placeholder:text-muted-foreground"
                      />
                      <button
                        disabled={emailSending || !emailInput || emailInput === "escribir"}
                        onClick={async () => {
                          if (!emailInput || emailInput === "escribir") return;
                          setEmailSending(true);
                          try {
                            const transcript = messages
                              .map((m) => `${m.role === "user" ? "TÚ" : "iLEX"}: ${m.content}`)
                              .join("\n\n---\n\n");
                            const { error } = await supabase.functions.invoke("send-chat-transcript", {
                              body: { email: emailInput, transcript },
                            });
                            if (error) throw error;
                            toast.success("✅ Conversación enviada a " + emailInput);
                            setEmailSent(true);
                            setShowEmailPrompt(false);
                          } catch {
                            toast.error("No se pudo enviar. Intenta de nuevo.");
                          } finally {
                            setEmailSending(false);
                          }
                        }}
                        className="font-display text-xs font-semibold px-4 py-2 rounded-lg bg-copper text-primary-foreground border-none cursor-pointer hover:-translate-y-px transition-all disabled:opacity-50"
                      >
                        {emailSending ? "Enviando..." : "Enviar"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-5 py-3.5 border-t border-copper/15 flex gap-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Escribe tu duda legal aquí..."
              rows={1}
              disabled={isStreaming}
              className="flex-1 border-[1.5px] border-copper/15 rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none resize-none min-h-[42px] max-h-[100px] transition-colors focus:border-teal-mid placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isStreaming}
              className="bg-copper border-none text-primary-foreground w-[42px] h-[42px] rounded-lg cursor-pointer text-base flex items-center justify-center transition-all hover:bg-[#d4933a] hover:-translate-y-px shrink-0 disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Chat markdown styles */}
      <style>{`
        .chat-md h1, .chat-md h2, .chat-md h3, .chat-md h4 {
          font-family: 'Outfit', sans-serif;
          color: hsl(var(--teal));
          margin: 10px 0 5px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 3px;
          border-bottom: 1.5px solid hsl(var(--copper));
        }
        .chat-md h1:first-child, .chat-md h2:first-child, .chat-md h3:first-child { margin-top: 0; }
        .chat-md p { margin: 4px 0; font-size: 13px; }
        .chat-md ul, .chat-md ol { margin: 4px 0; padding-left: 18px; font-size: 12.5px; }
        .chat-md li { margin: 2px 0; }
        .chat-md strong, .chat-md b { color: hsl(var(--teal)); font-weight: 700; }
        .chat-md code {
          font-size: 10px; font-weight: 600;
          background: hsl(var(--teal-pale)); color: hsl(var(--teal));
          padding: 2px 6px; border-radius: 4px;
          border: 1px solid hsla(var(--teal), 0.2);
        }
        .chat-md blockquote {
          background: hsl(var(--green-pale)); border-left: 3px solid hsl(var(--green));
          border-radius: 4px; padding: 8px 12px; margin: 8px 0;
          font-size: 12px; color: #0f4028;
        }
        .chat-md hr {
          border: none; border-top: 1px solid hsl(var(--cream-dark)); margin: 8px 0;
        }
      `}</style>
    </section>
  );
};

export default ChatConsulta;
