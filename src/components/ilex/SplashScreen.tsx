import { useState, useEffect } from "react";
import ilexLogo from "@/assets/ilex-logo.jpg";

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2800);
    const t2 = setTimeout(() => setVisible(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 pointer-events-auto transition-opacity duration-700 ${fading ? "opacity-0 pointer-events-none" : ""}`}
      style={{ background: "linear-gradient(150deg, #071e25 0%, #0b2e38 50%, #071e25 100%)" }}
    >
      <img src={ilexLogo} alt="iLEX POTOSÍ Logo" className="w-28 h-28 rounded-full object-cover shadow-ilex-lg" style={{ animation: "splashIn 0.6s ease 0.3s both" }} />
      <div className="font-display font-black text-3xl text-primary-foreground tracking-[-1px]" style={{ animation: "splashIn 0.6s ease 0.6s both" }}>
        iLEX <span className="text-copper">POTOSÍ</span>
      </div>
      <div className="font-display text-xs text-primary-foreground/40 tracking-[3px] uppercase" style={{ animation: "splashIn 0.6s ease 0.9s both" }}>
        Asesor Legal Inteligente
      </div>
      <div className="flex gap-1 mt-4" style={{ animation: "splashIn 0.6s ease 1.2s both" }}>
        <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce" />
        <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce-2" />
        <div className="w-1.5 h-1.5 rounded-full bg-copper animate-wbounce-3" />
      </div>
    </div>
  );
};

export default SplashScreen;
