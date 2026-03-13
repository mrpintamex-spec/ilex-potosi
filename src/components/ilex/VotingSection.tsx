import { useState, useEffect } from "react";

const topics = [
  { id: "v1", icon: "🏭", title: "Derecho Laboral", desc: "Despidos injustificados, liquidaciones, demandas ante la Junta de Conciliación de SLP." },
  { id: "v2", icon: "🏥", title: "Negligencia Médica", desc: "Cómo presentar quejas ante COESAMED SLP, indemnizaciones y responsabilidad médica." },
  { id: "v3", icon: "💳", title: "Deudas con Bancos", desc: "Créditos impagables, acuerdos con bancos, derechos del deudor, buró de crédito en SLP." },
];

const VOTOS_KEY = "ilex_votos_2025_mes1";
const YAVOTE_KEY = "ilex_yavote_2025_mes1";

const VotingSection = () => {
  const [votos, setVotos] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem(VOTOS_KEY) || '{"v1":12,"v2":8,"v3":5}');
    } catch { return { v1: 12, v2: 8, v3: 5 }; }
  });
  const [yaVote, setYaVote] = useState<string | null>(() => localStorage.getItem(YAVOTE_KEY));

  useEffect(() => { localStorage.setItem(VOTOS_KEY, JSON.stringify(votos)); }, [votos]);

  const total = Object.values(votos).reduce((a, b) => a + b, 0);

  const handleVote = (id: string) => {
    if (yaVote) return;
    setVotos((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setYaVote(id);
    localStorage.setItem(YAVOTE_KEY, id);
  };

  return (
    <section className="py-20 px-5 md:px-10" style={{ background: "linear-gradient(135deg, hsl(var(--teal-deep)) 0%, #1a3d48 100%)" }}>
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">Participación ciudadana</p>
          <h2 className="font-display font-extrabold leading-[1.1] tracking-[-1px] mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#f5f0e8" }}>
            ¿Qué tema legal quieres<br />que agreguemos?
          </h2>
          <p className="font-display text-[15px] text-primary-foreground/60 max-w-[520px] mx-auto leading-[1.7]">
            Cada mes publicamos 3 temas propuestos. El más votado por la comunidad se integra a iLEX POTOSÍ el siguiente mes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[900px] mx-auto mb-10">
          {topics.map((t) => {
            const pct = total > 0 ? Math.round(((votos[t.id] || 0) / total) * 100) : 0;
            const isVoted = yaVote === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleVote(t.id)}
                className={`rounded-2xl p-7 px-6 cursor-pointer transition-all text-center border hover:-translate-y-[3px] ${
                  isVoted
                    ? "border-copper bg-copper/[0.12]"
                    : "border-primary-foreground/10 bg-primary-foreground/[0.06] hover:bg-primary-foreground/10 hover:border-copper/40"
                }`}
              >
                <div className="text-4xl mb-3">{t.icon}</div>
                <div className="font-display text-[17px] font-bold mb-2" style={{ color: "#f5f0e8" }}>{t.title}</div>
                <div className="font-display text-[12.5px] text-primary-foreground/50 leading-relaxed mb-4">{t.desc}</div>
                <div className="bg-primary-foreground/10 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "linear-gradient(90deg, hsl(var(--copper)), #e8a040)" }} />
                </div>
                <div className="font-display text-[11px] text-primary-foreground/40 mb-4">{votos[t.id] || 0} votos ({pct}%)</div>
                <button
                  disabled={!!yaVote}
                  className={`w-full font-display text-[13px] font-bold py-2.5 px-5 rounded-lg border-none cursor-pointer transition-all ${
                    isVoted
                      ? "bg-ilex-green text-primary-foreground"
                      : yaVote
                      ? "bg-primary-foreground/20 text-primary-foreground/50 cursor-default"
                      : "bg-copper text-primary-foreground hover:bg-[#d4933a]"
                  }`}
                >
                  {isVoted ? "✓ Tu voto" : yaVote ? "Votación cerrada" : "Votar por este tema"}
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-center font-display text-xs text-primary-foreground/30">Un voto por dispositivo · Los resultados se renuevan cada mes</p>
      </div>
    </section>
  );
};

export default VotingSection;
