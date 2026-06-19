"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/lib/hooks";
import { ApiError } from "@/lib/api";
import { DashboardHeader } from "@/components/DashboardHeader";
import { InstallToast, TokenRevokedBanner } from "@/components/DashboardBanners";
import { RepositoriesSection } from "@/components/RepositoriesSection";
import { ReviewHistorySection } from "@/components/ReviewHistorySection";
import { SettingsSection } from "@/components/SettingsSection";

export default function DashboardPage() {
  const router = useRouter();
  const { user, error, isLoading, mutate } = useAuthMe();

  useEffect(() => {
    if (error instanceof ApiError && error.status === 401) {
      router.replace("/");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <DashboardHeader user={user} />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        <Suspense fallback={null}>
          <InstallToast />
        </Suspense>

        <TokenRevokedBanner tokenRevoked={user.tokenRevoked} />

        <div className="flex flex-col gap-6">
          <RepositoriesSection />
          <ReviewHistorySection />
          <SettingsSection user={user} mutateUser={mutate} />
        </div>
      </main>
    </div>
  );
}
