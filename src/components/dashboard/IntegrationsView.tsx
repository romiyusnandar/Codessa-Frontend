"use client";

import { useState } from "react";
import { installGithubApp, setRepositoryEnabled } from "@/lib/api";
import { revalidateRepositories, useRepositories } from "@/lib/hooks";
import { Icon } from "@/components/Icon";

const PER_PAGE = 10;

type Filter = "all" | "active" | "paused";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "paused", label: "Paused" },
];

export function IntegrationsView() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const [togglingRepo, setTogglingRepo] = useState<string | null>(null);

  const enabledParam = filter === "active" ? true : filter === "paused" ? false : undefined;
  const { repositories, isLoading, error } = useRepositories(page, PER_PAGE, search, enabledParam);

  // Independent of the filters above, so "Connect Repository" only points to
  // the install flow when the GitHub App genuinely isn't installed yet.
  const { repositories: installCheck, isLoading: isCheckingInstall } = useRepositories(1, 1, "");
  const hasInstalled = (installCheck?.total ?? 0) > 0;

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

  function handleFilterChange(next: Filter) {
    setFilter(next);
    setPage(1);
  }

  return (
    <div className="relative">
      {/* subtle grid texture */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 text-on-surface opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="flex flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-[32px] font-semibold leading-tight tracking-tight text-on-surface">
              Manage Connections
            </h1>
            <p className="max-w-2xl text-sm text-on-surface-variant">
              Turn AI review on or off per repository. Changes apply to the next pull request.
            </p>
          </div>
          <button
            onClick={installGithubApp}
            className="group flex shrink-0 items-center justify-center gap-2 rounded-lg bg-secondary-container px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-on-secondary-container shadow-lg shadow-secondary-container/20 transition-all duration-300 hover:bg-secondary-fixed hover:text-on-secondary-fixed"
          >
            <Icon
              name="add"
              className="text-[18px] transition-transform duration-300 group-hover:rotate-90"
            />
            Connect Repository
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-outline-variant/30 bg-surface-container/50 p-4 shadow-md backdrop-blur-md md:flex-row md:p-6">
          <div className="relative w-full md:w-96">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search repositories..."
              className="w-full rounded-lg bg-surface-container-highest py-3 pl-12 pr-4 text-sm text-on-surface shadow-inner placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
          <div className="flex w-full items-center gap-2 overflow-x-auto md:w-auto">
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => handleFilterChange(f.key)}
                  className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                    active
                      ? "bg-secondary/10 text-secondary shadow-sm"
                      : "border border-outline-variant/50 text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  {active && f.key === "active" && (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Repo list */}
        {error && <p className="text-sm text-error">Gagal memuat repositories.</p>}
        {isLoading && <p className="text-sm text-on-surface-variant">Loading...</p>}

        {repositories && repositories.data.length === 0 && (
          <div className="rounded-xl border border-dashed border-outline-variant/30 p-8 text-center">
            <p className="text-sm text-on-surface-variant">
              {!isCheckingInstall && !hasInstalled
                ? "Belum ada repository. Install GitHub App untuk menambahkan repository."
                : "Tidak ada repository yang cocok."}
            </p>
          </div>
        )}

        {repositories && repositories.data.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {repositories.data.map((repo) => {
              const key = `${repo.owner}/${repo.name}`;
              return (
                <div
                  key={repo.fullName}
                  className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-xl border border-transparent bg-surface-container p-5 shadow-sm transition-colors duration-300 hover:border-outline-variant/20 hover:bg-surface-container-high md:flex-row md:items-center md:p-6"
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-1 bg-secondary transition-opacity duration-300 ${
                      repo.enabled ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div className="flex w-full flex-grow items-start gap-4 md:w-auto">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest shadow-inner transition-shadow group-hover:shadow-md">
                      <Icon
                        name={repo.private ? "folder_special" : "folder_data"}
                        className="text-[28px] text-on-surface-variant"
                      />
                    </div>
                    <div className="flex min-w-0 flex-grow flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <h3 className="truncate font-display text-lg font-semibold text-on-surface">
                          {repo.name}
                        </h3>
                        <span className="flex shrink-0 items-center gap-1 rounded bg-surface-bright px-2 py-0.5 text-[10px] text-on-surface-variant shadow-sm">
                          <Icon name={repo.private ? "lock" : "public"} className="text-[14px]" />
                          {repo.private ? "Private" : "Public"}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <Icon name="fork_right" className="text-[16px]" />
                          {repo.defaultBranch}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full shrink-0 items-center justify-between gap-6 border-t border-outline-variant/10 pt-4 md:w-auto md:justify-end md:border-none md:pt-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                        Automate
                      </span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={repo.enabled}
                          disabled={togglingRepo === key}
                          onChange={() => toggleRepo(repo.owner, repo.name, !repo.enabled)}
                          className="peer sr-only"
                        />
                        <div className="peer relative h-5 w-9 rounded-full bg-surface-variant transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-full peer-disabled:opacity-50" />
                      </label>
                    </div>
                    <button
                      onClick={() => toggleRepo(repo.owner, repo.name, false)}
                      disabled={!repo.enabled || togglingRepo === key}
                      title="Disconnect Repository"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant shadow-sm transition-colors hover:bg-error/10 hover:text-error disabled:opacity-40"
                    >
                      <Icon name="link_off" className="text-[20px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {repositories && repositories.totalPages > 1 && (
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
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
        )}
      </div>
    </div>
  );
}
