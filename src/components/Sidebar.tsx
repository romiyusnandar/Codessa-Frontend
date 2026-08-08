"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SVGProps } from "react";

function OverviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function HistoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M4.9 6l1.7 1.4M17.4 16.6l1.7 1.4M3.5 12h2.2M18.3 12h2.2M4.9 18l1.7-1.4M17.4 7.4l1.7-1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: OverviewIcon, exact: true },
  { href: "/dashboard/history", label: "History", icon: HistoryIcon, exact: false },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon, exact: false },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-surface px-3 py-2 md:h-[calc(100vh-6.5rem)] md:w-56 md:flex-col md:gap-0.5 md:overflow-visible md:border-b-0 md:border-r md:px-3 md:py-5">
      <span className="mb-1 hidden px-3 text-[11px] font-medium uppercase tracking-wide text-ink-muted md:block">
        Menu
      </span>
      {navItems.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-accent-soft text-accent"
                : "text-ink-muted hover:bg-canvas hover:text-ink"
            }`}
          >
            {active && (
              <span className="absolute inset-y-1.5 left-0 hidden w-0.5 rounded-full bg-accent md:block" />
            )}
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
