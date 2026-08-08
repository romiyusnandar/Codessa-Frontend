"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { MobileDrawer, useMobileDrawer } from "@/components/MobileDrawer";
import { DocsSidebarContent } from "@/components/docs/DocsSidebarContent";
import { DocsAssistant, type AssistantAnchor } from "@/components/docs/DocsAssistant";

export function DocsNav() {
  const drawer = useMobileDrawer();
  const [assistantAnchor, setAssistantAnchor] = useState<AssistantAnchor | null>(null);

  // Owned here (not inside the drawer content) so opening the assistant from
  // the mobile drawer — which closes the drawer immediately — doesn't unmount
  // the component that was about to render the assistant panel.
  function handleAskAssistant(rect: DOMRect) {
    setAssistantAnchor({ left: rect.left, top: rect.top });
    drawer.closeDrawer();
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 flex-col overflow-y-auto border-r border-outline-variant/30 md:flex">
        <DocsSidebarContent onAskAssistant={handleAskAssistant} />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-16 z-30 flex items-center justify-between border-b border-outline-variant/20 bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <span className="font-display text-base font-semibold text-on-surface">Documentation</span>
        <button
          onClick={drawer.openDrawer}
          aria-label="Open documentation menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-outline-variant/30 text-on-surface transition hover:bg-surface-container active:scale-90"
        >
          <Icon name="menu" />
        </button>
      </div>

      <MobileDrawer
        mounted={drawer.mounted}
        open={drawer.open}
        onClose={drawer.closeDrawer}
        title="Documentation"
      >
        <DocsSidebarContent onNavigate={drawer.closeDrawer} onAskAssistant={handleAskAssistant} />
      </MobileDrawer>

      {assistantAnchor && (
        <DocsAssistant anchor={assistantAnchor} onClose={() => setAssistantAnchor(null)} />
      )}
    </>
  );
}
