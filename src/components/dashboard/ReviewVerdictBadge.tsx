import { Icon } from "@/components/Icon";
import type { ReviewVerdict } from "@/lib/types";

// Semantic traffic-light colors: green = passed, yellow = issues found, red = error.
const verdictBadge: Record<ReviewVerdict, { icon: string; cls: string }> = {
  passed: { icon: "check_circle", cls: "bg-moss-soft text-moss" },
  issues_found: { icon: "report", cls: "bg-amber-soft text-amber" },
  error: { icon: "cancel", cls: "bg-rust-soft text-rust" },
};

export function ReviewVerdictBadge({ verdict }: { verdict: ReviewVerdict }) {
  const cfg = verdictBadge[verdict];
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${cfg.cls}`}
    >
      <Icon name={cfg.icon} filled className="shrink-0 text-[14px]" />
      {verdict.replace(/_/g, " ")}
    </div>
  );
}
