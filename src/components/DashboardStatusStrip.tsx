"use client";

import { useRepositories, useReviews } from "@/lib/hooks";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-sm font-semibold text-ink">{value}</span>
      <span className="text-xs text-ink-muted">{label}</span>
    </div>
  );
}

export function DashboardStatusStrip() {
  const { repositories } = useRepositories(1, 1, "");
  const { reviews } = useReviews();

  const totalRepos = repositories?.total;
  const totalReviews = reviews?.length;
  const failedCount = reviews?.filter((r) => r.status === "failed").length ?? 0;
  const successCount = reviews?.filter((r) => r.status === "success").length ?? 0;
  const finished = successCount + failedCount;
  const successRate = finished > 0 ? Math.round((successCount / finished) * 100) : undefined;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line bg-white px-6 py-2.5">
      <Stat label="repositories" value={totalRepos !== undefined ? String(totalRepos) : "—"} />
      <Stat label="reviews" value={totalReviews !== undefined ? String(totalReviews) : "—"} />
      <Stat
        label="success rate"
        value={successRate !== undefined ? `${successRate}%` : "—"}
      />
    </div>
  );
}
