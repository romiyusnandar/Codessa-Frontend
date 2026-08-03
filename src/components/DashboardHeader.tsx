"use client";

import { logout } from "@/lib/api";
import { AuthMeResponse } from "@/lib/types";

export function DashboardHeader({ user }: { user: AuthMeResponse }) {
  return (
    <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3.5">
      <span className="text-[15px] font-semibold tracking-tight text-ink">Codessa</span>

      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="h-7 w-7 rounded-full ring-1 ring-line"
        />
        <span className="text-sm text-ink">{user.username}</span>
        <button
          onClick={logout}
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:border-ink/15 hover:bg-canvas hover:text-ink"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
