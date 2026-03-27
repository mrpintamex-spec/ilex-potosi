const AdBanner = ({ id }: { id: string }) => {
  return (
    <div
      id={`ad-${id}`}
      className="w-full max-w-[728px] mx-auto my-2 px-4"
    >
      <div className="w-full h-[90px] rounded-lg border border-border bg-muted/40 flex items-center justify-center gap-2 text-muted-foreground font-display text-xs tracking-wider uppercase">
        <span className="opacity-40">— Espacio publicitario —</span>
      </div>
    </div>
  );
};

export default AdBanner;
