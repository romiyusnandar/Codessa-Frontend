"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { setRepositoryEnabled } from "@/lib/api";
import { revalidateRepositories, useRepositories } from "@/lib/hooks";
import { Icon } from "@/components/Icon";

const PER_PAGE = 10;

// Lists every repository the GitHub App can see (enabled or not), so the
// user can pick which ones to turn AI review on for. The main Integrations
// page only shows already-enabled repos — this modal is where "all" lives.
export function ConnectRepositoryModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [togglingRepo, setTogglingRepo] = useState<string | null>(null);

  const { repositories, isLoading, error } = useRepositories(page, PER_PAGE, search);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function toggleRepo(owner: string, name: string, enable: boolean) {
    const key = `${owner}/${name}`;
    setTogglingRepo(key);
    try {
      await setRepositoryEnabled(owner, name, enable);
      await revalidateRepositories();
    } finally {
      setTogglingRepo(null);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10 sm:py-16"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
              Sources
            </span>
            <h2 className="font-display text-lg font-semibold text-on-surface">
              Connect Repository
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="relative mt-4">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search repositories..."
            className="w-full rounded-lg border border-outline-variant/20 bg-surface-container py-2 pl-10 pr-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        {error && <p className="mt-4 text-sm text-error">Gagal memuat repositories.</p>}
        {isLoading && <p className="mt-4 text-sm text-on-surface-variant">Loading...</p>}

        {repositories && repositories.data.length === 0 && (
          <p className="mt-4 text-sm text-on-surface-variant">Tidak ada repository yang cocok.</p>
        )}

        {repositories && repositories.data.length > 0 && (
          <>
            <ul className="mt-4 max-h-80 divide-y divide-outline-variant/10 overflow-y-auto">
              {repositories.data.map((repo) => {
                const key = `${repo.owner}/${repo.name}`;
                return (
                  <li key={repo.fullName} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-on-surface">
                        {repo.fullName}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {repo.private ? "Private" : "Public"} · {repo.defaultBranch}
                      </p>
                    </div>
                    <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={repo.enabled}
                        disabled={togglingRepo === key}
                        onChange={() => toggleRepo(repo.owner, repo.name, !repo.enabled)}
                        className="peer sr-only"
                      />
                      <div className="peer relative h-5 w-9 rounded-full bg-surface-variant transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-disabled:opacity-50" />
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant">
              <span>
                Page {repositories.page} of {repositories.totalPages} ({repositories.total} total)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-md border border-outline-variant/30 px-3 py-1 transition hover:border-outline disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(repositories.totalPages, p + 1))}
                  disabled={page >= repositories.totalPages}
                  className="rounded-md border border-outline-variant/30 px-3 py-1 transition hover:border-outline disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
