import { useEffect, useRef } from "react";

const features = [
  { icon: "🔓", title: "Completamente gratuito", desc: "Sin suscripción, sin registro, sin cobros ocultos. La orientación legal básica es tu derecho." },
  { icon: "🗺", title: "Especializado en SLP", desc: "Todo basado en el Código Civil del Estado de SLP, legislación local y trámites reales de las instituciones potosinas." },
  { icon: "💬", title: "Aquí te entendemos", desc: "Cuéntanos tu situación y te respondemos claro, directo y sin rodeos." },
  { icon: "⚡", title: "Respuesta inmediata", desc: "Sin citas, sin esperas. Orientación en segundos con artículos reales y opciones gratuitas siempre primero." },
];

const WhySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="nosotros" className="py-[90px] px-5 md:px-10 bg-card" ref={sectionRef}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] items-center">
          <div>
            <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">¿Por qué iLEX POTOSÍ?</p>
            <h2 className="font-display font-extrabold text-teal-deep leading-[1.1] tracking-[-1px] mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
              Lo que tu abogado no siempre te dice
            </h2>
            <p className="text-base text-foreground/70 leading-[1.8] max-w-[560px]">
              Para las personas de SLP que enfrentan un problema legal y no saben por dónde empezar. Sin tecnicismos, sin cobros, sin hacerte sentir menos.
            </p>
            <div className="grid gap-5 mt-8">
              {features.map((f) => (
                <div key={f.title} className="reveal flex gap-4 items-start p-5 bg-background rounded-xl border-l-4 border-l-copper transition-all hover:translate-x-1 hover:shadow-ilex-sm">
                  <div className="w-11 h-11 bg-teal rounded-[10px] flex items-center justify-center text-xl shrink-0">{f.icon}</div>
                  <div>
                    <h4 className="font-display text-[15px] font-bold text-teal-deep mb-1">{f.title}</h4>
                    <p className="text-[13px] text-foreground/70 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal rounded-[20px] p-12 px-9 text-primary-foreground relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(var(--teal-deep)), hsl(var(--teal)))" }}>
            <span className="absolute -right-5 -bottom-5 text-[160px] opacity-5">⚖</span>
            <p className="font-body text-[22px] italic leading-[1.5] text-primary-foreground/90 mb-6">
              "No saber de leyes no te hace menos inteligente — te hace <span className="text-copper not-italic font-semibold">humano.</span> Nosotros estamos aquí para eso."
            </p>
            <div className="font-display text-xs text-primary-foreground/50 tracking-[1px] uppercase">— iLEX POTOSÍ · Asesor Legal Inteligente</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
