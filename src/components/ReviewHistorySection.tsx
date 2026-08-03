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
    <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">History</span>
      <h2 className="text-lg font-semibold text-ink">Review History</h2>

      <input
        type="text"
        placeholder="Filter by repo (owner/name)..."
        value={repoFilter}
        onChange={(e) => setRepoFilter(e.target.value)}
        className="mt-4 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
      />

      {error && <p className="mt-4 text-sm text-rust">Gagal memuat review history.</p>}
      {isLoading && <p className="mt-4 text-sm text-ink-muted">Loading...</p>}
      {reviews && reviews.length === 0 && (
        <p className="mt-4 text-sm text-ink-muted">Belum ada review.</p>
      )}

      {reviews && reviews.length > 0 && (
        <ul className="mt-4 divide-y divide-line">
          {reviews.map((review) => {
            const isExpanded = expandedId === review._id;
            return (
              <li key={review._id}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : review._id)}
                  className="flex w-full items-center justify-between gap-3 py-3 text-left"
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
                  <StatusBadge status={review.status} />
                </button>

                {isExpanded && (
                  <div className="mb-3 rounded-md bg-canvas p-4">
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
                            className="rounded-md border border-line bg-white p-3"
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
      )}
    </section>
  );
}
