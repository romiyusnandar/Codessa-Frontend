"use client";
 
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
 
const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
];
 
export function LanguageSwitcher() {
  const t = useTranslations("common");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
 
  const handleLanguageChange = (locale: string) => {
    const pathname = window.location.pathname;
    const pathWithoutLocale = pathname.replace(/^\/(en|id)/, "") || "/";
    router.push(`/${locale}${pathWithoutLocale}`);
    setOpen(false);
  };
 
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md p-2 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Icon name="language" className="text-[20px]" />
      </button>
 
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-outline-variant/30 bg-surface py-1 shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
