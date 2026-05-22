import { useState } from "react";

const preguntas = [
  {
    q: "¿Cuál es el área general de tu problema?",
    opciones: [
      { label: "Familia (divorcio, pensión, custodia)", next: 1 },
      { label: "Inmobiliario (escrituras, renta, terreno)", next: 1 },
      { label: "Laboral (despido, liquidación, IMSS)", next: 1 },
      { label: "Cobranza (deudas, pagarés)", next: 1 },
      { label: "Otro / No estoy seguro", next: 1 },
    ],
  },
  {
    q: "¿Cuánto tiempo lleva tu situación?",
    opciones: [
      { label: "Menos de 1 mes", next: 2 },
      { label: "Entre 1 y 6 meses", next: 2 },
      { label: "Más de 6 meses", next: 2 },
      { label: "Es urgente / hoy mismo", next: 2 },
    ],
  },
  {
    q: "¿Tienes documentos relacionados (contratos, recibos, demandas)?",
    opciones: [
      { label: "Sí, tengo todo", next: 3 },
      { label: "Tengo algunos", next: 3 },
      { label: "No tengo nada por escrito", next: 3 },
    ],
  },
];

const recomendaciones = {
  doc: "Contrato / formato sugerido",
  inst: "Defensoría Pública SLP — Abogado público gratuito (444) 826-8500",
  pasos: [
    "Reúne todos los documentos relacionados con tu caso.",
    "Acude a la Defensoría Pública SLP o consulta con un abogado del directorio.",
    "Si es urgente, marca al 911 o a la línea de la Comisión de Derechos Humanos SLP: 800 890 6300.",
  ],
};

const DiagnosticoLegal = () => {
  const [step, setStep] = useState(-1);
  const [respuestas, setRespuestas] = useState<string[]>([]);

  const handle = (opt: { label: string; next: number }) => {
    setRespuestas((r) => [...r, opt.label]);
    if (opt.next >= preguntas.length) setStep(99);
    else setStep(opt.next);
  };

  const reset = () => { setStep(-1); setRespuestas([]); };

  return (
    <section id="diagnostico" className="py-[100px] px-5 md:px-10 bg-background border-t border-copper/10">
      <div className="container">
        <div className="text-center max-w-[760px] mx-auto mb-12">
          <p className="font-sans text-[10px] font-bold tracking-[4px] uppercase text-copper mb-5">Diagnóstico Legal IA · Gratuito</p>
          <h2 className="font-display text-cream leading-[1.05] tracking-tight mb-5" style={{ fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400 }}>
            Identifica tu <span className="font-script italic text-copper">problema legal</span>
          </h2>
          <p className="font-serif-italic text-cream/65 leading-[1.7] text-[16px]">
            Responde unas preguntas sencillas. Nuestro asistente analiza tu situación y te dice exactamente qué documento necesitas o a qué institución acudir — sin costo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[900px] mx-auto mb-10">
          {[
            { icon: "🎯", t: "Diagnóstico personalizado" },
            { icon: "📄", t: "Documento correcto" },
            { icon: "🏛️", t: "Instituciones gratuitas" },
            { icon: "🔒", t: "Sin datos personales" },
          ].map((f) => (
            <div key={f.t} className="bg-card border border-copper/15 px-4 py-5 text-center rounded-sm">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-sans text-[12px] text-cream/75 leading-tight">{f.t}</div>
            </div>
          ))}
        </div>

        <div className="max-w-[680px] mx-auto bg-card border border-copper/20 rounded-sm p-10">
          {step === -1 && (
            <div className="text-center">
              <h3 className="font-display text-cream text-[28px] font-semibold mb-3">Diagnóstico Legal Inteligente</h3>
              <p className="font-serif-italic text-cream/60 mb-7 leading-relaxed">
                Responde 3 preguntas rápidas y nuestro asistente identificará tu problema legal y te dará el paso exacto que necesitas.
              </p>
              <button onClick={() => setStep(0)} className="font-sans text-[12px] font-bold tracking-[2px] uppercase bg-copper text-primary-foreground px-9 py-4 rounded-sm hover:bg-copper/90 transition-all">
                Iniciar diagnóstico
              </button>
              <p className="font-sans text-[11px] text-cream/40 mt-4 tracking-[1px] uppercase">Gratis · Sin registro · 2 minutos</p>
            </div>
          )}

          {step >= 0 && step < preguntas.length && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                {preguntas.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-copper" : "bg-copper/15"}`} />
                ))}
              </div>
              <p className="font-sans text-[11px] tracking-[2px] uppercase text-copper mb-3">Pregunta {step + 1} de {preguntas.length}</p>
              <h3 className="font-display text-cream text-[24px] font-semibold mb-6 leading-tight">{preguntas[step].q}</h3>
              <div className="grid gap-2">
                {preguntas[step].opciones.map((opt) => (
                  <button key={opt.label} onClick={() => handle(opt)} className="text-left px-5 py-4 rounded-sm border border-copper/15 bg-background hover:border-copper hover:bg-card transition-all font-sans text-[14px] text-cream/85">
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 99 && (
            <div>
              <p className="font-sans text-[11px] tracking-[2px] uppercase text-copper mb-3">✓ Diagnóstico completo</p>
              <h3 className="font-display text-cream text-[26px] font-semibold mb-5">Esto es lo que te recomendamos</h3>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-background rounded-sm border-l-2 border-copper">
                  <div className="font-sans text-[10px] tracking-[2px] uppercase text-copper mb-1">Documento</div>
                  <div className="font-sans text-[14px] text-cream">{recomendaciones.doc}</div>
                </div>
                <div className="p-4 bg-background rounded-sm border-l-2 border-copper">
                  <div className="font-sans text-[10px] tracking-[2px] uppercase text-copper mb-1">Institución</div>
                  <div className="font-sans text-[14px] text-cream">{recomendaciones.inst}</div>
                </div>
                <div className="p-4 bg-background rounded-sm border-l-2 border-copper">
                  <div className="font-sans text-[10px] tracking-[2px] uppercase text-copper mb-2">Pasos a seguir</div>
                  <ol className="space-y-2 list-decimal list-inside font-sans text-[13.5px] text-cream/80 leading-relaxed">
                    {recomendaciones.pasos.map((p) => <li key={p}>{p}</li>)}
                  </ol>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={reset} className="font-sans text-[11px] font-bold tracking-[2px] uppercase border border-copper/40 text-copper px-6 py-3 rounded-sm hover:bg-copper hover:text-primary-foreground transition-all">
                  Repetir
                </button>
                <a href="#consulta" className="font-sans text-[11px] font-bold tracking-[2px] uppercase bg-copper text-primary-foreground px-6 py-3 rounded-sm hover:bg-copper/90 transition-all no-underline">
                  Profundizar en el chat →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiagnosticoLegal;
