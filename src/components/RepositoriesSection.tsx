"use client";

import { useState } from "react";
import { apiFetch, installGithubApp } from "@/lib/api";
import { useRepositories } from "@/lib/hooks";

const PER_PAGE = 10;

export function RepositoriesSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [togglingRepo, setTogglingRepo] = useState<string | null>(null);

  const { repositories, isLoading, error, mutate } = useRepositories(page, PER_PAGE, search);

  // Independent of the search/page above, so the Install button doesn't
  // reappear just because a search filters the visible list down to zero.
  const { repositories: installCheck, isLoading: isCheckingInstall } = useRepositories(1, 1, "");
  const hasInstalled = (installCheck?.total ?? 0) > 0;

  async function toggleRepo(owner: string, name: string, enable: boolean) {
    const key = `${owner}/${name}`;
    setTogglingRepo(key);
    try {
      await apiFetch(`/repositories/${owner}/${name}/${enable ? "enable" : "disable"}`, {
        method: "POST",
      });
      await mutate();
    } finally {
      setTogglingRepo(null);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Repositories</h2>
        {!isCheckingInstall && !hasInstalled && (
          <button
            onClick={installGithubApp}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
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
        className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
      />

      {error && (
        <p className="mt-4 text-sm text-red-600">Gagal memuat repositories.</p>
      )}

      {isLoading && <p className="mt-4 text-sm text-slate-500">Loading...</p>}

      {repositories && repositories.data.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          {hasInstalled
            ? "Tidak ada repository yang cocok dengan pencarian."
            : "Belum ada repository. Install GitHub App untuk menambahkan repository."}
        </p>
      )}

      {repositories && repositories.data.length > 0 && (
        <>
          <ul className="mt-4 divide-y divide-slate-100">
            {repositories.data.map((repo) => (
              <li
                key={repo.fullName}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{repo.fullName}</p>
                  <p className="text-xs text-slate-500">
                    {repo.private ? "Private" : "Public"} · default branch:{" "}
                    {repo.defaultBranch}
                  </p>
                </div>
                <button
                  onClick={() => toggleRepo(repo.owner, repo.name, !repo.enabled)}
                  disabled={togglingRepo === repo.fullName}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition disabled:opacity-50 ${
                    repo.enabled
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {repo.enabled ? "Enabled" : "Disabled"}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>
              Page {repositories.page} of {repositories.totalPages} ({repositories.total} total)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(repositories.totalPages, p + 1))}
                disabled={page >= repositories.totalPages}
                className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
