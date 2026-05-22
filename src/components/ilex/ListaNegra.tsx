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
  { id: 1, abogado: "Lic. Fernando Díaz T.", motivo: "Falsificación de documentos", descripcion: "Presentó documentos falsos ante el juzgado en un caso de herencia, lo que retrasó el proceso 2 años.", fecha: "2025-11-21", votos: 52 },
  { id: 2, abogado: "Lic. Sergio Castillo R.", motivo: "Conflicto de interés", descripcion: "Representó simultáneamente a ambas partes en un conflicto por terreno sin informar a ninguno.", fecha: "2025-12-09", votos: 41 },
  { id: 3, abogado: "Lic. Roberto Méndez G.", motivo: "Cobro excesivo sin resultados", descripcion: "Cobró $45,000 por un juicio de usucapión y nunca presentó la demanda. Dejó de contestar llamadas después de 3 meses.", fecha: "2026-01-14", votos: 34 },
  { id: 4, abogado: "Lic. Patricia Huerta M.", motivo: "Abandono de caso", descripcion: "Tomó el caso de divorcio, cobró el anticipo y desapareció. No acudió a ninguna audiencia.", fecha: "2026-02-02", votos: 28 },
];

const motivoIcons: Record<string, string> = {
  "Cobro excesivo sin resultados": "💸",
  "Falsificación de documentos": "📄",
  "Abandono de caso": "🚪",
  "Conflicto de interés": "⚖️",
};

const ListaNegra = () => {
  const [reportes, setReportes] = useState<Reporte[]>(() => {
    const saved = localStorage.getItem("ilex-reportes-v2");
    return saved ? JSON.parse(saved) : reportesIniciales;
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ abogado: "", motivo: "", descripcion: "" });
  const [votados, setVotados] = useState<number[]>(() => {
    const saved = localStorage.getItem("ilex-reportes-votados-v2");
    return saved ? JSON.parse(saved) : [];
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { localStorage.setItem("ilex-reportes-v2", JSON.stringify(reportes)); }, [reportes]);
  useEffect(() => { localStorage.setItem("ilex-reportes-votados-v2", JSON.stringify(votados)); }, [votados]);

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
    <section id="lista-negra" className="py-[100px] px-5 md:px-10 bg-background border-t border-copper/10" ref={ref}>
      <div className="container">
        <div className="text-center max-w-[720px] mx-auto mb-10">
          <p className="font-sans text-[10px] font-bold tracking-[4px] uppercase text-destructive mb-5 reveal">⚠ Lista Negra · Reportes Ciudadanos</p>
          <h2 className="font-display text-cream leading-[1.05] tracking-tight mb-5 reveal" style={{ fontSize: "clamp(32px, 4.5vw, 50px)", fontWeight: 400 }}>
            Abogados <span className="font-script italic text-destructive">reportados</span> por la comunidad
          </h2>
          <p className="font-serif-italic text-cream/65 leading-[1.7] text-[16px] reveal">
            Espacio para que los ciudadanos de SLP reporten malas prácticas legales. La transparencia protege a todos.
          </p>
        </div>

        <div className="text-center mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="reveal font-sans text-[11px] font-bold tracking-[2px] uppercase px-7 py-3.5 rounded-sm border border-destructive text-destructive bg-transparent cursor-pointer hover:bg-destructive hover:text-primary-foreground transition-all"
          >
            {showForm ? "✕ Cancelar" : "🚨 Reportar un abogado"}
          </button>
        </div>

        {showForm && (
          <div className="reveal visible bg-card rounded-sm p-7 border border-copper/15 mb-10 max-w-[640px] mx-auto">
            <h3 className="font-display text-cream text-xl font-semibold mb-4">Nuevo reporte anónimo</h3>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Nombre del abogado" value={form.abogado} onChange={(e) => setForm({ ...form, abogado: e.target.value })} className="font-sans text-sm px-4 py-3 rounded-sm border border-copper/20 bg-background text-cream outline-none focus:border-copper" />
              <select value={form.motivo} onChange={(e) => setForm({ ...form, motivo: e.target.value })} className="font-sans text-sm px-4 py-3 rounded-sm border border-copper/20 bg-background text-cream outline-none focus:border-copper">
                <option value="">Selecciona el motivo...</option>
                {Object.keys(motivoIcons).concat(["Negligencia profesional", "Fraude", "Otro"]).map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <textarea placeholder="Describe lo que sucedió..." value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={4} className="font-sans text-sm px-4 py-3 rounded-sm border border-copper/20 bg-background text-cream outline-none focus:border-copper resize-none" />
              <button onClick={handleSubmit} className="font-sans text-[11px] font-bold tracking-[2px] uppercase px-6 py-3 rounded-sm bg-destructive text-primary-foreground cursor-pointer hover:opacity-90 transition-all self-start">
                Enviar reporte →
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1100px] mx-auto">
          {sorted.map((r, idx) => (
            <div key={r.id} className="reveal bg-card rounded-sm p-6 border border-copper/15 relative hover:border-destructive/40 transition-all">
              <div className="absolute top-4 right-4 font-sans text-[10px] font-bold tracking-[1.5px] px-2.5 py-1 bg-destructive/15 text-destructive border border-destructive/30">
                #{idx + 1}
              </div>
              <div className="text-2xl mb-3">{motivoIcons[r.motivo] || "🚨"}</div>
              <div className="font-sans text-[10px] text-cream/40 mb-2">{r.fecha}</div>
              <div className="font-display text-cream text-[20px] font-semibold mb-1.5">{r.abogado}</div>
              <div className="font-sans text-[11px] font-bold tracking-[1.5px] uppercase text-destructive mb-3">{r.motivo}</div>
              <p className="font-sans text-[13px] text-cream/65 leading-[1.7] mb-4">{r.descripcion}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-copper/10">
                <button
                  onClick={() => handleVoto(r.id)}
                  disabled={votados.includes(r.id)}
                  className={`font-sans text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-2 rounded-sm border transition-all ${
                    votados.includes(r.id)
                      ? "border-copper/15 text-cream/30 cursor-default"
                      : "border-destructive/40 text-destructive hover:bg-destructive hover:text-primary-foreground cursor-pointer"
                  }`}
                >
                  {votados.includes(r.id) ? "✓ Confirmaste" : "Confirmar reporte"}
                </button>
                <span className="font-sans text-[13px] font-bold text-destructive">· {r.votos}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 max-w-[700px] mx-auto text-center">
          <p className="font-sans text-[12px] text-cream/50 leading-[1.8]">
            ⚖️ Los reportes son opiniones de ciudadanos. iLEX POTOSÍ no verifica la veracidad de cada reporte. Si eres abogado y consideras que un reporte es falso, <a href="mailto:iLEX.POTOSI@protonmail.com" className="text-copper no-underline hover:underline">contáctanos</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ListaNegra;
