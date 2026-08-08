"use client";

import { useRepositories } from "@/lib/hooks";
import { NotInstalledHero } from "@/components/dashboard/NotInstalledHero";
import { InstalledOverview } from "@/components/dashboard/InstalledOverview";

export default function OverviewPage() {
  // The only real signal used right now — everything else on this page is
  // placeholder content until the installed-state view is wired to live data.
  const { repositories, isLoading } = useRepositories(1, 1, "");
  const hasInstalled = (repositories?.total ?? 0) > 0;

  if (isLoading) {
    return null;
  }

  return hasInstalled ? <InstalledOverview /> : <NotInstalledHero />;
}
