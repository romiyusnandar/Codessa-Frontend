import Image from "next/image";

// The logo file (public/codessa_logo.png) is a full square lockup: the chevron
// mark on top, "Codessa" wordmark below, on a dark navy tile. LogoMark crops to
// just the chevron mark so the logo reads as a compact icon at small sizes.
export function LogoMark({
  size = 28,
  rounded = "rounded-md",
}: {
  size?: number;
  rounded?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden ${rounded}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/codessa_logo.png"
        alt="Codessa"
        width={Math.round(size * 2)}
        height={Math.round(size * 2)}
        priority
        className="absolute max-w-none"
        style={{ left: -0.51 * size, top: -0.34 * size }}
      />
    </span>
  );
}
