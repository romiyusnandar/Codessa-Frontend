"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { DocsAssistant, type AssistantAnchor } from "@/components/docs/DocsAssistant";

export function AskAssistantCard() {
  const [anchor, setAnchor] = useState<AssistantAnchor | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function open() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setAnchor({ left: rect.left, top: rect.top });
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Icon name="smart_toy" className="text-primary" />
        <div>
          <p className="text-base text-on-surface">Need help?</p>
          <button
            ref={buttonRef}
            onClick={open}
            className="text-base text-primary hover:underline"
          >
            Ask Assistant
          </button>
        </div>
      </div>
      {anchor && <DocsAssistant anchor={anchor} onClose={() => setAnchor(null)} />}
    </>
  );
}
