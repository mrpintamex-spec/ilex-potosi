const AdBanner = ({ slot = "horizontal" }: { slot?: string }) => (
  <div className="w-full bg-muted/50 border-y border-border">
    <div className="container max-w-[728px] mx-auto py-3 px-4 text-center">
      <div className="bg-background/60 border border-dashed border-border rounded-lg h-[90px] flex items-center justify-center">
        <span className="font-display text-[11px] text-muted-foreground tracking-widest uppercase">
          Espacio publicitario · {slot}
        </span>
      </div>
    </div>
  </div>
);

export default AdBanner;
