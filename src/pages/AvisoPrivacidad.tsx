import { Link } from "react-router-dom";

const AvisoPrivacidad = () => (
  <div className="min-h-screen bg-background">
    <nav className="h-16 flex items-center px-5 md:px-10 bg-teal-deep border-b border-copper/20">
      <Link to="/" className="font-display font-black text-xl text-cream no-underline">
        iLEX <span className="text-copper">POTOSÍ</span>
      </Link>
    </nav>
    <main className="max-w-[720px] mx-auto px-5 py-16">
      <h1 className="font-display text-3xl font-extrabold text-copper mb-6">Aviso de Privacidad</h1>
      <div className="prose prose-sm text-foreground/80 font-display space-y-4 text-[14px] leading-[1.8]">
        <p><strong>Responsable:</strong> iLEX POTOSÍ, plataforma desarrollada por ViBeSLP, con domicilio en San Luis Potosí, S.L.P., México.</p>
        <h2 className="text-lg font-bold text-copper mt-8">Datos que recopilamos</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Consultas realizadas al chatbot legal (sin asociarlas a datos personales identificables).</li>
          <li>Datos proporcionados voluntariamente en formularios de contacto y registro de abogados: nombre, teléfono, correo electrónico, cédula profesional.</li>
          <li>Reportes ciudadanos en la Lista Negra (anónimos).</li>
        </ul>
        <h2 className="text-lg font-bold text-copper mt-8">Finalidad del tratamiento</h2>
        <p>Los datos se utilizan exclusivamente para: brindar orientación legal gratuita, operar el directorio de abogados verificados, gestionar reportes ciudadanos y mejorar el servicio.</p>
        <h2 className="text-lg font-bold text-copper mt-8">Protección de datos</h2>
        <p>No vendemos, compartimos ni transferimos datos personales a terceros. Las consultas al chatbot son procesadas de forma anónima. Implementamos medidas de seguridad técnicas y administrativas para proteger tu información.</p>
        <h2 className="text-lg font-bold text-copper mt-8">Derechos ARCO</h2>
        <p>Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición enviando un correo a <a href="mailto:iLEX.POTOSI@protonmail.com" className="text-copper hover:underline">iLEX.POTOSI@protonmail.com</a>.</p>
        <h2 className="text-lg font-bold text-copper mt-8">Cambios al aviso</h2>
        <p>Nos reservamos el derecho de modificar este aviso. Cualquier cambio será publicado en esta página.</p>
        <p className="text-muted-foreground text-xs mt-8">Última actualización: marzo 2025</p>
      </div>
      <Link to="/" className="inline-block mt-8 font-display text-sm font-semibold text-copper hover:underline">← Volver al inicio</Link>
    </main>
  </div>
);

export default AvisoPrivacidad;
