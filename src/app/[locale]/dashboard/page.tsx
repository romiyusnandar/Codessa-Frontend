"use client";

import { useRepositories } from "@/lib/hooks";
import { NotInstalledHero } from "@/components/dashboard/NotInstalledHero";
import { InstalledOverview } from "@/components/dashboard/InstalledOverview";
import { Icon } from "@/components/Icon";

export default function OverviewPage() {
  const { repositories, isLoading, error } = useRepositories(1, 1, "", true);
  const hasInstalled = (repositories?.total ?? 0) > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="max-w-md rounded-xl border border-outline-variant/30 bg-surface-container p-6 text-center shadow-sm">
          <Icon name="wifi_off" className="mx-auto mb-3 text-[32px] text-error" />
          <p className="mb-1 text-base font-semibold text-on-surface">Gagal memuat dashboard</p>
          <p className="text-sm text-on-surface-variant">
            {error instanceof Error ? error.message : "Terjadi kesalahan saat memuat data."}
          </p>
        </div>
      </div>
    );
  }

  return hasInstalled ? <InstalledOverview /> : <NotInstalledHero />;
}
