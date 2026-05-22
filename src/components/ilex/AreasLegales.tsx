import { useEffect, useRef } from "react";

const areas = [
  { icon: "🏠", title: "Derecho Inmobiliario", desc: "Usucapión, escrituras, Registro Público, compraventa, lotificaciones, servidumbres y más.", topic: "usucapion" },
  { icon: "📜", title: "Herencias y Sucesiones", desc: "Herencia con y sin testamento, trámites sucesorios, RENAT, costos reales en SLP.", topic: "herencia_intestada" },
  { icon: "💔", title: "Derecho Familiar", desc: "Divorcio incausado, pensión alimenticia, custodia, patria potestad, bienes matrimoniales.", topic: "divorcio_tramite" },
  { icon: "💰", title: "Cobranza Judicial", desc: "Recuperación de deudas, pagarés, juicio ejecutivo mercantil, plazos de prescripción.", topic: "cobranza_judicial" },
  { icon: "🚔", title: "Derecho Penal", desc: "Proceso acusatorio, derechos del imputado, defensa pública gratuita, etapas del juicio.", topic: "derecho_penal_admin" },
  { icon: "🌾", title: "Derecho Agrario", desc: "Ejidos, tierras parceladas, dominio pleno, Tribunal Agrario, Procuraduría Agraria SLP.", topic: "ejido" },
  { icon: "📝", title: "Contratos", desc: "Revisión de contratos, cláusulas abusivas, arrendamiento, obra y servicios, alertas.", topic: "contratos_revision" },
  { icon: "🛡", title: "Amparo", desc: "Cuándo usarlo, plazos críticos, suspensión del acto, Juzgado de Distrito en SLP.", topic: "amparo" },
];

interface AreasLegalesProps {
  onAreaClick: (topic: string) => void;
}

const AreasLegales = ({ onAreaClick }: AreasLegalesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 80);
          observer.unobserve(e.target);
        }
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
    <section id="areas" className="py-[90px] px-5 md:px-10 bg-card" ref={ref}>
      <div className="container">
        <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">Áreas de Práctica</p>
        <h2 className="font-display font-extrabold text-cream leading-[1.1] tracking-[-1px] mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
          Temas que cubrimos
        </h2>
        <p className="text-base text-cream/70 leading-[1.8] max-w-[560px]">
          Orientación especializada en las áreas legales más comunes para los potosinos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {areas.map((area) => (
            <div
              key={area.topic}
              onClick={() => handleClick(area.topic)}
              className="reveal group bg-background rounded-2xl p-7 px-6 border border-copper/15 cursor-pointer relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-ilex-md hover:bg-card"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copper to-teal scale-x-0 origin-left transition-transform group-hover:scale-x-100" />
              <span className="text-[32px] mb-3.5 block">{area.icon}</span>
              <h3 className="font-display text-[15px] font-bold text-cream mb-2">{area.title}</h3>
              <p className="text-[12.5px] text-cream/70 leading-relaxed">{area.desc}</p>
              <span className="inline-flex items-center gap-1 mt-3.5 font-display text-xs font-semibold text-copper transition-all group-hover:gap-2">
                Consultar →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasLegales;
