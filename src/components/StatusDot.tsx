import { ReviewStatus } from "@/lib/types";

type DotColor = "moss" | "rust" | "amber" | "muted";

const dotColor: Record<DotColor, string> = {
  moss: "bg-moss",
  rust: "bg-rust",
  amber: "bg-amber",
  muted: "bg-ink-muted/40",
};

export const reviewStatusDotColor: Record<ReviewStatus, DotColor> = {
  success: "moss",
  failed: "rust",
  running: "amber",
  pending: "muted",
  skipped: "muted",
};

export function StatusDot({ color }: { color: DotColor }) {
  return <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${dotColor[color]}`} />;
}
