import { Icon } from "@/components/Icon";
import type { ReviewStatus } from "@/lib/types";

const statusBadge: Record<ReviewStatus, { icon: string; cls: string; spin?: boolean }> = {
  success: { icon: "done_all", cls: "bg-secondary text-on-secondary shadow-sm" },
  running: {
    icon: "sync",
    cls: "bg-surface-container-highest text-on-surface-variant",
    spin: true,
  },
  pending: { icon: "hourglass_empty", cls: "bg-surface-container-highest text-on-surface-variant" },
  failed: { icon: "error", cls: "bg-error-container/20 text-error" },
  skipped: { icon: "block", cls: "bg-surface-container-highest text-on-surface-variant" },
};

export function ReviewStatusBadge({
  status,
  errorMessage,
}: {
  status: ReviewStatus;
  errorMessage?: string;
}) {
  const cfg = statusBadge[status];
  return (
    <div
      className={`flex max-w-[220px] items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${cfg.cls}`}
    >
      <Icon name={cfg.icon} className={`shrink-0 text-[14px] ${cfg.spin ? "animate-spin" : ""}`} />
      <span className="truncate" title={errorMessage}>
        {status}
      </span>
    </div>
  );
}
