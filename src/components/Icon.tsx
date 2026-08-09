import type { CSSProperties } from "react";

// Material Symbols icon. The font is loaded in the root layout.
export function Icon({
  name,
  className,
  filled,
  size,
  title,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  /** Pixel size, set via inline style so it always wins over any competing
   *  CSS (font-size utility classes have occasionally been overridden by
   *  cascade layer ordering here — inline style has the highest priority). */
  size?: number;
  title?: string;
}) {
  const style: CSSProperties = {
    ...(filled ? { fontVariationSettings: "'FILL' 1" } : undefined),
    ...(size ? { fontSize: size, width: size, height: size } : undefined),
  };

  return (
    <span
      className={`material-symbols-outlined ${className ?? ""}`}
      style={Object.keys(style).length ? style : undefined}
      title={title}
      aria-hidden={title ? undefined : true}
    >
      {name}
    </span>
  );
}
