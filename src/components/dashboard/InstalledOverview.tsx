"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import { useRepositories, useReviews, useReviewStats } from "@/lib/hooks";
import { ReviewOutcomeBadge } from "@/components/dashboard/ReviewOutcomeBadge";
import { ReviewPdfPreviewModal } from "@/components/dashboard/ReviewPdfPreviewModal";
import type { Review } from "@/lib/types";

function formatReviewTime(ms: number): string {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${minutes.toFixed(1)}m`;
  const hours = minutes / 60;
  return `${hours.toFixed(1)}h`;
}

const REPOS_LIMIT = 5;

export function InstalledOverview() {
  const locale = useLocale();
  const t = useTranslations("dashboard.overview");
  const [syncing, setSyncing] = useState(false);
  const [previewReview, setPreviewReview] = useState<Review | null>(null);
  const { stats, isLoading: statsLoading, mutate: mutateStats } = useReviewStats();
  const { reviews, isLoading: reviewsLoading, mutate: mutateReviews } = useReviews(undefined, 5);
  const {
    repositories,
    isLoading: reposLoading,
    mutate: mutateRepositories,
  } = useRepositories(1, REPOS_LIMIT, "", true);
  const enabledRepos = repositories?.data ?? [];

  const withLocale = (path: string) => `/${locale}${path}`;

  async function handleSyncNow() {
    setSyncing(true);
    try {
      await Promise.all([mutateStats(), mutateReviews(), mutateRepositories()]);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="relative flex w-full flex-col gap-8 overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-125 w-125 -translate-x-1/3 translate-y-1/3 rounded-full bg-tertiary/5 blur-[120px]" />

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-1">
          <h1 className="font-display text-[32px] font-semibold leading-tight text-on-surface">
            {t("title")}
          </h1>
          <p className="text-base text-on-surface-variant">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSyncNow}
            disabled={syncing}
            className="flex items-center gap-2 rounded-lg bg-surface-container-high px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface shadow-sm transition-colors hover:bg-surface-container-highest disabled:opacity-60"
          >
            <Icon name="refresh" className={`text-[18px] ${syncing ? "animate-spin" : ""}`} />
            {syncing ? t("syncing") : t("syncNow")}
          </button>
          <Link
            href={withLocale("/dashboard/integrations")}
            className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-secondary shadow-md transition-colors hover:opacity-90"
          >
            <Icon name="add" className="text-[18px]" />
            {t("newRepo")}
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
            <p className="text-sm text-on-surface-variant">{t("totalPRs")}</p>
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
            <p className="text-sm text-on-surface-variant">{t("aiComments")}</p>
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
            <p className="text-sm text-on-surface-variant">{t("totalTime")}</p>
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Last pull requests */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-1">
            <h2 className="font-display text-2xl font-semibold text-on-surface">
              {t("lastPRs")}
            </h2>
            <Link
              href={withLocale("/dashboard/history")}
              className="flex items-center text-[11px] font-semibold uppercase tracking-wider text-secondary transition-colors hover:opacity-80"
            >
              {t("viewAll")}
              <Icon name="arrow_forward" className="ml-1 text-[16px]" />
            </Link>
          </div>

          {reviewsLoading && <p className="text-sm text-on-surface-variant">{t("loading")}</p>}

          {!reviewsLoading && (reviews?.length ?? 0) === 0 && (
            <div className="rounded-xl border border-dashed border-outline-variant/30 p-8 text-center">
              <p className="text-sm text-on-surface-variant">{t("noReviews")}</p>
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
                    <div className="flex items-center gap-1 rounded-md bg-surface-container-highest px-2.5 py-1.5 font-mono text-sm font-semibold text-error">
                      -{review.deletions}
                    </div>
                    <div className="flex items-center gap-1 rounded-md bg-surface-container-highest px-2.5 py-1.5 font-mono text-sm font-semibold text-primary">
                      +{review.additions}
                    </div>
                    <ReviewOutcomeBadge review={review} />
                    <button
                      onClick={() => setPreviewReview(review)}
                      title={t("previewPdf")}
                      aria-label={t("previewPdf")}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-error/10 text-error transition hover:bg-error/20"
                    >
                      <Icon name="picture_as_pdf" filled className="text-[18px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Repositories + status */}
        <div className="flex flex-col gap-4">
          <h2 className="pb-1 font-display text-2xl font-semibold text-on-surface">
            {t("repositories")}
          </h2>
          <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container shadow-sm">
            {reposLoading && (
              <p className="p-4 text-sm text-on-surface-variant">{t("loading")}</p>
            )}

            {!reposLoading && enabledRepos.length === 0 && (
              <p className="p-4 text-sm text-on-surface-variant">
                {t("noRepos")}
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
                      title={t("enabled")}
                    />
                  </div>
                  {i < enabledRepos.length - 1 && (
                    <div className="h-px w-full bg-outline-variant/10" />
                  )}
                </div>
              ))}
            <div className="bg-surface-container-highest/50 p-1">
              <Link
                href={withLocale("/dashboard/integrations")}
                className="flex w-full items-center justify-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-on-surface"
              >
                <Icon name="settings" className="text-[16px]" />
                {t("manageConnections")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {previewReview && (
        <ReviewPdfPreviewModal
          review={previewReview}
          onClose={() => setPreviewReview(null)}
        />
      )}
    </div>
  );
}
