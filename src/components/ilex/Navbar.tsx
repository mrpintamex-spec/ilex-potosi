const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-5 md:px-10 justify-between bg-teal-deep/[0.97] backdrop-blur-md border-b border-copper/20">
      <a href="#inicio" className="font-display font-black text-xl tracking-tight text-primary-foreground no-underline">
        iLEX <span className="text-copper">POTOSÍ</span>
      </a>
      <ul className="hidden md:flex gap-2 items-center list-none">
        <li><a href="#consulta" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Consulta Legal</a></li>
        <li><a href="#areas" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Áreas</a></li>
        <li><a href="#directorio" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Abogados</a></li>
        <li><a href="#contacto" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Contacto</a></li>
        <li>
          <a href="mailto:iLEX.POTOSI@protonmail.com" className="font-display text-xs font-semibold text-[#90c8f0] border border-[#90c8f0]/30 px-3.5 py-1.5 rounded-lg hover:bg-[#90c8f0]/10 hover:border-[#90c8f0]/60 transition-all flex items-center gap-1.5 no-underline">
            ✉ Contacto
          </a>
        </li>
        <li>
          <a href="#consulta" className="font-display text-[13px] font-semibold bg-copper text-primary-foreground px-4.5 py-[7px] rounded-lg hover:bg-[#d4933a] hover:-translate-y-px transition-all no-underline">
            Consultar Gratis
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
