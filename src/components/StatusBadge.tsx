import { ReviewStatus, ReviewSeverity } from "@/lib/types";

const statusStyles: Record<ReviewStatus, string> = {
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  running: "bg-yellow-100 text-yellow-700",
  pending: "bg-gray-100 text-gray-700",
  skipped: "bg-slate-100 text-slate-500",
};

const severityStyles: Record<ReviewSeverity, string> = {
  info: "bg-blue-100 text-blue-700",
  minor: "bg-yellow-100 text-yellow-700",
  major: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: ReviewSeverity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${severityStyles[severity]}`}
    >
      {severity}
    </span>
  );
}
