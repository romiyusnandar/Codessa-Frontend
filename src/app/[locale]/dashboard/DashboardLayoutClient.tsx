"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/lib/hooks";
import { ApiError } from "@/lib/api";
import { useMobileDrawer } from "@/components/MobileDrawer";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { InstallToast, TokenRevokedBanner } from "@/components/DashboardBanners";
import { Icon } from "@/components/Icon";

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, error, isLoading, mutate } = useAuthMe();
  const drawer = useMobileDrawer();
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (error instanceof ApiError && error.status === 401) {
      const locale = window.location.pathname.split("/")[1];
      const validLocale = ["en", "id"].includes(locale) ? locale : "en";
      router.replace(`/${validLocale}`);
    }
  }, [error, router]);

  async function handleRetry() {
    setRetrying(true);
    try {
      await mutate();
    } finally {
      setRetrying(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <p className="text-sm text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  if (error && !(error instanceof ApiError && error.status === 401)) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="max-w-md rounded-xl border border-outline-variant/30 bg-surface-container p-6 text-center shadow-sm">
          <Icon name="wifi_off" className="mx-auto mb-3 text-[32px] text-error" />
          <p className="mb-1 text-base font-semibold text-on-surface">Gagal memuat dashboard</p>
          <p className="mb-4 text-sm text-on-surface-variant">
            {error instanceof Error ? error.message : "Terjadi kesalahan saat memuat data."}
          </p>
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary transition hover:opacity-90 disabled:opacity-50"
          >
            {retrying ? "Mencoba lagi..." : "Coba lagi"}
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <p className="text-sm text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface">
      <DashboardSidebar drawer={drawer} />
      <DashboardTopbar user={user} drawer={drawer} />

      <main className="relative min-h-screen overflow-x-hidden pt-16 md:pl-72">
        <Suspense fallback={null}>
          <InstallToast />
        </Suspense>
        <TokenRevokedBanner tokenRevoked={user.tokenRevoked} />

        {children}
      </main>
    </div>
  );
}
