"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export function CopyButton({
  text,
  className = "text-on-surface-variant hover:text-on-surface",
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <button onClick={copy} className={`flex items-center gap-1 transition-colors ${className}`}>
      <Icon name={copied ? "check" : "content_copy"} className="text-sm" />
      <span className="text-[11px] font-semibold uppercase tracking-wider">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
