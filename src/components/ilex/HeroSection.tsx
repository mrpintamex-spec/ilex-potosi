import { useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query.trim());
    setQuery("");
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center px-5 md:px-10 pt-24 pb-16 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #071e25 0%, #0b2e38 40%, #1a5868 100%)" }}>
      {/* Radial overlays */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 20% 50%, rgba(196,131,58,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(58,154,170,0.15) 0%, transparent 40%)"
      }} />
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="relative z-10 max-w-[780px] text-center">
        <div className="animate-fade-up-1 inline-flex items-center gap-2 bg-copper/15 border border-copper/40 text-[#e8b060] font-display text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-6">
          🐺 San Luis Potosí · Asesoría Legal Gratuita
        </div>
        <h1 className="animate-fade-up-2 font-display font-black text-primary-foreground leading-[1.05] tracking-[-2px] mb-3" style={{ fontSize: "clamp(38px, 6vw, 68px)" }}>
          Tu derecho,<br /><span className="text-copper">explicado claro.</span>
        </h1>
        <p className="animate-fade-up-3 font-body italic text-primary-foreground/65 mb-10 leading-relaxed" style={{ fontSize: "clamp(16px, 2.5vw, 20px)" }}>
          Lo que los abogados no siempre te dicen — nosotros sí.<br />Orientación legal honesta, especializada en SLP.
        </p>

        <div className="animate-fade-up-4 flex flex-col md:flex-row max-w-[600px] mx-auto mb-12 bg-card rounded-xl overflow-hidden shadow-ilex-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="¿Cuál es tu duda legal? Escríbela aquí..."
            className="flex-1 border-none outline-none px-5 py-4 font-display text-sm text-foreground bg-transparent placeholder:text-muted-foreground"
          />
          <button onClick={handleSearch} className="bg-copper border-none text-primary-foreground font-display text-sm font-bold px-7 py-4 cursor-pointer hover:bg-[#d4933a] transition-all whitespace-nowrap">
            Consultar →
          </button>
        </div>

        <div className="animate-fade-up-5 flex gap-5 md:gap-10 justify-center">
          {[
            { num: "33+", label: "Temas Legales" },
            { num: "100%", label: "Gratis" },
            { num: "SLP", label: "Especializado" },
            { num: "24h", label: "Disponible" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-[28px] font-extrabold text-copper leading-none">{stat.num}</div>
              <div className="font-display text-[11px] text-primary-foreground/50 uppercase tracking-[1px] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/30 font-display text-[10px] tracking-[2px] uppercase animate-float">
        ▼<br />Explorar
      </div>
    </section>
  );
};

export default HeroSection;
