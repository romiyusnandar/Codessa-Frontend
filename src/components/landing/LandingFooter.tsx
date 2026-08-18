"use client";
 
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
  
export function LandingFooter() {
  const t = useTranslations("landing.footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const withLocale = (path: string) => `/${locale}${path}`;
  
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:flex-row md:px-10">
        <span>{t("copyright")}</span>
        <div className="flex gap-8">
          <Link href={withLocale("/docs")} className="transition-colors hover:text-primary">
            {tNav("docs")}
          </Link>
          <Link href={withLocale("/dashboard")} className="transition-colors hover:text-primary">
            {tNav("dashboard")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
