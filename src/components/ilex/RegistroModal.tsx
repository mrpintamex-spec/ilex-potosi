import { useState } from "react";

interface RegistroModalProps {
  open: boolean;
  onClose: () => void;
}

const plans = [
  { name: "Básico", price: "$499", period: "/mes", feature: "Perfil en directorio · 1 especialidad · Teléfono visible" },
  { name: "Destacado", price: "$999", period: "/mes", feature: "Todo lo anterior · 3 especialidades · WhatsApp · Foto" },
  { name: "Premium", price: "$1,799", period: "/mes", feature: "Todo lo anterior · Destacado en búsqueda · Badge verificado" },
];

const RegistroModal = ({ open, onClose }: RegistroModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-teal-deep/85 z-[2000] flex items-center justify-center p-5" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-card rounded-[20px] p-10 max-w-[560px] w-full max-h-[90vh] overflow-y-auto relative animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 bg-background border-none w-8 h-8 rounded-full cursor-pointer text-base text-foreground/70 flex items-center justify-center hover:bg-cream-dark transition-all">✕</button>
        <h2 className="font-display text-[22px] font-extrabold text-teal-deep mb-1.5">Registrate en el Directorio</h2>
        <p className="text-[13px] text-foreground/70 mb-6 leading-relaxed">Tu posición en el ranking la decide exclusivamente la calificación de tus clientes. Elige tu plan de visibilidad.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(i)}
              className={`bg-background border-2 rounded-xl p-4 px-3 text-center cursor-pointer transition-all ${
                selectedPlan === i ? "border-copper bg-copper-pale" : "border-cream-dark hover:border-copper hover:bg-copper-pale"
              }`}
            >
              <div className="font-display text-[13px] font-bold text-teal-deep mb-1">{plan.name}</div>
              <div className="font-display text-xl font-black text-copper mb-1">{plan.price}<span className="text-[11px] font-medium text-muted-foreground">{plan.period}</span></div>
              <div className="font-display text-[10px] text-foreground/70 leading-snug">{plan.feature}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block font-display text-xs font-semibold text-teal-deep mb-1.5">Nombre completo</label>
            <input type="text" placeholder="Lic. Nombre Apellido" className="w-full border-[1.5px] border-cream-dark rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none focus:border-teal-mid focus:bg-card transition-colors placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="block font-display text-xs font-semibold text-teal-deep mb-1.5">Cédula profesional</label>
            <input type="text" placeholder="Número de cédula SEP" className="w-full border-[1.5px] border-cream-dark rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none focus:border-teal-mid focus:bg-card transition-colors placeholder:text-muted-foreground" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block font-display text-xs font-semibold text-teal-deep mb-1.5">Teléfono</label>
            <input type="tel" placeholder="444 000 0000" className="w-full border-[1.5px] border-cream-dark rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none focus:border-teal-mid focus:bg-card transition-colors placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="block font-display text-xs font-semibold text-teal-deep mb-1.5">Especialidad principal</label>
            <select className="w-full border-[1.5px] border-cream-dark rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none focus:border-teal-mid focus:bg-card transition-colors">
              <option>Selecciona...</option>
              <option>Derecho Inmobiliario</option>
              <option>Derecho Familiar</option>
              <option>Derecho Penal</option>
              <option>Derecho Mercantil</option>
              <option>Derecho Agrario</option>
              <option>Derecho Laboral</option>
              <option>General</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-display text-xs font-semibold text-teal-deep mb-1.5">Correo electrónico</label>
          <input type="email" placeholder="despacho@correo.com" className="w-full border-[1.5px] border-cream-dark rounded-lg px-3.5 py-2.5 font-display text-[13px] text-foreground bg-background outline-none focus:border-teal-mid focus:bg-card transition-colors placeholder:text-muted-foreground" />
        </div>
        <button
          onClick={() => setSubmitted(true)}
          disabled={submitted}
          className={`w-full font-display text-[15px] font-bold py-3.5 rounded-[10px] border-none cursor-pointer transition-all mt-2 ${
            submitted ? "bg-ilex-green text-primary-foreground" : "bg-copper text-primary-foreground hover:bg-[#d4933a] hover:-translate-y-px"
          }`}
        >
          {submitted ? "✓ Solicitud enviada — te contactamos pronto" : "Enviar solicitud de registro →"}
        </button>
      </div>
    </div>
  );
};

export default RegistroModal;
