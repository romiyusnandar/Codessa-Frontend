import { Icon } from "@/components/Icon";
import type { ReviewVerdict } from "@/lib/types";

// Escalating from "good" to "serious", reusing the same secondary/tertiary/
// error roles SeverityBadge uses so the color language stays consistent
// across the dashboard.
const verdictBadge: Record<ReviewVerdict, { icon: string; cls: string }> = {
  passed: { icon: "check_circle", cls: "bg-secondary text-on-secondary shadow-sm" },
  issues_found: { icon: "report", cls: "bg-tertiary/15 text-tertiary" },
  error: { icon: "cancel", cls: "bg-error text-on-error" },
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
