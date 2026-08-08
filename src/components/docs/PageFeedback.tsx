"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export function PageFeedback() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  if (answer) {
    return (
      <div className="flex items-center justify-between border-t border-outline-variant/20 pt-8">
        <p className="flex items-center gap-2 text-base text-on-surface-variant">
          <Icon name="check_circle" filled className="text-lg text-primary" />
          {answer === "yes"
            ? "Glad this helped — thanks for the feedback."
            : "Thanks for letting us know. We'll use this to improve the page."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-t border-outline-variant/20 pt-8">
      <p className="text-base text-on-surface-variant">Was this page helpful?</p>
      <div className="flex gap-2">
        <button
          onClick={() => setAnswer("yes")}
          className="flex items-center gap-1 rounded bg-surface-container px-3 py-1.5 text-base text-on-surface transition-colors hover:bg-surface-container-high"
        >
          <Icon name="thumb_up" className="text-sm" /> Yes
        </button>
        <button
          onClick={() => setAnswer("no")}
          className="flex items-center gap-1 rounded bg-surface-container px-3 py-1.5 text-base text-on-surface transition-colors hover:bg-surface-container-high"
        >
          <Icon name="thumb_down" className="text-sm" /> No
        </button>
      </div>
    </div>
  );
}
