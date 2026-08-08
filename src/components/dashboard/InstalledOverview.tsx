"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useRepositories, useReviews, useReviewStats } from "@/lib/hooks";
import { ReviewStatusBadge } from "@/components/dashboard/ReviewStatusBadge";

function formatReviewTime(ms: number): string {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${minutes.toFixed(1)}m`;
  const hours = minutes / 60;
  return `${hours.toFixed(1)}h`;
}

// The system status card below is still placeholder content — everything
// else on this page is wired to real data now.
const REPOS_LIMIT = 5;

export function InstalledOverview() {
  const { stats, isLoading: statsLoading } = useReviewStats();
  const { reviews, isLoading: reviewsLoading } = useReviews(undefined, 5);
  const { repositories, isLoading: reposLoading } = useRepositories(1, REPOS_LIMIT, "", true);
  const enabledRepos = repositories?.data ?? [];

  return (
    <div className="relative flex w-full flex-col gap-8 overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-tertiary/5 blur-[120px]" />

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-1">
          <h1 className="font-display text-[32px] font-semibold leading-tight text-on-surface">
            Overview
          </h1>
          <p className="text-base text-on-surface-variant">
            Real-time analysis of your connected repositories.
          </p>
        </div>
        <div className="flex gap-4">
          {/* <button className="flex items-center gap-2 rounded-lg bg-surface-container-high px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface shadow-sm transition-colors hover:bg-surface-container-highest">
            <Icon name="refresh" className="text-[18px]" />
            Sync Now
          </button> */}
          <Link
            href="/dashboard/integrations"
            className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-secondary shadow-md transition-colors hover:opacity-90"
          >
            <Icon name="add" className="text-[18px]" />
            New Repo
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <div className="group relative overflow-hidden rounded-xl bg-surface-container p-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-tertiary-container/30 blur-2xl transition-colors group-hover:bg-tertiary-container/50" />
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-surface-container-high p-2 text-tertiary">
              <Icon name="merge_type" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-[32px] font-semibold text-on-surface">
              {statsLoading ? "—" : (stats?.totalPullRequests ?? 0)}
            </h3>
            <p className="text-sm text-on-surface-variant">Total Pull Requests Analyzed</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-surface-container p-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-secondary-container/20 blur-2xl transition-colors group-hover:bg-secondary-container/40" />
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-secondary-container/30 p-2 text-secondary">
              <Icon name="smart_toy" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-[32px] font-semibold text-on-surface">
              {statsLoading ? "—" : (stats?.totalComments ?? 0)}
            </h3>
            <p className="text-sm text-on-surface-variant">AI Comments Generated</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-surface-container p-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-container/30 blur-2xl transition-colors group-hover:bg-primary-container/50" />
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-surface-container-high p-2 text-primary">
              <Icon name="timer" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-[32px] font-semibold text-on-surface">
              {statsLoading ? "—" : formatReviewTime(stats?.totalReviewTimeMs ?? 0)}
            </h3>
            <p className="text-sm text-on-surface-variant">Total Review Time</p>
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Last pull requests */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-1">
            <h2 className="font-display text-2xl font-semibold text-on-surface">
              Last Pull Requests
            </h2>
            <Link
              href="/dashboard/history"
              className="flex items-center text-[11px] font-semibold uppercase tracking-wider text-secondary transition-colors hover:opacity-80"
            >
              View All
              <Icon name="arrow_forward" className="ml-1 text-[16px]" />
            </Link>
          </div>

          {reviewsLoading && <p className="text-sm text-on-surface-variant">Loading...</p>}

          {!reviewsLoading && (reviews?.length ?? 0) === 0 && (
            <div className="rounded-xl border border-dashed border-outline-variant/30 p-8 text-center">
              <p className="text-sm text-on-surface-variant">Belum ada review.</p>
            </div>
          )}

          {!reviewsLoading && reviews && reviews.length > 0 && (
            <div className="flex flex-col gap-2">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="group relative flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-container p-4 shadow-sm transition-colors hover:bg-surface-container-high md:flex-row md:items-center"
                >
                  {review.status === "running" && (
                    <div className="absolute inset-y-0 left-0 w-1 animate-pulse bg-secondary" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-secondary">
                        {review.shortSha}
                      </span>
                      <h4 className="truncate text-lg font-semibold leading-snug text-on-surface">
                        {review.commitMessage}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
                      {/* TODO: committer/author isn't in the API response yet — shown as
                          repo instead until the backend adds one. */}
                      <span className="flex items-center gap-1">
                        <Icon name="folder" className="text-[14px]" />
                        {review.repositoryName}
                      </span>
                      <span className="text-outline-variant">•</span>
                      <span>#{review.pullNumber}</span>
                      <span className="text-outline-variant">•</span>
                      <span>{new Date(review.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex items-center gap-1 rounded bg-surface-container-highest px-2 py-1 font-mono text-[11px] text-error">
                      -{review.deletions}
                    </div>
                    <div className="flex items-center gap-1 rounded bg-surface-container-highest px-2 py-1 font-mono text-[11px] text-primary">
                      +{review.additions}
                    </div>
                    <ReviewStatusBadge status={review.status} errorMessage={review.errorMessage} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Repositories + status */}
        <div className="flex flex-col gap-4">
          <h2 className="pb-1 font-display text-2xl font-semibold text-on-surface">
            Repositories
          </h2>
          <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container shadow-sm">
            {reposLoading && (
              <p className="p-4 text-sm text-on-surface-variant">Loading...</p>
            )}

            {!reposLoading && enabledRepos.length === 0 && (
              <p className="p-4 text-sm text-on-surface-variant">
                Belum ada repository yang diaktifkan.
              </p>
            )}

            {!reposLoading &&
              enabledRepos.map((repo, i) => (
                <div key={repo.fullName}>
                  <div className="flex items-center justify-between p-4 transition-colors hover:bg-surface-container-high">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-highest text-on-surface-variant">
                        <Icon name="folder" className="text-[18px]" />
                      </div>
                      <div>
                        <h5 className="text-[15px] font-medium text-on-surface">{repo.name}</h5>
                        <p className="font-mono text-[11px] text-on-surface-variant">
                          {repo.defaultBranch} branch
                        </p>
                      </div>
                    </div>
                    <span
                      className="h-2 w-2 rounded-full bg-primary shadow-[0_0_4px_rgba(190,198,224,0.6)]"
                      title="Enabled"
                    />
                  </div>
                  {i < enabledRepos.length - 1 && (
                    <div className="h-px w-full bg-outline-variant/10" />
                  )}
                </div>
              ))}
            <div className="bg-surface-container-highest/50 p-1">
              <Link
                href="/dashboard/integrations"
                className="flex w-full items-center justify-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-on-surface"
              >
                <Icon name="settings" className="text-[16px]" />
                Manage Connections
              </Link>
            </div>
          </div>

          {/* System status */}
          <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl bg-[#020617] p-4 font-mono text-[13px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Review Engine</span>
              <span className="text-secondary">v2.4.1-stable</span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Latency</span>
              <span className="text-primary">42ms</span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Context Window</span>
              <span className="text-tertiary">128k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
