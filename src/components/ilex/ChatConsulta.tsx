import { useState, useRef, useEffect, useCallback } from "react";
import { findBestAnswer, KB, topicLabels } from "./knowledgeBase";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatConsultaProps {
  pendingQuery?: string | null;
  onQueryConsumed?: () => void;
}

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

const ChatConsulta = ({ pendingQuery, onQueryConsumed }: ChatConsultaProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Hola, soy <b>iLEX POTOSÍ</b>. Estoy aquí para darte orientación legal honesta y clara sobre tus derechos en San Luis Potosí.<br><br><div class="wtip">✅ Siempre te diré la verdad del asunto: qué opciones tienes, cuánto puede costar y si existe alguna salida gratuita. También puedes tocar uno de los temas de arriba.</div>`,
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => { scrollToBottom(); }, [messages, typing]);

  const processQuery = useCallback((query: string) => {
    setMessages((prev) => [...prev, { text: query, isUser: true }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { text: findBestAnswer(query), isUser: false }]);
    }, 900);
  }, []);

  useEffect(() => {
    if (pendingQuery) {
      processQuery(pendingQuery);
      onQueryConsumed?.();
    }
  }, [pendingQuery, onQueryConsumed, processQuery]);

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    processQuery(q);
  };

  const handleTopicClick = (key: string) => {
    setActiveTopic(key);
    if (!KB[key]) return;
    const label = topicLabels[key] || key;
    setMessages((prev) => [...prev, { text: label, isUser: true }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { text: KB[key].response(), isUser: false }]);
    }, 800);
  };

  return (
    <section id="consulta" className="py-[90px] px-5 md:px-10 bg-background">
      <div className="container">
        <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">Consulta Legal Gratuita</p>
        <h2 className="font-display font-extrabold text-teal-deep leading-[1.1] tracking-[-1px] mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
          Pregúntame lo que necesitas
        </h2>
        <p className="text-base text-foreground/70 leading-[1.8] max-w-[560px]">
          Usa el chat o selecciona un tema. Respondo con información real basada en la legislación vigente de SLP.
        </p>

        <div className="mt-12 max-w-[860px] mx-auto bg-card rounded-[20px] shadow-ilex-lg overflow-hidden border border-cream-dark">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-[18px]" style={{ background: "linear-gradient(135deg, hsl(var(--teal-deep)), hsl(var(--teal)))" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <h3 className="font-display text-sm font-bold text-primary-foreground flex-1">⚖ iLEX POTOSÍ — Asesor Legal</h3>
            <span className="font-display text-[10px] text-primary-foreground/50 tracking-[1px]">● EN LÍNEA</span>
          </div>

          {/* Topics */}
          <div className="flex gap-2 px-5 py-4 overflow-x-auto border-b border-cream-dark scrollbar-none">
            {chatTopics.map((t) => (
              <button
                key={t.key}
                onClick={() => handleTopicClick(t.key)}
                className={`shrink-0 border-[1.5px] font-display text-xs font-medium px-3.5 py-1.5 rounded-full cursor-pointer transition-all whitespace-nowrap ${
                  activeTopic === t.key
                    ? "bg-teal border-teal text-primary-foreground"
                    : "bg-transparent border-cream-dark text-foreground/70 hover:bg-teal hover:border-teal hover:text-primary-foreground"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={chatRef} className="h-[380px] overflow-y-auto px-6 py-5 flex flex-col gap-3.5 scroll-smooth chat-scroll">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 max-w-full ${msg.isUser ? "flex-row-reverse" : ""}`}>
                <div className={`w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center font-display text-[11px] font-extrabold mt-0.5 ${
                  msg.isUser ? "bg-copper text-primary-foreground" : "bg-teal text-primary-foreground text-sm"
                }`}>
                  {msg.isUser ? "TÚ" : "⚖"}
                </div>
                <div
                  className={`chat-bubble px-4 py-3 text-[13px] leading-[1.7] max-w-[78%] ${
                    msg.isUser
                      ? "rounded-[12px_3px_12px_12px] font-display text-primary-foreground/90"
                      : "rounded-[3px_12px_12px_12px] border border-cream-dark border-t-[3px] border-t-copper text-foreground bg-background"
                  }`}
                  style={msg.isUser ? { background: "linear-gradient(135deg, hsl(var(--teal-deep)), hsl(var(--teal)))" } : undefined}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            {typing && (
              <div className="flex gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full shrink-0 flex items-center justify-center bg-teal text-primary-foreground text-sm">⚖</div>
                <div className="px-4 py-3 bg-background border border-cream-dark rounded-[3px_12px_12px_12px]">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce-3" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-5 py-3.5 border-t border-cream-dark flex gap-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Escribe tu duda legal aquí..."
              rows={1}
              className="flex-1 border-[1.5px] border-cream-dark rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none resize-none min-h-[42px] max-h-[100px] transition-colors focus:border-teal-mid placeholder:text-muted-foreground"
            />
            <button onClick={handleSend} className="bg-copper border-none text-primary-foreground w-[42px] h-[42px] rounded-lg cursor-pointer text-base flex items-center justify-center transition-all hover:bg-[#d4933a] hover:-translate-y-px shrink-0">
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Chat bubble styles */}
      <style>{`
        .chat-bubble .stitle {
          font-family: 'Outfit', sans-serif;
          font-size: 11px; font-weight: 700;
          color: hsl(var(--teal));
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin: 10px 0 5px;
          padding-bottom: 4px;
          border-bottom: 1.5px solid hsl(var(--copper));
        }
        .chat-bubble .stitle:first-child { margin-top: 0; }
        .chat-bubble .wstep { display: flex; gap: 8px; margin: 4px 0; font-size: 12.5px; }
        .chat-bubble .wnum {
          background: hsl(var(--teal)); color: white;
          font-family: 'Outfit', sans-serif; font-size: 9px; font-weight: 700;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
        }
        .chat-bubble .wtip {
          background: hsl(var(--green-pale)); border-left: 3px solid hsl(var(--green));
          border-radius: 4px; padding: 8px 12px; margin: 8px 0;
          font-family: 'Outfit', sans-serif; font-size: 12px; color: #0f4028;
        }
        .chat-bubble .wwarn {
          background: hsl(var(--red-pale)); border-left: 3px solid hsl(var(--red));
          border-radius: 4px; padding: 8px 12px; margin: 8px 0;
          font-family: 'Outfit', sans-serif; font-size: 12px; color: #7a1010;
        }
        .chat-bubble .wcost {
          background: hsl(var(--copper-pale)); border-left: 3px solid hsl(var(--copper));
          border-radius: 4px; padding: 8px 12px; margin: 8px 0;
          font-family: 'Outfit', sans-serif; font-size: 12px; color: #6a4010;
        }
        .chat-bubble .wlaw {
          font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 600;
          background: hsl(var(--teal-pale)); color: hsl(var(--teal));
          padding: 2px 8px; border-radius: 4px; display: inline-block; margin: 2px;
          border: 1px solid hsla(var(--teal), 0.2);
        }
        .chat-bubble b { color: hsl(var(--teal)); font-weight: 700; }
      `}</style>
    </section>
  );
};

export default ChatConsulta;
