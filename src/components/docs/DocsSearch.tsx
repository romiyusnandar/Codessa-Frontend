"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { docsSearchIndex } from "@/components/docs/docsSearchIndex";

export function DocsSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const results =
    q.length > 0
      ? docsSearchIndex
          .filter(
            (entry) =>
              entry.title.toLowerCase().includes(q) ||
              entry.page.toLowerCase().includes(q) ||
              entry.excerpt.toLowerCase().includes(q),
          )
          .slice(0, 8)
      : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function close() {
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <Icon
        name="search"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant/70"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            (e.currentTarget as HTMLInputElement).blur();
          }
        }}
        placeholder="Search docs..."
        className="w-full rounded-lg border border-outline-variant/20 bg-surface-container py-2 pl-10 pr-9 text-base text-on-surface transition-shadow placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {query && (
        <button
          onClick={close}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant/70 transition-colors hover:text-on-surface"
        >
          <Icon name="close" className="text-lg" />
        </button>
      )}

      {open && q.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-80 overflow-y-auto rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-1.5 shadow-lg">
          {results.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-on-surface-variant">
              No results for &quot;{query}&quot;
            </p>
          ) : (
            results.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={close}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-surface-container"
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-on-surface">{entry.title}</p>
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant/60">
                    {entry.page}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-on-surface-variant">{entry.excerpt}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
