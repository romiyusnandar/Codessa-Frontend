"use client";

import { useEffect, useState } from "react";

export interface DocsTocItem {
  label: string;
  href: string;
}

export function DocsToc({ items }: { items: DocsTocItem[] }) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");

  useEffect(() => {
    const ids = items.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-l border-outline-variant/20 p-6 lg:block">
      <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
        On this page
      </h4>
      <ul className="relative space-y-3 before:absolute before:bottom-2 before:left-[3px] before:top-2 before:w-px before:bg-outline-variant/30">
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <li key={item.href} className="relative">
              {active && (
                <div className="absolute left-[-2px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
              )}
              <a
                href={item.href}
                className={`block pl-4 text-base transition-colors ${
                  active ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
