const testimonios = [
  { initials: "MR", name: "Mariana Rodríguez", loc: "Centro Histórico, SLP", area: "Derecho Inmobiliario", text: "Gracias a iLEX entendí mis derechos como inquilina. Mi arrendador quería cobrarme servicios ilegales y con la orientación que recibí pude resolver el conflicto sin gastar en un abogado." },
  { initials: "JG", name: "Javier González", loc: "Soledad, SLP", area: "Derecho Familiar", text: "Necesitaba entender cómo iniciar el trámite de pensión alimenticia para mi hija. iLEX me explicó paso a paso qué institución contactar y qué documentos llevar. Sin tecnicismos." },
  { initials: "AS", name: "Alejandra Sánchez", loc: "Zona Industrial, SLP", area: "Laboral", text: "Me despidieron de manera injustificada y no sabía qué hacer. iLEX me orientó sobre mis derechos y a dónde acudir. Hoy estoy en proceso de demanda con un abogado del directorio." },
];

const Testimonios = () => {
  return (
    <section className="py-[100px] px-5 md:px-10 bg-background border-t border-copper/10">
      <div className="container">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <p className="font-sans text-[10px] font-bold tracking-[4px] uppercase text-copper mb-5">Testimonios · Usuarios Reales</p>
          <h2 className="font-display text-cream leading-[1.05] tracking-tight" style={{ fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400 }}>
            Lo que <span className="font-script italic text-copper">dicen</span> los potosinos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {testimonios.map((t) => (
            <div key={t.name} className="bg-card border border-copper/15 p-8 rounded-sm hover:border-copper/40 transition-all">
              <div className="text-copper text-4xl font-display leading-none mb-4">"</div>
              <p className="font-serif-italic text-cream/85 text-[15px] leading-[1.75] mb-6">{t.text}</p>
              <div className="flex items-center gap-3 pt-5 border-t border-copper/15">
                <div className="w-10 h-10 rounded-full border border-copper/40 flex items-center justify-center font-display text-copper text-sm">{t.initials}</div>
                <div>
                  <div className="font-display text-cream text-base font-semibold leading-tight">{t.name}</div>
                  <div className="font-sans text-[11px] text-cream/45">{t.loc} · {t.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
