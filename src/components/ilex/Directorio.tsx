import { useState, useEffect, useRef } from "react";

const abogados = [
  { initials: "LM", name: "Lic. María Rodríguez Hernández", esp: "Inmobiliario · Herencias", stars: 5, reviews: "5.0 · 47 reseñas", tags: ["Escrituras", "Usucapión", "Herencias"], rank: "TOP 1", rankClass: "top", cats: "inmobiliario familiar", tel: "4441234567", wa: "524441234567" },
  { initials: "LJ", name: "Lic. Jorge López Martínez", esp: "Penal · Cobranza", stars: 5, reviews: "4.9 · 38 reseñas", tags: ["Penal", "Pagarés", "Amparo"], rank: "TOP 2", rankClass: "top", cats: "penal mercantil", tel: "4447654321", wa: "524447654321" },
  { initials: "LA", name: "Lic. Ana Pérez Gutiérrez", esp: "Familiar", stars: 4, reviews: "4.2 · 21 reseñas", tags: ["Divorcio", "Pensión", "Custodia"], rank: "", rankClass: "mid", cats: "familiar", tel: "4449876543", wa: "524449876543" },
];

const tabs = [
  { key: "todos", label: "Todos" },
  { key: "inmobiliario", label: "Inmobiliario" },
  { key: "familiar", label: "Familiar" },
  { key: "penal", label: "Penal" },
  { key: "mercantil", label: "Mercantil" },
];

const planes = [
  { name: "Básico", price: "$199", prev: "$499", popular: false, items: ["Perfil en directorio", "1 especialidad", "Teléfono visible"] },
  { name: "Destacado", price: "$499", prev: "$999", popular: true, items: ["Todo lo del plan Básico", "3 especialidades", "WhatsApp visible", "Foto de perfil"] },
  { name: "Premium", price: "$899", prev: "$1,799", popular: false, items: ["Todo lo del plan Destacado", "Primero en búsquedas", "Badge verificado ✓"] },
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

  return (
    <section id="directorio" className="py-[100px] px-5 md:px-10 bg-background border-t border-copper/10" ref={ref}>
      <div className="container">
        <div className="text-center max-w-[720px] mx-auto mb-12">
          <p className="font-sans text-[10px] font-bold tracking-[4px] uppercase text-copper mb-5">Directorio de Abogados</p>
          <h2 className="font-display text-cream leading-[1.05] tracking-tight mb-5" style={{ fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400 }}>
            Abogados en SLP <span className="font-script italic text-copper">verificados</span> por usuarios reales
          </h2>
          <p className="font-serif-italic text-cream/65 leading-[1.7] text-[16px]">
            Ranking basado únicamente en reseñas de clientes reales. Los mejor calificados aparecen primero.
          </p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-sans text-[11px] font-semibold tracking-[1.5px] uppercase px-4 py-2 rounded-sm border cursor-pointer transition-all ${
                activeTab === tab.key ? "bg-copper border-copper text-primary-foreground" : "bg-transparent border-copper/25 text-cream/65 hover:border-copper hover:text-copper"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((abo) => (
            <div key={abo.name} className="reveal bg-card rounded-sm p-7 border border-copper/15 relative transition-all hover:border-copper/40 hover:-translate-y-[3px]">
              {abo.rank && (
                <div className="absolute top-4 right-4 font-sans text-[10px] font-bold tracking-[1.5px] px-2.5 py-1 bg-copper/15 text-copper border border-copper/30">
                  {abo.rank}
                </div>
              )}
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-display text-xl text-copper mb-4 border border-copper/40">
                {abo.initials}
              </div>
              <div className="font-display text-cream text-[19px] font-semibold mb-1 leading-tight">{abo.name}</div>
              <div className="font-sans text-[11px] tracking-[1.5px] uppercase text-copper mb-3">{abo.esp}</div>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < abo.stars ? "text-copper" : "text-cream/15"}`}>★</span>
                ))}
              </div>
              <div className="font-sans text-[11px] text-cream/50 mb-4">{abo.reviews}</div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {abo.tags.map((tag) => (
                  <span key={tag} className="bg-teal-mid text-cream/70 font-sans text-[10px] font-medium px-2.5 py-1 rounded-sm">{tag}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <a href={`tel:${abo.tel}`} className="flex-1 font-sans text-[11px] font-bold tracking-[1.5px] uppercase py-2.5 bg-copper text-primary-foreground text-center no-underline hover:bg-copper/90 transition-all rounded-sm">Llamar</a>
                <a href={`https://wa.me/${abo.wa}`} target="_blank" rel="noopener" className="flex-1 font-sans text-[11px] font-bold tracking-[1.5px] uppercase py-2.5 border border-copper/40 text-copper text-center no-underline hover:bg-copper hover:text-primary-foreground transition-all rounded-sm">WhatsApp</a>
              </div>
            </div>
          ))}
        </div>

        {/* Planes */}
        <div className="reveal max-w-[1100px] mx-auto pt-16 border-t border-copper/15">
          <div className="text-center mb-10">
            <p className="font-sans text-[10px] font-bold tracking-[4px] uppercase text-copper mb-4">Precios Early Adopter</p>
            <h3 className="font-display text-cream text-[34px] font-medium mb-3">Regístrate en el Directorio</h3>
            <p className="font-serif-italic text-cream/60 max-w-[560px] mx-auto">
              Tu posición en el ranking la decide exclusivamente la calificación de tus clientes. Elige tu plan de visibilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {planes.map((p) => (
              <div key={p.name} className={`relative p-8 rounded-sm border transition-all hover:-translate-y-1 ${p.popular ? "border-copper bg-card" : "border-copper/15 bg-card/50"}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-copper text-primary-foreground font-sans text-[10px] font-bold tracking-[2px] uppercase px-3 py-1">
                    Más Popular
                  </div>
                )}
                <div className="font-sans text-[11px] font-bold tracking-[2px] uppercase text-copper mb-3">{p.name}</div>
                <div className="mb-1">
                  <span className="font-display text-cream text-[44px] font-medium">{p.price}</span>
                  <span className="font-sans text-cream/50 text-sm">/mes</span>
                </div>
                <div className="font-sans text-cream/40 text-sm line-through mb-5">{p.prev}</div>
                <ul className="space-y-2.5 mb-7">
                  {p.items.map((it) => (
                    <li key={it} className="font-sans text-[13px] text-cream/75 flex items-start gap-2">
                      <span className="text-copper mt-0.5">✓</span> {it}
                    </li>
                  ))}
                </ul>
                <button onClick={onOpenRegistro} className={`w-full font-sans text-[11px] font-bold tracking-[2px] uppercase py-3 rounded-sm transition-all ${p.popular ? "bg-copper text-primary-foreground hover:bg-copper/90" : "border border-copper/40 text-copper hover:bg-copper hover:text-primary-foreground"}`}>
                  Elegir {p.name}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center font-sans text-[12px] text-cream/50 mb-6">
            Todos los planes requieren aprobación · El ranking lo determinan exclusivamente las reseñas de tus clientes
          </p>
          <div className="text-center">
            <button onClick={onOpenRegistro} className="font-sans text-[12px] font-bold tracking-[2px] uppercase border border-copper text-copper px-8 py-3.5 hover:bg-copper hover:text-primary-foreground transition-all rounded-sm">
              Registrarme como abogado
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Directorio;
