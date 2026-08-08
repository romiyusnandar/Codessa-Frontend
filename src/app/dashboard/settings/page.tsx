"use client";

import { useAuthMe } from "@/lib/hooks";
import { AccountSection } from "@/components/AccountSection";
import { SettingsSection } from "@/components/SettingsSection";

export default function SettingsPage() {
  const { user, isLoading, mutate } = useAuthMe();

  if (isLoading || !user) {
    return <p className="text-sm text-ink-muted">Loading...</p>;
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Dashboard
        </span>
        <h1 className="text-xl font-semibold text-ink">Settings</h1>
      </div>
      <AccountSection user={user} />
      <SettingsSection user={user} mutateUser={mutate} />
    </div>
  );
}
