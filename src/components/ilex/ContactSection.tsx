import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contacto" className="py-[90px] px-5 md:px-10 bg-card">
      <div className="container">
        <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">Contacto</p>
        <h2 className="font-display font-extrabold text-cream leading-[1.1] tracking-[-1px] mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
          ¿Tu caso necesita<br />atención personalizada?
        </h2>
        <p className="text-base text-cream/70 leading-[1.8] max-w-[560px]">
          Si tu situación es compleja o necesitas orientación directa, escríbenos. Te respondemos en menos de 24 horas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] mt-12 items-start">
          <div className="grid gap-5">
            {[
              { icon: "✉️", title: "Correo electrónico", content: <a href="mailto:iLEX.POTOSI@protonmail.com" className="font-display text-[13px] text-cream/70 no-underline hover:text-copper transition-colors">iLEX.POTOSI@protonmail.com</a> },
              { icon: "🌐", title: "Sitio web", content: <a href="https://ilex-potosi.com" className="font-display text-[13px] text-cream/70 no-underline hover:text-copper transition-colors">ilex-potosi.com</a> },
              { icon: "📍", title: "Cobertura", content: <p className="font-display text-[13px] text-cream/70">San Luis Potosí (Capital y municipios) · Ciudad de México</p> },
              { icon: "⏰", title: "Tiempo de respuesta", content: <p className="font-display text-[13px] text-cream/70">Consulta en chat: inmediata · Correo: menos de 24 hrs</p> },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-5 bg-background rounded-xl transition-all hover:shadow-ilex-sm">
                <div className="w-11 h-11 bg-copper/15 border border-copper/30 rounded-[10px] flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-display text-sm font-bold text-cream mb-1">{item.title}</h4>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-[20px] p-9 border border-copper/15">
            <h3 className="font-display text-xl font-bold text-cream mb-1.5">Envíanos tu consulta</h3>
            <p className="text-[13px] text-cream/70 mb-6 leading-relaxed">
              Describe tu situación y te orientamos sin costo. Para casos que requieren abogado, te conectamos con el más adecuado del directorio.
            </p>
            <div className="mb-4">
              <label className="block font-display text-xs font-semibold text-cream mb-1.5">Nombre completo</label>
              <input type="text" placeholder="Tu nombre" className="w-full border-[1.5px] border-copper/15 rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none transition-colors focus:border-teal-mid focus:bg-card placeholder:text-muted-foreground" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block font-display text-xs font-semibold text-cream mb-1.5">Correo electrónico</label>
                <input type="email" placeholder="tu@correo.com" className="w-full border-[1.5px] border-copper/15 rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none transition-colors focus:border-teal-mid focus:bg-card placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="block font-display text-xs font-semibold text-cream mb-1.5">Teléfono (opcional)</label>
                <input type="tel" placeholder="444 000 0000" className="w-full border-[1.5px] border-copper/15 rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none transition-colors focus:border-teal-mid focus:bg-card placeholder:text-muted-foreground" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-display text-xs font-semibold text-cream mb-1.5">Área legal</label>
              <select className="w-full border-[1.5px] border-copper/15 rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none transition-colors focus:border-teal-mid focus:bg-card">
                <option>Selecciona un área...</option>
                <option>Derecho Inmobiliario</option>
                <option>Herencias y Sucesiones</option>
                <option>Derecho Familiar / Divorcio</option>
                <option>Pensión Alimenticia</option>
                <option>Derecho Penal</option>
                <option>Cobranza Judicial</option>
                <option>Contratos</option>
                <option>Derecho Agrario / Ejido</option>
                <option>Amparo</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-display text-xs font-semibold text-cream mb-1.5">Describe tu situación</label>
              <textarea placeholder="Cuéntanos qué está pasando con tus palabras. Entre más detalle, mejor orientación podremos darte..." className="w-full border-[1.5px] border-copper/15 rounded-lg px-3.5 py-2.5 font-body text-[13px] text-foreground bg-card outline-none resize-y min-h-[120px] transition-colors focus:border-teal-mid placeholder:text-muted-foreground" />
            </div>
            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted}
              className={`w-full font-display text-[15px] font-bold py-3.5 rounded-[10px] border-none cursor-pointer transition-all mt-2 ${
                submitted ? "bg-ilex-green text-primary-foreground" : "bg-copper text-primary-foreground hover:bg-[#d4933a] hover:-translate-y-px"
              }`}
            >
              {submitted ? "✓ Mensaje enviado — te respondemos en 24 hrs" : "Enviar consulta →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
