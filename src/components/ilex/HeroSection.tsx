import { useState } from "react";
import heroBg from "@/assets/ilex-hero-bg.png";

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
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 pt-24 pb-16 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(hsla(195, 40%, 5%, 0.72), hsla(195, 40%, 5%, 0.88)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 max-w-[920px] text-center">
        <div className="animate-fade-up-1 inline-flex items-center gap-2 border border-copper/40 text-copper font-sans text-[10px] font-semibold tracking-[3px] uppercase px-4 py-1.5 rounded-full mb-8">
          San Luis Potosí · Asesoría Legal Gratuita
        </div>

        <h1
          className="animate-fade-up-2 font-display text-cream leading-[0.95] tracking-tight mb-2"
          style={{ fontSize: "clamp(46px, 9vw, 110px)", fontWeight: 400 }}
        >
          <span className="font-script italic block text-cream" style={{ fontSize: "1em", lineHeight: 1 }}>Tu derecho,</span>
          <span className="font-script italic block text-copper mt-2" style={{ fontSize: "1.05em", lineHeight: 1 }}>explicado claro.</span>
        </h1>

        <p className="animate-fade-up-3 font-serif-italic text-cream/70 mb-10 mt-8 leading-relaxed max-w-[640px] mx-auto" style={{ fontSize: "clamp(15px, 1.8vw, 19px)" }}>
          Lo que los abogados no siempre te dicen — nosotros sí.<br />
          Orientación legal honesta, especializada en SLP.
        </p>

        <div className="animate-fade-up-4 flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <a
            href="#consulta"
            className="bg-copper text-primary-foreground font-sans text-[12px] font-bold tracking-[2px] uppercase px-9 py-4 rounded-sm hover:bg-copper/90 transition-all no-underline"
          >
            Consultar →
          </a>
          <a
            href="#areas"
            className="border border-cream/30 text-cream font-sans text-[12px] font-bold tracking-[2px] uppercase px-9 py-4 rounded-sm hover:bg-cream/5 transition-all no-underline"
          >
            Explorar
          </a>
        </div>

        <div className="animate-fade-up-4 max-w-[600px] mx-auto mb-12 flex flex-col md:flex-row bg-card/60 backdrop-blur border border-copper/20 rounded-sm overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="¿Cuál es tu duda legal? Escríbela aquí..."
            className="flex-1 border-none outline-none px-5 py-4 font-sans text-sm text-cream bg-transparent placeholder:text-cream/40"
          />
          <button onClick={handleSearch} className="bg-copper text-primary-foreground font-sans text-xs font-bold tracking-[2px] uppercase px-7 py-4 hover:bg-copper/90 transition-all whitespace-nowrap">
            Consultar
          </button>
        </div>

        <div className="animate-fade-up-5 flex gap-6 md:gap-12 justify-center flex-wrap">
          {[
            { num: "14", label: "Temas Legales" },
            { num: "80+", label: "Frases Coloquiales" },
            { num: "100%", label: "Gratis" },
            { num: "24/7", label: "Disponible" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-[32px] font-semibold text-copper leading-none">{stat.num}</div>
              <div className="font-sans text-[10px] text-cream/45 uppercase tracking-[2px] mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/30 font-sans text-[9px] tracking-[3px] uppercase animate-float">
        ▼<br />Explorar
      </div>
    </section>
  );
};

export default HeroSection;
