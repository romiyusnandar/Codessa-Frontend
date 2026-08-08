"use client";

import { useState } from "react";
import { installGithubApp, setRepositoryEnabled } from "@/lib/api";
import { revalidateRepositories, useRepositories } from "@/lib/hooks";
import { StatusDot } from "@/components/StatusDot";

const PER_PAGE = 10;

export function RepositoriesSection({ embedded = false }: { embedded?: boolean } = {}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [togglingRepo, setTogglingRepo] = useState<string | null>(null);

  const { repositories, isLoading, error } = useRepositories(page, PER_PAGE, search);

  // Independent of the search/page above, so the Install button doesn't
  // reappear just because a search filters the visible list down to zero.
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

  const Wrapper = embedded ? "div" : "section";

  return (
    <Wrapper className={embedded ? "" : "rounded-lg border border-line bg-surface p-6 shadow-sm"}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {!embedded && (
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Sources
            </span>
            <h2 className="text-lg font-semibold text-ink">Repositories</h2>
          </div>
        )}
        {!isCheckingInstall && !hasInstalled && (
          <button
            onClick={installGithubApp}
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            Install GitHub App
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mt-4 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
      />

      {error && <p className="mt-4 text-sm text-rust">Gagal memuat repositories.</p>}

      {isLoading && <p className="mt-4 text-sm text-ink-muted">Loading...</p>}

      {repositories && repositories.data.length === 0 && (
        <p className="mt-4 text-sm text-ink-muted">
          {hasInstalled
            ? "Tidak ada repository yang cocok dengan pencarian."
            : "Belum ada repository. Install GitHub App untuk menambahkan repository."}
        </p>
      )}

      {repositories && repositories.data.length > 0 && (
        <>
          <ul className="mt-4 divide-y divide-line">
            {repositories.data.map((repo) => (
              <li key={repo.fullName} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-2.5">
                  <StatusDot color={repo.enabled ? "moss" : "muted"} />
                  <div>
                    <p className="text-sm font-medium text-ink">{repo.fullName}</p>
                    <p className="text-xs text-ink-muted">
                      {repo.private ? "Private" : "Public"} · default branch:{" "}
                      {repo.defaultBranch}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleRepo(repo.owner, repo.name, !repo.enabled)}
                  disabled={togglingRepo === repo.fullName}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition disabled:opacity-50 ${
                    repo.enabled
                      ? "bg-moss-soft text-moss hover:bg-moss-soft/70"
                      : "border border-line text-ink-muted hover:border-ink/20 hover:text-ink"
                  }`}
                >
                  {repo.enabled ? "Enabled" : "Disabled"}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between text-xs text-ink-muted">
            <span>
              Page {repositories.page} of {repositories.totalPages} ({repositories.total} total)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-md border border-line px-3 py-1 transition hover:border-ink/20 disabled:opacity-40 disabled:hover:border-line"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(repositories.totalPages, p + 1))}
                disabled={page >= repositories.totalPages}
                className="rounded-md border border-line px-3 py-1 transition hover:border-ink/20 disabled:opacity-40 disabled:hover:border-line"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
}
