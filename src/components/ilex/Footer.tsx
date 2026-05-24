import ilexMark from "@/assets/ilex-mark.png";

const Footer = () => {
  return (
    <footer className="bg-teal-deep px-5 md:px-10 pt-[60px] pb-[30px] text-cream/60 border-t border-copper/15">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 max-w-[1200px] mx-auto pb-10 border-b border-copper/10 mb-7">
        <div>
          <div className="flex items-center gap-3">
            <img src={ilexMark} alt="iLEX POTOSÍ" className="w-10 h-10 object-contain" />
            <div className="font-display text-2xl text-cream">iLEX <span className="text-copper">POTOSÍ</span></div>
          </div>
          <p className="font-sans text-[13px] leading-[1.75] text-cream/45 mt-3 max-w-[320px]">
            Orientación legal gratuita especializada en San Luis Potosí. Honesta, directa y clara. Desarrollado por ViBeSLP.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs font-bold tracking-[2px] uppercase text-copper mb-4">Servicios</h4>
          <ul className="list-none grid gap-2">
            {["Consulta Legal", "Áreas Legales", "Directorio Abogados", "Contacto"].map((item, i) => (
              <li key={item}><a href={`#${["consulta", "areas", "directorio", "contacto"][i]}`} className="font-sans text-[13px] text-cream/55 no-underline hover:text-copper transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-xs font-bold tracking-[2px] uppercase text-copper mb-4">Legal</h4>
          <ul className="list-none grid gap-2">
            <li><a href="/aviso-privacidad" className="font-sans text-[13px] text-cream/55 no-underline hover:text-copper transition-colors">Aviso de Privacidad</a></li>
            <li><a href="/terminos-uso" className="font-sans text-[13px] text-cream/55 no-underline hover:text-copper transition-colors">Términos de Uso</a></li>
            <li><a href="https://ilex-potosi.com" className="font-sans text-[13px] text-cream/55 no-underline hover:text-copper transition-colors">ilex-potosi.com</a></li>
            <li><a href="mailto:iLEX.POTOSI@protonmail.com" className="font-sans text-[13px] text-cream/55 no-underline hover:text-copper transition-colors">iLEX.POTOSI@protonmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-3">
        <p className="font-sans text-[11px] text-cream/30">© 2025 <span className="text-copper">iLEX POTOSÍ</span> · <a href="https://ilex-potosi.com" className="text-copper hover:underline">ilex-potosi.com</a> · <a href="mailto:iLEX.POTOSI@protonmail.com" className="text-copper hover:underline">iLEX.POTOSI@protonmail.com</a> · San Luis Potosí, México</p>
        <p className="font-sans text-[11px] text-cream/30">La información es orientativa. No sustituye asesoría jurídica profesional.</p>
      </div>
    </footer>
  );
};

export default Footer;
