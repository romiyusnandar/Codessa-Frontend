import { ReviewStatus, ReviewSeverity } from "@/lib/types";

const statusStyles: Record<ReviewStatus, string> = {
  success: "bg-moss-soft text-moss",
  failed: "bg-rust-soft text-rust",
  running: "bg-amber-soft text-amber",
  pending: "border border-line bg-canvas text-ink-muted",
  skipped: "bg-line/50 text-ink-muted",
};

const severityStyles: Record<ReviewSeverity, string> = {
  info: "bg-accent-soft text-accent",
  minor: "bg-amber-soft text-amber",
  major: "border border-rust/25 bg-rust-soft text-rust",
  critical: "bg-rust text-white",
};

export function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: ReviewSeverity }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}
