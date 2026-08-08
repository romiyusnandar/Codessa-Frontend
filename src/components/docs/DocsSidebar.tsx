import Link from "next/link";
import { Icon } from "@/components/Icon";
import { docsNav } from "@/components/docs/docsNav";
import { DocsSearch } from "@/components/docs/DocsSearch";

export function DocsSidebar({ activeHref }: { activeHref: string }) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 flex-col overflow-y-auto border-r border-outline-variant/30 md:flex">
      <div className="p-6 pb-2">
        <h2 className="mb-6 font-display text-2xl font-semibold text-on-surface">Documentation</h2>
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
                const active = item.href === activeHref;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
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
        <div className="flex items-center gap-3">
          <Icon name="support_agent" className="text-primary" />
          <div>
            <p className="text-base text-on-surface">Need help?</p>
            <a href="#" className="text-base text-primary hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
