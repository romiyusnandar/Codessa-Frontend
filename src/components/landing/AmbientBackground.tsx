// Decorative hero backdrop: soft color blobs + a faded grid overlay.
export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-secondary-container/30 mix-blend-multiply blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-primary-container/10 opacity-50 mix-blend-multiply blur-[120px]" />
      <div
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
