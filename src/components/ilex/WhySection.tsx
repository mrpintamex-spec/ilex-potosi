import { useEffect, useRef } from "react";

const features = [
  { num: "01", title: "Completamente gratuito", desc: "Sin suscripción, sin registro, sin cobros ocultos. La orientación legal básica es tu derecho." },
  { num: "02", title: "Especializado en SLP", desc: "Todo basado en el Código Civil del Estado de SLP, legislación local y trámites reales de las instituciones potosinas." },
  { num: "03", title: "Aquí te entendemos", desc: "Cuéntanos tu situación y te respondemos claro, directo y sin rodeos." },
  { num: "04", title: "Respuesta inmediata", desc: "Sin citas, sin esperas. Orientación en segundos con artículos reales y opciones gratuitas siempre primero." },
];

const WhySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), i * 80); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className="py-[100px] px-5 md:px-10 bg-background border-t border-copper/10" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <p className="font-sans text-[10px] font-bold tracking-[4px] uppercase text-copper mb-6">¿Por qué iLEX POTOSÍ?</p>
          <h2 className="font-display text-cream leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400 }}>
            Lo que tu abogado <span className="font-script italic text-copper">no siempre te dice</span>
          </h2>
          <p className="font-serif-italic text-cream/65 leading-[1.8] text-[17px]">
            Para las personas de SLP que enfrentan un problema legal y no saben por dónde empezar. Sin tecnicismos, sin cobros, sin hacerte sentir menos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-copper/15 max-w-[1200px] mx-auto border border-copper/15">
          {features.map((f) => (
            <div key={f.num} className="reveal bg-background p-9 hover:bg-card transition-colors">
              <div className="font-display text-copper text-[42px] font-light leading-none mb-5">{f.num}</div>
              <h4 className="font-display text-cream text-[22px] font-semibold mb-3 leading-tight">{f.title}</h4>
              <p className="font-sans text-[13.5px] text-cream/60 leading-[1.75]">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 text-center max-w-[680px] mx-auto py-8 border-t border-b border-copper/15">
          <p className="font-serif-italic text-cream/85 leading-[1.55] text-[20px] mb-3">
            "No saber de leyes no te hace menos inteligente — te hace <span className="text-copper">humano.</span> Nosotros estamos aquí para eso."
          </p>
          <div className="font-sans text-[10px] text-copper/70 tracking-[3px] uppercase">— iLEX POTOSÍ · Asesor Legal Inteligente</div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
