"use client";

import { useState } from "react";
import { useReviews } from "@/lib/hooks";
import { StatusBadge, SeverityBadge } from "@/components/StatusBadge";

export function ReviewHistorySection() {
  const [repoFilter, setRepoFilter] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { reviews, isLoading, error } = useReviews(repoFilter || undefined);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Review History</h2>

      <input
        type="text"
        placeholder="Filter by repo (owner/name)..."
        value={repoFilter}
        onChange={(e) => setRepoFilter(e.target.value)}
        className="mt-4 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
      />

      {error && <p className="mt-4 text-sm text-red-600">Gagal memuat review history.</p>}
      {isLoading && <p className="mt-4 text-sm text-slate-500">Loading...</p>}
      {reviews && reviews.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">Belum ada review.</p>
      )}

      {reviews && reviews.length > 0 && (
        <ul className="mt-4 divide-y divide-slate-100">
          {reviews.map((review) => {
            const isExpanded = expandedId === review._id;
            return (
              <li key={review._id} className="py-3">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : review._id)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      PR #{review.pullNumber}{" "}
                      <span className="font-mono text-xs text-slate-400">
                        {review.commitSha.slice(0, 7)}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <StatusBadge status={review.status} />
                </button>

                {isExpanded && (
                  <div className="mt-3 rounded-md bg-slate-50 p-4">
                    {review.summary && (
                      <p className="text-sm text-slate-700">{review.summary}</p>
                    )}
                    {review.errorMessage && (
                      <p className="mt-2 text-sm text-red-600">{review.errorMessage}</p>
                    )}

                    {review.comments.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {review.comments.map((comment, idx) => (
                          <li
                            key={idx}
                            className="rounded-md border border-slate-200 bg-white p-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-xs text-slate-600">
                                {comment.filePath}:{comment.line}
                              </span>
                              <SeverityBadge severity={comment.severity} />
                            </div>
                            <p className="mt-1 text-sm text-slate-700">{comment.comment}</p>
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
