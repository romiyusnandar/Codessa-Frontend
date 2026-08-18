"use client";
 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Icon } from "@/components/Icon";
import { LogoMark } from "@/components/LogoMark";
import { useReviews } from "@/lib/hooks";
 
const navItems = [
  { labelKey: "dashboard", href: "/dashboard", icon: "dashboard", exact: true },
  { labelKey: "history", href: "/dashboard/history", icon: "history", exact: false },
  { labelKey: "integrations", href: "/dashboard/integrations", icon: "extension", exact: false },
  { labelKey: "settings", href: "/dashboard/settings", icon: "settings", exact: false },
];
 
export function DashboardSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();
  const { reviews } = useReviews();
  const scanning = reviews?.some((r) => r.status === "running") ?? false;

  const withLocale = (path: string) => `/${locale}${path}`;
 
  return (
    <>
      <Link href={withLocale("/dashboard")} className="flex items-center gap-2.5 p-8 pb-2">
        <LogoMark size={28} />
        <span className="font-display text-lg font-semibold tracking-tight text-on-surface">
          CODESSA
        </span>
      </Link>
 
      <nav className="flex-1 space-y-1 py-6">
        {navItems.map((item) => {
          if (!item.href) {
            return (
              <span
                key={item.labelKey}
                className="flex cursor-default items-center gap-3 border-l-2 border-transparent px-6 py-3 text-sm text-on-surface-variant/40"
              >
                <Icon name={item.icon} className="text-[20px]" />
                {t(item.labelKey)}
              </span>
            );
          }
          const active = item.exact ? pathname === withLocale(item.href) : pathname.startsWith(withLocale(item.href));
          return (
            <Link
              key={item.href}
              href={withLocale(item.href)}
              onClick={onNavigate}
              className={`flex items-center gap-3 border-l-2 px-6 py-3 text-sm transition-all ${
                active
                  ? "border-primary bg-surface-container-highest text-on-surface"
                  : "border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <Icon name={item.icon} className="text-[20px]" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* <div className="border-t border-outline-variant/30 p-6">
        <div className="rounded-xl border border-secondary-container/50 bg-secondary-container/30 p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            AI Core Status
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                scanning ? "animate-pulse bg-primary" : "bg-on-surface-variant/40"
              }`}
            />
            <span className="text-sm text-on-surface">
              {scanning ? "Scanning Active" : "Idle"}
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
}
