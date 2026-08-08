import Image from "next/image";

// The logo file (public/codesa_sq.png) is a full square lockup: shield on top,
// "CODESSA" wordmark below. LogoMark crops to just the shield so the logo reads
// as a compact icon at small sizes.
export function LogoMark({
  size = 28,
  rounded = "rounded-md",
}: {
  size?: number;
  rounded?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden bg-white ${rounded}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/codesa_sq.png"
        alt="Codessa"
        width={Math.round(size * 2.15)}
        height={Math.round(size * 2.15)}
        priority
        className="absolute max-w-none"
        style={{ left: -0.63 * size, top: -0.36 * size }}
      />
    </span>
  );
}
