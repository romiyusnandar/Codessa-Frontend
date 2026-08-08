"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/lib/hooks";
import { ApiError } from "@/lib/api";
import { useMobileDrawer } from "@/components/MobileDrawer";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { InstallToast, TokenRevokedBanner } from "@/components/DashboardBanners";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, error, isLoading } = useAuthMe();
  const drawer = useMobileDrawer();

  useEffect(() => {
    if (error instanceof ApiError && error.status === 401) {
      router.replace("/");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <p className="text-sm text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
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
