import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdBanner = ({ slot = "horizontal" }: { slot?: string }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!pushed.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch {
        // AdSense not loaded yet
      }
    }
  }, []);

  return (
    <div className="w-full bg-card border-y border-copper/15">
      <div className="container max-w-[728px] mx-auto py-3 px-4 text-center">
        <p className="font-display text-[9px] tracking-[2px] uppercase text-cream/30 mb-1.5">Publicidad</p>
        <div ref={adRef}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4474800452331884"
            data-ad-slot={slot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
