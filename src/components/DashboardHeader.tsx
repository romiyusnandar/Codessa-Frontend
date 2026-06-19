"use client";

import { API_URL } from "@/lib/api";
import { AuthMeResponse } from "@/lib/types";

export function DashboardHeader({ user }: { user: AuthMeResponse }) {
  async function handleLogout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-slate-900">Codessa</span>
      </div>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm font-medium text-slate-700">{user.username}</span>
        <button
          onClick={handleLogout}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
