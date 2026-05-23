import { Link } from "react-router-dom";

const TerminosUso = () => (
  <div className="min-h-screen bg-background">
    <nav className="h-16 flex items-center px-5 md:px-10 bg-teal-deep border-b border-copper/20">
      <Link to="/" className="font-display font-black text-xl text-cream no-underline">
        iLEX <span className="text-copper">POTOSÍ</span>
      </Link>
    </nav>
    <main className="max-w-[720px] mx-auto px-5 py-16">
      <h1 className="font-display text-3xl font-extrabold text-copper mb-6">Términos de Uso</h1>
      <div className="prose prose-sm text-foreground/80 font-display space-y-4 text-[14px] leading-[1.8]">
        <h2 className="text-lg font-bold text-copper mt-8">1. Naturaleza del servicio</h2>
        <p>iLEX POTOSÍ es una plataforma de <strong>orientación legal gratuita</strong>. La información proporcionada por el chatbot y el contenido del sitio son de carácter informativo y orientativo. <strong>No constituyen asesoría jurídica profesional</strong> ni sustituyen la consulta con un abogado titulado.</p>
        <h2 className="text-lg font-bold text-copper mt-8">2. Uso del chatbot</h2>
        <p>El chatbot utiliza inteligencia artificial para responder consultas legales generales con enfoque en la legislación de San Luis Potosí. Las respuestas pueden contener imprecisiones. Siempre consulta a un profesional antes de tomar decisiones legales.</p>
        <h2 className="text-lg font-bold text-copper mt-8">3. Directorio de abogados</h2>
        <p>El ranking del directorio se basa en calificaciones de usuarios reales. iLEX POTOSÍ no garantiza la calidad de los servicios de los abogados listados. La verificación se limita a datos de cédula profesional.</p>
        <h2 className="text-lg font-bold text-copper mt-8">4. Lista Negra</h2>
        <p>Los reportes ciudadanos son anónimos y reflejan experiencias individuales. iLEX POTOSÍ no verifica la veracidad de los reportes pero se reserva el derecho de eliminar contenido difamatorio o falso.</p>
        <h2 className="text-lg font-bold text-copper mt-8">5. Limitación de responsabilidad</h2>
        <p>iLEX POTOSÍ y ViBeSLP no se hacen responsables por decisiones tomadas con base en la información proporcionada en esta plataforma. El uso del sitio es bajo la responsabilidad del usuario.</p>
        <h2 className="text-lg font-bold text-copper mt-8">6. Propiedad intelectual</h2>
        <p>Todo el contenido, diseño y código de iLEX POTOSÍ es propiedad de ViBeSLP. Queda prohibida su reproducción sin autorización.</p>
        <p className="text-muted-foreground text-xs mt-8">Última actualización: marzo 2025</p>
      </div>
      <Link to="/" className="inline-block mt-8 font-display text-sm font-semibold text-copper hover:underline">← Volver al inicio</Link>
    </main>
  </div>
);

export default TerminosUso;
