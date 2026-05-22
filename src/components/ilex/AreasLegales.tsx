import { useEffect, useRef } from "react";

const areas = [
  { num: "01", title: "Derecho Inmobiliario", topic: "usucapion" },
  { num: "02", title: "Herencias y Sucesiones", topic: "herencia_intestada" },
  { num: "03", title: "Derecho Familiar", topic: "divorcio_tramite" },
  { num: "04", title: "Cobranza Judicial", topic: "cobranza_judicial" },
  { num: "05", title: "Derecho Penal", topic: "derecho_penal_admin" },
  { num: "06", title: "Derecho Agrario", topic: "ejido" },
  { num: "07", title: "Contratos", topic: "contratos_revision" },
  { num: "08", title: "Amparo", topic: "amparo" },
];

interface AreasLegalesProps {
  onAreaClick: (topic: string) => void;
}

const AreasLegales = ({ onAreaClick }: AreasLegalesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), i * 60); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (topic: string) => {
    document.getElementById("consulta")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => onAreaClick(topic), 400);
  };

  return (
    <section id="areas" className="py-[100px] px-5 md:px-10 bg-background border-t border-copper/10" ref={ref}>
      <div className="container">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <p className="font-sans text-[10px] font-bold tracking-[4px] uppercase text-copper mb-5">Áreas de Práctica</p>
          <h2 className="font-display text-cream leading-[1.05] tracking-tight" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400 }}>
            Temas que <span className="font-script italic text-copper">cubrimos</span>
          </h2>
        </div>

        <div className="max-w-[900px] mx-auto border-t border-copper/15">
          {areas.map((area) => (
            <button
              key={area.topic}
              onClick={() => handleClick(area.topic)}
              className="reveal w-full group flex items-center justify-between py-7 border-b border-copper/15 text-left transition-all hover:pl-4"
            >
              <div className="flex items-center gap-8">
                <span className="font-sans text-[11px] text-copper tracking-[2px]">{area.num}</span>
                <span className="font-display text-cream text-[28px] md:text-[36px] font-medium group-hover:text-copper transition-colors">{area.title}</span>
              </div>
              <span className="font-sans text-copper text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasLegales;
