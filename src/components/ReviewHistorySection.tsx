"use client";

import { useState } from "react";
import { useReviews } from "@/lib/hooks";
import { StatusBadge, SeverityBadge } from "@/components/StatusBadge";
import { StatusDot, reviewStatusDotColor } from "@/components/StatusDot";

export function ReviewHistorySection() {
  const [repoFilter, setRepoFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { reviews, isLoading, error } = useReviews(repoFilter || undefined);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Dashboard
        </span>
        <h1 className="text-xl font-semibold text-ink">Review History</h1>
      </div>

      <div className="relative sm:max-w-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Filter by repo (owner/name)..."
          value={repoFilter}
          onChange={(e) => setRepoFilter(e.target.value)}
          className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10"
        />
      </div>

      {error && <p className="text-sm text-rust">Gagal memuat review history.</p>}
      {isLoading && <p className="text-sm text-ink-muted">Loading...</p>}

      {reviews && reviews.length === 0 && (
        <div className="rounded-xl border border-dashed border-line bg-surface p-8 text-center">
          <p className="text-sm text-ink-muted">
            {repoFilter
              ? `Tidak ada review untuk "${repoFilter}".`
              : "Belum ada review."}
          </p>
        </div>
      )}

      {reviews && reviews.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
          <ul className="divide-y divide-line">
            {reviews.map((review) => {
              const isExpanded = expandedId === review._id;
              return (
                <li key={review._id}>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : review._id)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition hover:bg-canvas"
                  >
                    <div className="flex items-center gap-2.5">
                      <StatusDot color={reviewStatusDotColor[review.status]} />
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {review.repositoryFullName}{" "}
                          <span className="text-ink-muted">#{review.pullNumber}</span>{" "}
                          <span className="font-mono text-xs text-ink-muted">
                            {review.commitSha.slice(0, 7)}
                          </span>
                        </p>
                        <p className="text-xs text-ink-muted">
                          {new Date(review.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <StatusBadge status={review.status} />
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className={`h-4 w-4 shrink-0 text-ink-muted transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      >
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-line bg-canvas px-5 py-4">
                      {review.summary && (
                        <p className="text-sm text-ink">{review.summary}</p>
                      )}
                      {review.errorMessage && (
                        <p className="mt-2 text-sm text-rust">{review.errorMessage}</p>
                      )}

                      {review.comments.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {review.comments.map((comment, idx) => (
                            <li
                              key={idx}
                              className="rounded-lg border border-line bg-surface p-3"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-mono text-xs text-ink-muted">
                                  {comment.filePath}:{comment.line}
                                </span>
                                <SeverityBadge severity={comment.severity} />
                              </div>
                              <p className="mt-1 text-sm text-ink">{comment.comment}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
