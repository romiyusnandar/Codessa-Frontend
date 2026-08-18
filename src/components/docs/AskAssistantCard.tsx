"use client";

import { useRef } from "react";
import { Icon } from "@/components/Icon";

// A pure trigger — the anchor/open state lives in DocsNav instead, so the
// assistant panel survives even if this card's parent (e.g. the mobile
// drawer) closes and unmounts right after the click.
export function AskAssistantCard({ onAsk }: { onAsk: (rect: DOMRect) => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center gap-3">
      {/* <Icon name="smart_toy" className="text-primary" />
      <div>
        <p className="text-base text-on-surface">Need help?</p>
        <button
          ref={buttonRef}
          onClick={() => {
            const rect = buttonRef.current?.getBoundingClientRect();
            if (rect) onAsk(rect);
          }}
          className="text-base text-primary hover:underline"
        >
          Ask Assistant
        </button>
      </div> */}
    </div>
  );
}
