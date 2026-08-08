"use client";

import { logout } from "@/lib/api";
import { AuthMeResponse } from "@/lib/types";
import { Icon } from "@/components/Icon";
import { LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { useMobileDrawer } from "@/components/MobileDrawer";

export function DashboardTopbar({
  user,
  drawer,
}: {
  user: AuthMeResponse;
  drawer: ReturnType<typeof useMobileDrawer>;
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-outline-variant/20 bg-surface/80 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl md:left-72 md:px-8">
      <div className="flex items-center gap-2.5">
        <button
          onClick={drawer.openDrawer}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-outline-variant/30 text-on-surface transition hover:bg-surface-container active:scale-90 md:hidden"
        >
          <Icon name="menu" />
        </button>
        <div className="flex items-center gap-2 md:hidden">
          <LogoMark size={24} />
          <span className="font-display text-sm font-semibold text-on-surface">Codessa</span>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-high px-4 py-2 sm:flex">
        <Icon name="search" className="text-[18px] text-on-surface-variant" />
        <input
          type="text"
          placeholder="Search codebase..."
          className="w-48 border-none bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-0"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <ThemeToggle />
        <button
          aria-label="Notifications"
          className="relative rounded-md p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
        >
          <Icon name="notifications" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="h-8 w-8 rounded-full border border-outline-variant/20 object-cover"
        />
        <button
          onClick={logout}
          className="hidden rounded-md border border-outline-variant/30 px-3 py-1.5 text-xs font-medium text-on-surface-variant transition hover:border-outline hover:text-on-surface sm:block"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
