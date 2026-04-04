import ilexLogo from "@/assets/ilex-logo.jpg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-5 md:px-10 justify-between bg-teal-deep/[0.97] backdrop-blur-md border-b border-copper/20">
      <a href="#inicio" className="flex items-center gap-2.5 no-underline">
        <img src={ilexLogo} alt="iLEX POTOSÍ" className="w-9 h-9 rounded-full object-cover" />
        <span className="font-display font-black text-xl tracking-tight text-primary-foreground">
          iLEX <span className="text-copper">POTOSÍ</span>
        </span>
      </a>
      <ul className="hidden md:flex gap-2 items-center list-none">
        <li><a href="#consulta" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Consulta Legal</a></li>
        <li><a href="#areas" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Áreas</a></li>
        <li><a href="#directorio" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Abogados</a></li>
        <li><a href="#lista-negra" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Lista Negra</a></li>
        <li><a href="#documentos" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Documentos</a></li>
        <li><a href="#contacto" className="font-display text-[13px] font-medium text-primary-foreground/75 no-underline px-3.5 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary-foreground/[0.08] transition-all">Contacto</a></li>
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
