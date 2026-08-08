import type { ReviewSeverity } from "@/lib/types";

// Escalating visual weight from neutral -> blue -> translucent red -> solid
// red, since the Material palette here doesn't have a distinct amber tone.
const severityStyles: Record<ReviewSeverity, string> = {
  info: "bg-surface-container-highest text-on-surface-variant",
  minor: "bg-tertiary/10 text-tertiary",
  major: "bg-error-container/20 text-error",
  critical: "bg-error text-on-error",
};

export function SeverityBadge({ severity }: { severity: ReviewSeverity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}
