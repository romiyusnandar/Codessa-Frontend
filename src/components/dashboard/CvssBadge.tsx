"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import type { ReviewCommentCvss } from "@/lib/types";

// Score bands per the CVSS v3.1 qualitative severity rating scale.
function scoreColorClass(score: number): string {
  if (score >= 9) return "bg-rust-soft text-rust";
  if (score >= 7) return "bg-error-container/20 text-error";
  if (score >= 4) return "bg-amber-soft text-amber";
  return "bg-surface-container-highest text-on-surface-variant";
}

// Raw CVSS vector strings (e.g. "CVSS:3.1/AV:N/AC:L/...") are opaque to most
// readers, so they're hidden behind an expand toggle rather than shown
// inline — but kept visible-on-demand since security reviewers need to
// verify the score wasn't just made up.
export function CvssBadge({ cvss }: { cvss: ReviewCommentCvss }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide transition ${scoreColorClass(cvss.score)}`}
        title="Toggle raw CVSS vector"
      >
        CVSS {cvss.score.toFixed(1)}
        <Icon
          name="expand_more"
          className={`text-[12px] transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <code className="rounded bg-surface-container-highest px-2 py-1 font-mono text-[10px] text-on-surface-variant">
          {cvss.vector}
        </code>
      )}
    </div>
  );
}
