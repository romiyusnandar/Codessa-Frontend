"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/components/docs/docsNavItems";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { AskAssistantCard } from "@/components/docs/AskAssistantCard";

// The nav list + search + "Ask Assistant" trigger, shared between the
// persistent desktop sidebar and the mobile drawer (DocsNav renders both).
export function DocsSidebarContent({
  onNavigate,
  onAskAssistant,
}: {
  onNavigate?: () => void;
  onAskAssistant: (rect: DOMRect) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="p-6 pb-2">
        <h2 className="mb-6 hidden font-display text-2xl font-semibold text-on-surface md:block">
          Documentation
        </h2>
        <DocsSearch />
      </div>

      <nav className="flex-1 space-y-6 px-4 py-4">
        {docsNav.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                if (!item.href) {
                  return (
                    <li key={item.label}>
                      <span className="block cursor-default rounded-md px-2 py-1.5 text-base text-on-surface-variant/40">
                        {item.label}
                      </span>
                    </li>
                  );
                }
                const active = item.href === pathname;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={`block rounded-md px-2 py-1.5 text-base transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-outline-variant/30 p-6">
        <AskAssistantCard onAsk={onAskAssistant} />
      </div>
    </>
  );
}
