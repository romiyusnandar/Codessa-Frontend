"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/lib/hooks";
import { ApiError } from "@/lib/api";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStatusStrip } from "@/components/DashboardStatusStrip";
import { Sidebar } from "@/components/Sidebar";
import { InstallToast, TokenRevokedBanner } from "@/components/DashboardBanners";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, error, isLoading } = useAuthMe();

  useEffect(() => {
    if (error instanceof ApiError && error.status === 401) {
      router.replace("/");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-canvas">
        <p className="text-sm text-ink-muted">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col bg-canvas">
      <DashboardHeader user={user} />
      <DashboardStatusStrip />

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />

        <main className="w-full flex-1 px-8 py-10 sm:px-10 lg:px-12">
          <Suspense fallback={null}>
            <InstallToast />
          </Suspense>

          <TokenRevokedBanner tokenRevoked={user.tokenRevoked} />

          {children}
        </main>
      </div>
    </div>
  );
}
