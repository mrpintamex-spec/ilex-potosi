import { useState, useEffect, useRef } from "react";

interface Reporte {
  id: number;
  abogado: string;
  motivo: string;
  descripcion: string;
  fecha: string;
  votos: number;
}

const reportesIniciales: Reporte[] = [
  { id: 1, abogado: "Lic. Roberto Méndez G.", motivo: "Cobro excesivo sin resultados", descripcion: "Cobró $45,000 por un juicio de usucapión y nunca presentó la demanda. Dejó de contestar llamadas después de 3 meses.", fecha: "2026-01-15", votos: 34 },
  { id: 2, abogado: "Lic. Fernando Díaz T.", motivo: "Falsificación de documentos", descripcion: "Presentó documentos falsos ante el juzgado en un caso de herencia, lo que retrasó el proceso 2 años.", fecha: "2025-11-22", votos: 52 },
  { id: 3, abogado: "Lic. Patricia Huerta M.", motivo: "Abandono de caso", descripcion: "Tomó el caso de divorcio, cobró el anticipo y desapareció. No acudió a ninguna audiencia.", fecha: "2026-02-03", votos: 28 },
  { id: 4, abogado: "Lic. Sergio Castillo R.", motivo: "Conflicto de interés", descripcion: "Representó simultáneamente a ambas partes en un conflicto por terreno sin informar a ninguno.", fecha: "2025-12-10", votos: 41 },
];

const motivoIcons: Record<string, string> = {
  "Cobro excesivo sin resultados": "💸",
  "Falsificación de documentos": "📄",
  "Abandono de caso": "🚪",
  "Conflicto de interés": "⚖️",
};

const ListaNegra = () => {
  const [reportes, setReportes] = useState<Reporte[]>(() => {
    const saved = localStorage.getItem("ilex-reportes");
    return saved ? JSON.parse(saved) : reportesIniciales;
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ abogado: "", motivo: "", descripcion: "" });
  const [votados, setVotados] = useState<number[]>(() => {
    const saved = localStorage.getItem("ilex-reportes-votados");
    return saved ? JSON.parse(saved) : [];
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("ilex-reportes", JSON.stringify(reportes));
  }, [reportes]);

  useEffect(() => {
    localStorage.setItem("ilex-reportes-votados", JSON.stringify(votados));
  }, [votados]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add("visible"), i * 80); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reportes]);

  const handleVoto = (id: number) => {
    if (votados.includes(id)) return;
    setReportes((prev) => prev.map((r) => r.id === id ? { ...r, votos: r.votos + 1 } : r));
    setVotados((prev) => [...prev, id]);
  };

  const handleSubmit = () => {
    if (!form.abogado.trim() || !form.motivo.trim() || !form.descripcion.trim()) return;
    const nuevo: Reporte = {
      id: Date.now(),
      abogado: form.abogado.trim(),
      motivo: form.motivo.trim(),
      descripcion: form.descripcion.trim(),
      fecha: new Date().toISOString().split("T")[0],
      votos: 0,
    };
    setReportes((prev) => [nuevo, ...prev]);
    setForm({ abogado: "", motivo: "", descripcion: "" });
    setShowForm(false);
  };

  const sorted = [...reportes].sort((a, b) => b.votos - a.votos);

  return (
    <section id="lista-negra" className="py-[90px] px-5 md:px-10 bg-muted/30" ref={ref}>
      <div className="container">
        <p className="font-display text-[10px] font-bold tracking-[3px] uppercase text-destructive mb-3 reveal">⚠ Lista Negra · Reportes Ciudadanos</p>
        <h2 className="font-display font-extrabold text-teal-deep leading-[1.1] tracking-[-1px] mb-4 reveal" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
          Abogados reportados<br />por la comunidad
        </h2>
        <p className="text-base text-foreground/70 leading-[1.8] max-w-[560px] mb-8 reveal">
          Espacio para que los ciudadanos de SLP reporten malas prácticas legales. La transparencia protege a todos. Reporta de forma anónima — tu voz cuenta.
        </p>

        <button
          onClick={() => setShowForm(!showForm)}
          className="reveal font-display text-sm font-bold px-6 py-3 rounded-xl border-2 border-destructive text-destructive bg-transparent cursor-pointer hover:bg-destructive hover:text-primary-foreground transition-all mb-8"
        >
          {showForm ? "✕ Cancelar" : "🚨 Reportar un Abogado"}
        </button>

        {showForm && (
          <div className="reveal visible bg-card rounded-2xl p-6 border border-cream-dark mb-8 max-w-[600px]">
            <h3 className="font-display text-base font-bold text-teal-deep mb-4">Nuevo Reporte Anónimo</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre del abogado (ej: Lic. Juan Pérez)"
                value={form.abogado}
                onChange={(e) => setForm({ ...form, abogado: e.target.value })}
                className="font-display text-sm px-4 py-3 rounded-lg border border-cream-dark bg-background text-foreground outline-none focus:border-teal transition-all"
              />
              <select
                value={form.motivo}
                onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                className="font-display text-sm px-4 py-3 rounded-lg border border-cream-dark bg-background text-foreground outline-none focus:border-teal transition-all"
              >
                <option value="">Selecciona el motivo...</option>
                <option value="Cobro excesivo sin resultados">Cobro excesivo sin resultados</option>
                <option value="Falsificación de documentos">Falsificación de documentos</option>
                <option value="Abandono de caso">Abandono de caso</option>
                <option value="Conflicto de interés">Conflicto de interés</option>
                <option value="Negligencia profesional">Negligencia profesional</option>
                <option value="Fraude">Fraude</option>
                <option value="Otro">Otro</option>
              </select>
              <textarea
                placeholder="Describe lo que sucedió con el mayor detalle posible..."
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                rows={4}
                className="font-display text-sm px-4 py-3 rounded-lg border border-cream-dark bg-background text-foreground outline-none focus:border-teal transition-all resize-none"
              />
              <button
                onClick={handleSubmit}
                className="font-display text-sm font-bold px-6 py-3 rounded-lg bg-destructive text-primary-foreground border-none cursor-pointer hover:opacity-90 transition-all self-start"
              >
                Enviar Reporte Anónimo →
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.map((r, idx) => (
            <div key={r.id} className="reveal bg-card rounded-2xl p-6 border border-cream-dark relative transition-all hover:-translate-y-[3px] hover:shadow-ilex-md">
              <div className="absolute top-4 right-4 font-display text-[11px] font-bold px-2.5 py-[3px] rounded-xl bg-destructive/10 text-destructive border border-destructive/30">
                #{idx + 1} Reportado
              </div>
              <div className="text-2xl mb-3">{motivoIcons[r.motivo] || "🚨"}</div>
              <div className="font-display text-base font-bold text-teal-deep mb-1">{r.abogado}</div>
              <div className="font-display text-xs font-semibold text-destructive mb-2">{r.motivo}</div>
              <p className="text-sm text-foreground/70 leading-[1.7] mb-3">{r.descripcion}</p>
              <div className="font-display text-[11px] text-muted-foreground mb-4">Reportado: {r.fecha}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleVoto(r.id)}
                  disabled={votados.includes(r.id)}
                  className={`font-display text-xs font-semibold px-4 py-2 rounded-lg border cursor-pointer transition-all flex items-center gap-1.5 ${
                    votados.includes(r.id)
                      ? "bg-muted border-cream-dark text-muted-foreground cursor-default"
                      : "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive hover:text-primary-foreground"
                  }`}
                >
                  👎 {votados.includes(r.id) ? "Ya confirmaste" : "Confirmar reporte"}
                </button>
                <span className="font-display text-sm font-bold text-destructive">{r.votos} confirmaciones</span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 rounded-2xl p-8 px-10 bg-card border border-cream-dark text-center">
          <p className="font-display text-sm text-foreground/60 leading-[1.8] max-w-[500px] mx-auto">
            <strong className="text-teal-deep">⚖️ Aviso:</strong> Los reportes aquí publicados son opiniones de ciudadanos. iLEX POTOSÍ no verifica la veracidad de cada reporte. Si eres abogado y consideras que un reporte es falso, <a href="mailto:iLEX.POTOSI@protonmail.com" className="text-copper font-semibold no-underline hover:underline">contáctanos</a> para solicitar su revisión.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ListaNegra;
