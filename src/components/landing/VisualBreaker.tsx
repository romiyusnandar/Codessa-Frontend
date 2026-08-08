const phrases = [
  { text: "// ANALYZING_DIFF", dot: "text-secondary" },
  { text: "GENERATING_INSIGHTS", dot: "text-tertiary" },
  { text: "CHECKING_VULNERABILITIES", dot: "text-primary" },
  { text: "OPTIMIZING_PERFORMANCE", dot: "text-secondary" },
];

export function VisualBreaker() {
  return (
    <section className="relative w-full overflow-hidden py-12">
      <div className="absolute inset-0 -z-10 origin-top-left -skew-y-3 transform bg-secondary-container/20" />
      <div className="pointer-events-none flex select-none overflow-hidden py-4 opacity-50">
        <div className="flex animate-[slide_20s_linear_infinite] gap-8 whitespace-nowrap font-mono text-5xl text-on-surface-variant/40">
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center gap-8">
              {phrases.map((p, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span>{p.text}</span>
                  <span className={p.dot}>•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
