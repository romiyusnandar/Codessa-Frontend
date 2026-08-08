"use client";

import Link from "next/link";
import { logout } from "@/lib/api";
import { AuthMeResponse } from "@/lib/types";
import { LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "@/components/ThemeToggle";

export function DashboardHeader({ user }: { user: AuthMeResponse }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/80 px-6 py-3.5 backdrop-blur-md">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink"
      >
        <LogoMark size={28} />
        Codessa
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="h-7 w-7 rounded-full ring-1 ring-line"
        />
        <span className="hidden text-sm text-ink sm:inline">{user.username}</span>
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
