"use client";

import { useState } from "react";
import { useReviews } from "@/lib/hooks";
import { Icon } from "@/components/Icon";
import { ReviewOutcomeBadge } from "@/components/dashboard/ReviewOutcomeBadge";
import { SeverityBadge } from "@/components/dashboard/SeverityBadge";
import { CvssBadge } from "@/components/dashboard/CvssBadge";
import { ReviewPdfPreviewModal } from "@/components/dashboard/ReviewPdfPreviewModal";
import type { Review } from "@/lib/types";

const PER_PAGE = 10;

export function HistoryView() {
  const [repoFilter, setRepoFilter] = useState("");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [previewReview, setPreviewReview] = useState<Review | null>(null);
  const { reviews, totalPages, isLoading, error } = useReviews(
    repoFilter || undefined,
    PER_PAGE,
    page,
  );

  return (
    <div className="relative">
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
        <div>
          <h1 className="font-display text-[32px] font-semibold leading-tight tracking-tight text-on-surface">
            Review History
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-on-surface-variant">
            Every pull request Codessa has reviewed, across all your connected repositories.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-96">
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            value={repoFilter}
            onChange={(e) => {
              setRepoFilter(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by repo (owner/name)..."
            className="w-full rounded-lg border border-outline-variant/30 bg-surface-container-highest py-3 pl-12 pr-4 text-sm text-on-surface shadow-inner placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        {error && <p className="text-sm text-error">Gagal memuat review history.</p>}
        {isLoading && <p className="text-sm text-on-surface-variant">Loading...</p>}

        {!isLoading && reviews && reviews.length === 0 && (
          <div className="rounded-xl border border-dashed border-outline-variant/30 p-8 text-center">
            <p className="text-sm text-on-surface-variant">
              {repoFilter ? `Tidak ada review untuk "${repoFilter}".` : "Belum ada review."}
            </p>
          </div>
        )}

        {!isLoading && reviews && reviews.length > 0 && (
          <div className="flex flex-col gap-2">
            {reviews.map((review) => {
              const isExpanded = expandedId === review._id;
              return (
                <div
                  key={review._id}
                  className="group relative overflow-hidden rounded-xl bg-surface-container shadow-sm transition-colors hover:bg-surface-container-high"
                >
                  {review.status === "running" && (
                    <div className="absolute inset-y-0 left-0 w-1 animate-pulse bg-secondary" />
                  )}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setExpandedId(isExpanded ? null : review._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : review._id);
                      }
                    }}
                    className="flex w-full cursor-pointer flex-col gap-4 p-4 text-left md:flex-row md:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-secondary">
                          {review.shortSha}
                        </span>
                        <h4 className="truncate text-base font-semibold leading-snug text-on-surface">
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewReview(review);
                        }}
                        title="Preview & export as PDF"
                        aria-label="Preview review as PDF"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-error/10 text-error transition hover:bg-error/20"
                      >
                        <Icon name="picture_as_pdf" filled className="text-[18px]" />
                      </button>
                      <Icon
                        name="expand_more"
                        className={`text-on-surface-variant transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-outline-variant/10 bg-surface-container-lowest/40 p-4">
                      {review.summary && (
                        <p className="text-sm text-on-surface">{review.summary}</p>
                      )}
                      {review.errorMessage && (
                        <p className="mt-2 text-sm text-error">{review.errorMessage}</p>
                      )}

                      {review.comments.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {review.comments.map((comment, idx) => (
                            <li
                              key={idx}
                              className="rounded-lg border border-outline-variant/20 bg-surface-container p-3"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
                                  <Icon
                                    name={comment.source === "sca" ? "package_2" : "smart_toy"}
                                    className="text-[13px]"
                                    title={comment.source === "sca" ? "Dependency Scan" : "AI Review"}
                                  />
                                  {comment.filePath}:{comment.line}
                                </span>
                                <SeverityBadge severity={comment.severity} />
                              </div>
                              <p className="mt-1 text-sm text-on-surface">{comment.comment}</p>

                              {(comment.cwe || comment.cvss || comment.vulnerabilityId) && (
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                  {comment.cwe && (
                                    <span
                                      className="inline-flex items-center rounded-full bg-secondary-container/40 px-2 py-0.5 text-[10px] font-semibold text-on-secondary-container"
                                      title={comment.cwe.name}
                                    >
                                      {comment.cwe.id} · {comment.cwe.name}
                                    </span>
                                  )}
                                  {comment.cvss && <CvssBadge cvss={comment.cvss} />}
                                  {comment.vulnerabilityId && (
                                    <a
                                      href={`https://osv.dev/vulnerability/${comment.vulnerabilityId}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 rounded-full bg-surface-container-highest px-2 py-0.5 text-[10px] font-semibold text-tertiary transition hover:opacity-80"
                                    >
                                      <Icon name="open_in_new" className="text-[12px]" />
                                      {comment.vulnerabilityId}
                                    </a>
                                  )}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && totalPages !== undefined && totalPages > 1 && (
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>
              Page {page} of {totalPages}
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
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-md border border-outline-variant/30 px-3 py-1 transition hover:border-outline disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
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
