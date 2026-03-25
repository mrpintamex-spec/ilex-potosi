const Footer = () => {
  return (
    <footer className="bg-teal-deep px-5 md:px-10 pt-[60px] pb-[30px] text-primary-foreground/70">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 max-w-[1140px] mx-auto pb-10 border-b border-primary-foreground/10 mb-7">
        <div>
          <div className="font-display font-black text-[22px] text-primary-foreground">iLEX <span className="text-copper">POTOSÍ</span></div>
          <p className="font-display text-[13px] leading-[1.7] text-primary-foreground/50 mt-3 max-w-[300px]">
            Orientación legal gratuita especializada en San Luis Potosí. Honesta, directa y clara. Desarrollado por ViBeSLP.
          </p>
        </div>
        <div>
          <h4 className="font-display text-xs font-bold tracking-[2px] uppercase text-copper mb-4">Servicios</h4>
          <ul className="list-none grid gap-2">
            {["Consulta Legal", "Áreas Legales", "Directorio Abogados", "Contacto"].map((item, i) => (
              <li key={item}><a href={`#${["consulta", "areas", "directorio", "contacto"][i]}`} className="font-display text-[13px] text-primary-foreground/55 no-underline hover:text-primary-foreground transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xs font-bold tracking-[2px] uppercase text-copper mb-4">Legal</h4>
          <ul className="list-none grid gap-2">
            <li><a href="#aviso-privacidad" className="font-display text-[13px] text-primary-foreground/55 no-underline hover:text-primary-foreground transition-colors">Aviso de Privacidad</a></li>
            <li><a href="#terminos-uso" className="font-display text-[13px] text-primary-foreground/55 no-underline hover:text-primary-foreground transition-colors">Términos de Uso</a></li>
            <li><a href="mailto:iLEX.POTOSI@protonmail.com" className="font-display text-[13px] text-primary-foreground/55 no-underline hover:text-primary-foreground transition-colors">Email</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1140px] mx-auto flex justify-between items-center flex-wrap gap-3">
        <p className="font-display text-[11px] text-primary-foreground/30">© 2025 <span className="text-copper">iLEX POTOSÍ</span> · Desarrollado por <span className="text-copper">ViBeSLP</span> · San Luis Potosí, México</p>
        <p className="font-display text-[11px] text-primary-foreground/30">La información es orientativa. No sustituye asesoría jurídica profesional.</p>
      </div>
    </footer>
  );
};

export default Footer;
