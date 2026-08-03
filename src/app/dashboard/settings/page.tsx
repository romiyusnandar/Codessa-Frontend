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
      <AccountSection user={user} />
      <SettingsSection user={user} mutateUser={mutate} />
    </div>
  );
}
