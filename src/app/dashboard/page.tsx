"use client";

import { useState } from "react";
import Link from "next/link";
import { setRepositoryEnabled } from "@/lib/api";
import { revalidateRepositories, useRepositories, useReviews } from "@/lib/hooks";
import { AddRepositoryModal } from "@/components/AddRepositoryModal";
import { StatusDot, reviewStatusDotColor } from "@/components/StatusDot";
import { StatusBadge } from "@/components/StatusBadge";

const ENABLED_PER_PAGE = 100;
const RECENT_LIMIT = 5;

export default function OverviewPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [togglingRepo, setTogglingRepo] = useState<string | null>(null);
  const { repositories, isLoading, error } = useRepositories(1, ENABLED_PER_PAGE, "", true);
  const { reviews } = useReviews();

  const enabledRepos = repositories?.data ?? [];
  const recentReviews = reviews?.slice(0, RECENT_LIMIT) ?? [];

  async function disableRepo(owner: string, name: string) {
    const key = `${owner}/${name}`;
    setTogglingRepo(key);
    try {
      await setRepositoryEnabled(owner, name, false);
      await revalidateRepositories();
    } finally {
      setTogglingRepo(null);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Dashboard
            </span>
            <h1 className="text-xl font-semibold text-ink">Overview</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            + Add repository
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-rust">Gagal memuat repositories.</p>}

        {isLoading && <p className="mt-4 text-sm text-ink-muted">Loading...</p>}

        {repositories && enabledRepos.length === 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-line bg-surface p-8 text-center">
            <p className="text-sm text-ink-muted">
              Belum ada repository dengan AI review aktif.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              + Add repository
            </button>
          </div>
        )}

        {enabledRepos.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {enabledRepos.map((repo) => (
              <li
                key={repo.fullName}
                className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 shadow-sm transition hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <StatusDot color="moss" />
                    <p className="text-sm font-medium text-ink">{repo.fullName}</p>
                  </div>
                  <span className="inline-flex items-center rounded-md bg-moss-soft px-2 py-0.5 text-xs font-medium text-moss">
                    Review on
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  {repo.private ? "Private" : "Public"} · default branch: {repo.defaultBranch}
                </p>
                <button
                  onClick={() => disableRepo(repo.owner, repo.name)}
                  disabled={togglingRepo === repo.fullName}
                  className="self-start rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink-muted transition hover:border-rust/40 hover:text-rust disabled:opacity-50"
                >
                  Disable
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Activity
            </span>
            <h2 className="text-lg font-semibold text-ink">Recent reviews</h2>
          </div>
          <Link
            href="/dashboard/history"
            className="text-sm font-medium text-accent hover:underline"
          >
            View all
          </Link>
        </div>

        {recentReviews.length === 0 && (
          <p className="mt-4 text-sm text-ink-muted">Belum ada review.</p>
        )}

        {recentReviews.length > 0 && (
          <ul className="mt-4 divide-y divide-line">
            {recentReviews.map((review) => (
              <li key={review._id} className="flex items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-2.5">
                  <StatusDot color={reviewStatusDotColor[review.status]} />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {review.repositoryFullName}{" "}
                      <span className="text-ink-muted">#{review.pullNumber}</span>
                    </p>
                    <p className="text-xs text-ink-muted">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <StatusBadge status={review.status} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {showAddModal && <AddRepositoryModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
