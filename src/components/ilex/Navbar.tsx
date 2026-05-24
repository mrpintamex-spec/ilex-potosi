import ilexMark from "@/assets/ilex-mark.png";

const navItems = [
  { href: "#consulta", label: "Consulta" },
  { href: "#diagnostico", label: "Diagnóstico" },
  { href: "#documentos", label: "Documentos" },
  { href: "#areas", label: "Áreas" },
  { href: "#directorio", label: "Abogados" },
  { href: "#lista-negra", label: "Lista Negra" },
  { href: "#contacto", label: "Contacto" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-5 md:px-10 justify-between bg-background/85 backdrop-blur-md border-b border-copper/15">
      <a href="#inicio" className="flex items-center gap-3 no-underline">
        <img src={ilexMark} alt="iLEX POTOSÍ" className="w-10 h-10 object-contain" />
        <span className="font-display text-lg tracking-tight text-cream">
          iLEX <span className="text-copper">POTOSÍ</span>
        </span>
      </a>
      <ul className="hidden md:flex gap-1 items-center list-none">
        {navItems.map((n) => (
          <li key={n.href}>
            <a href={n.href} className="font-sans text-[11px] font-medium tracking-[1.5px] uppercase text-cream/65 no-underline px-3 py-2 rounded-sm hover:text-copper transition-all">
              {n.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#consulta" className="font-sans text-[11px] font-bold tracking-[2px] uppercase border border-copper/60 text-copper px-4 py-2 rounded-sm hover:bg-copper hover:text-primary-foreground transition-all no-underline ml-2">
            Asesoría
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
