import { toast } from "sonner";

const helpLines = [
  { icon: "🚨", name: "Emergencias", num: "911", desc: "Policía · Ambulancia · Bomberos — disponible 24 horas", color: "#d32f2f", iconBg: "#fff5f3" },
  { icon: "⚖️", name: "Comisión de Derechos Humanos — SLP", num: "800 890 6300", desc: "Quejas contra autoridades · Lunes a viernes 8:00–15:00 hrs", color: "hsl(var(--teal))", iconBg: "hsl(var(--teal-pale))" },
  { icon: "🏛", name: "CNDH — Nacional", num: "800 911 2000", desc: "Comisión Nacional de Derechos Humanos · Gratuito", color: "hsl(var(--teal))", iconBg: "hsl(var(--teal-pale))" },
  { icon: "👨‍👩‍👧", name: "DIF San Luis Potosí", num: "(444) 826-1000", desc: "Protección de menores, violencia familiar, abandono", color: "hsl(var(--copper))", iconBg: "hsl(var(--copper-pale))" },
  { icon: "👩", name: "Línea de la Mujer", num: "800 911 2511", desc: "Atención en violencia de género · 24 horas · Confidencial", color: "#9c27b0", iconBg: "#f9f0fc" },
  { icon: "⚖️", name: "Defensoría Pública SLP", num: "(444) 826-8500", desc: "Abogado público gratuito · Penal, Familiar, Civil", color: "hsl(var(--teal))", iconBg: "hsl(var(--teal-pale))" },
  { icon: "🛡", name: "PROFECO", num: "800 468-8722", desc: "Quejas contra empresas, fraudes, cobros indebidos", color: "hsl(var(--copper))", iconBg: "hsl(var(--copper-pale))" },
];

const UrgentHelp = () => {
  return (
    <section className="py-20 px-5 md:px-10 bg-card border-t border-cream-dark">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] items-start">
          <div>
            <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">Líneas de ayuda</p>
            <h2 className="font-display font-extrabold text-teal-deep leading-[1.1] tracking-[-1px] mb-4" style={{ fontSize: "32px" }}>
              ¿Necesitas ayuda urgente?
            </h2>
            <p className="font-display text-sm text-foreground/70 leading-[1.8] mb-7">
              Algunas situaciones no pueden esperar. Estas instituciones atienden de forma gratuita.
            </p>
            <div className="grid gap-3">
              {helpLines.map((line) => (
                <a key={line.num} href={`tel:${line.num.replace(/[^0-9]/g, "")}`} className="no-underline">
                  <div className="flex gap-3.5 items-start p-3.5 px-4 bg-background rounded-[10px] border-l-4 transition-all hover:bg-card hover:shadow-ilex-sm hover:translate-x-[3px]" style={{ borderLeftColor: line.color }}>
                    <div className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: line.iconBg }}>{line.icon}</div>
                    <div>
                      <div className="font-display text-[13px] font-bold text-teal-deep mb-0.5">{line.name}</div>
                      <div className="font-display text-[17px] font-extrabold text-copper mb-0.5">{line.num}</div>
                      <div className="font-display text-[11px] text-muted-foreground leading-snug">{line.desc}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background rounded-2xl p-7 border border-cream-dark">
              <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-copper mb-3">Comparte esta página</p>
              <h3 className="font-display text-xl font-bold text-teal-deep mb-3">Ayuda a que más personas conozcan sus derechos</h3>
              <p className="font-display text-[13px] text-foreground/70 leading-[1.7] mb-5">
                Comparte el sitio con alguien que tenga una duda legal. Puede marcar la diferencia.
              </p>
              <div className="flex gap-2 flex-wrap">
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://ilex-potosi.lovable.app" target="_blank" rel="noopener"
                  className="font-display text-xs font-semibold px-5 py-2.5 rounded-lg bg-fb-blue text-primary-foreground no-underline hover:-translate-y-px transition-all">
                  Facebook
                </a>
                <button
                  onClick={async () => {
                    const url = "https://ilex-potosi.lovable.app";
                    try {
                      await navigator.clipboard.writeText(url);
                      toast.success("¡Enlace copiado al portapapeles!");
                    } catch {
                      // Fallback for non-HTTPS contexts
                      const textarea = document.createElement("textarea");
                      textarea.value = url;
                      textarea.style.position = "fixed";
                      textarea.style.opacity = "0";
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textarea);
                      toast.success("¡Enlace copiado al portapapeles!");
                    }
                  }}
                  className="font-display text-xs font-semibold px-5 py-2.5 rounded-lg bg-teal text-primary-foreground border-none cursor-pointer hover:-translate-y-px transition-all">
                  📋 Copiar enlace
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-6 px-7" style={{ background: "linear-gradient(135deg, hsl(var(--teal-deep)), hsl(var(--teal)))" }}>
              <div className="font-display text-[15px] font-bold text-primary-foreground mb-1.5">Si te fue de ayuda, por favor comparte nuestra web</div>
              <div className="font-display text-[13px] text-primary-foreground/60 leading-[1.7]">
                Entre más personas la conozcan, más gente en SLP puede resolver sus dudas legales sin costo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentHelp;
