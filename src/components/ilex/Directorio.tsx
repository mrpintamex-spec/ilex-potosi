import { useState, useEffect, useRef } from "react";

const abogados = [
  { initials: "MR", name: "Lic. María Rodríguez", esp: "Derecho Inmobiliario · Herencias", stars: 5, reviews: "5.0 · 47 reseñas verificadas", tags: ["Escrituras", "Usucapión", "Herencias"], rank: "⭐ Top 1", rankClass: "top", cats: "inmobiliario familiar", tel: "4441234567", wa: "524441234567" },
  { initials: "JL", name: "Lic. Jorge López", esp: "Derecho Penal · Cobranza", stars: 5, reviews: "4.9 · 38 reseñas verificadas", tags: ["Penal", "Pagarés", "Amparo"], rank: "⭐ Top 2", rankClass: "top", cats: "penal mercantil", tel: "4447654321", wa: "524447654321" },
  { initials: "AP", name: "Lic. Ana Pérez", esp: "Derecho Familiar", stars: 4, reviews: "4.2 · 21 reseñas verificadas", tags: ["Divorcio", "Pensión", "Custodia"], rank: "★ Bien calificado", rankClass: "mid", cats: "familiar", tel: "4449876543", wa: "524449876543" },
];

const tabs = [
  { key: "todos", label: "Todos" },
  { key: "inmobiliario", label: "Inmobiliario" },
  { key: "familiar", label: "Familiar" },
  { key: "penal", label: "Penal" },
  { key: "mercantil", label: "Mercantil" },
];

interface DirectorioProps {
  onOpenRegistro: () => void;
}

const Directorio = ({ onOpenRegistro }: DirectorioProps) => {
  const [activeTab, setActiveTab] = useState("todos");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), i * 80); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeTab === "todos" ? abogados : abogados.filter((a) => a.cats.includes(activeTab));

  const rankStyles: Record<string, string> = {
    top: "bg-copper-pale text-copper-dark border border-copper",
    mid: "bg-teal-pale text-teal border border-teal-lit",
  };

  return (
    <section id="directorio" className="py-[90px] px-5 md:px-10 bg-background" ref={ref}>
      <div className="container">
        <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">Directorio de Abogados</p>
        <h2 className="font-display font-extrabold text-teal-deep leading-[1.1] tracking-[-1px] mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
          Abogados en SLP verificados<br />por usuarios reales
        </h2>
        <p className="text-base text-foreground/70 leading-[1.8] max-w-[560px]">
          Ranking basado únicamente en reseñas de clientes reales. Los mejor calificados aparecen primero. Los peores también se ven — aquí nadie se esconde.
        </p>

        <div className="flex gap-2 mt-8 mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-display text-xs font-semibold px-4 py-[7px] rounded-full border-[1.5px] cursor-pointer transition-all ${
                activeTab === tab.key ? "bg-teal border-teal text-primary-foreground" : "bg-transparent border-cream-dark text-foreground/70 hover:bg-teal hover:border-teal hover:text-primary-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((abo) => (
            <div key={abo.name} className="reveal bg-card rounded-2xl p-6 border border-cream-dark relative transition-all hover:-translate-y-[3px] hover:shadow-ilex-md">
              <div className={`absolute top-4 right-4 font-display text-[11px] font-bold px-2.5 py-[3px] rounded-xl ${rankStyles[abo.rankClass] || ""}`}>
                {abo.rank}
              </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-display text-xl font-extrabold text-primary-foreground mb-3.5" style={{ background: "linear-gradient(135deg, hsl(var(--teal)), hsl(var(--teal-mid)))" }}>
                {abo.initials}
              </div>
              <div className="font-display text-base font-bold text-teal-deep mb-1">{abo.name}</div>
              <div className="font-display text-xs font-medium text-copper mb-3">{abo.esp}</div>
              <div className="flex gap-[3px] mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < abo.stars ? "text-copper" : "text-cream-dark"}`}>★</span>
                ))}
              </div>
              <div className="font-display text-[11px] text-muted-foreground mb-3.5">{abo.reviews}</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {abo.tags.map((tag) => (
                  <span key={tag} className="bg-teal-pale text-teal font-display text-[10px] font-semibold px-2.5 py-[3px] rounded-[10px]">{tag}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <a href={`tel:${abo.tel}`} className="flex-1 font-display text-xs font-semibold py-2 rounded-lg bg-teal text-primary-foreground text-center no-underline hover:bg-teal-mid transition-all flex items-center justify-center gap-1">📞 Llamar</a>
                <a href={`https://wa.me/${abo.wa}`} target="_blank" rel="noopener" className="flex-1 font-display text-xs font-semibold py-2 rounded-lg bg-copper-pale text-copper-dark border border-copper text-center no-underline hover:bg-copper hover:text-primary-foreground transition-all flex items-center justify-center gap-1">💬 WhatsApp</a>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 rounded-2xl p-8 px-10 flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap" style={{ background: "linear-gradient(135deg, hsl(var(--teal-deep)), hsl(var(--teal)))" }}>
          <div>
            <h3 className="font-display text-xl font-bold text-primary-foreground mb-1.5">¿Eres abogado o tienes un despacho en SLP?</h3>
            <p className="font-display text-[13px] text-primary-foreground/65 max-w-[480px]">Regístrate en el directorio. Tu posición la decide la gente — sube con buenas reseñas, baja con malas. Así de transparente.</p>
          </div>
          <button onClick={onOpenRegistro} className="bg-copper text-primary-foreground font-display text-sm font-bold px-7 py-3.5 rounded-[10px] border-none cursor-pointer transition-all hover:bg-[#d4933a] hover:-translate-y-0.5 whitespace-nowrap no-underline">
            Registrarme →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Directorio;
