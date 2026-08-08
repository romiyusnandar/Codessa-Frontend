"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/Icon";
import { buildReviewPdf } from "@/lib/buildReviewPdf";
import type { Review } from "@/lib/types";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; url: string; filename: string };

export function ReviewPdfPreviewModal({
  review,
  onClose,
}: {
  review: Review;
  onClose: () => void;
}) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    buildReviewPdf(review)
      .then(({ blob, filename }) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setState({ status: "ready", url: objectUrl, filename });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [review]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleDownload() {
    if (state.status !== "ready") return;
    const a = document.createElement("a");
    a.href = state.url;
    a.download = state.filename;
    a.click();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex h-[min(85vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant/20 p-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
              <Icon name="picture_as_pdf" filled className="text-lg" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-on-surface">
                {review.repositoryName} #{review.pullNumber}
              </p>
              <p className="truncate text-xs text-on-surface-variant">
                {review.shortSha} · Review report preview
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={state.status !== "ready"}
              className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              <Icon name="download" className="text-[18px]" />
              Download
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1.5 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-surface-container">
          {state.status === "loading" && (
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <Icon name="progress_activity" className="animate-spin text-[18px]" />
                Generating preview...
              </div>
            </div>
          )}
          {state.status === "error" && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-error">Gagal membuat preview PDF. Coba lagi.</p>
            </div>
          )}
          {state.status === "ready" && (
            <iframe src={state.url} title="Review PDF preview" className="h-full w-full" />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
