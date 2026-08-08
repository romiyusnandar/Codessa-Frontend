"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/Icon";
import { DocsSidebarContent } from "@/components/docs/DocsSidebarContent";
import { DocsAssistant, type AssistantAnchor } from "@/components/docs/DocsAssistant";

const DRAWER_TRANSITION_MS = 220;

export function DocsNav() {
  // `drawerMounted` keeps the drawer in the DOM long enough for the closing
  // transition to actually play; `drawerOpen` is the target visual state that
  // drives the transition classes.
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [assistantAnchor, setAssistantAnchor] = useState<AssistantAnchor | null>(null);

  function openDrawer() {
    setDrawerMounted(true);
    // Mount in the closed position first, then flip to open on the next
    // frame so the browser has something to transition from.
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawerOpen(true)));
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  useEffect(() => {
    if (drawerOpen || !drawerMounted) return;
    const timer = setTimeout(() => setDrawerMounted(false), DRAWER_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [drawerOpen, drawerMounted]);

  // Owned here (not inside the drawer content) so opening the assistant from
  // the mobile drawer — which closes the drawer immediately — doesn't unmount
  // the component that was about to render the assistant panel.
  function handleAskAssistant(rect: DOMRect) {
    setAssistantAnchor({ left: rect.left, top: rect.top });
    closeDrawer();
  }

  useEffect(() => {
    if (!drawerMounted) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerMounted]);

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
          onClick={openDrawer}
          aria-label="Open documentation menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-outline-variant/30 text-on-surface transition hover:bg-surface-container active:scale-90"
        >
          <Icon name="menu" />
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerMounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 md:hidden ${drawerOpen ? "" : "pointer-events-none"}`}
            onClick={closeDrawer}
          >
            <div
              className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                drawerOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute inset-y-0 left-0 flex w-[85vw] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-200 ease-out motion-reduce:transition-none ${
                drawerOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between border-b border-outline-variant/20 p-4">
                <span className="font-display text-lg font-semibold text-on-surface">
                  Documentation
                </span>
                <button
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="rounded-md p-1 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
                >
                  <Icon name="close" />
                </button>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <DocsSidebarContent onNavigate={closeDrawer} onAskAssistant={handleAskAssistant} />
              </div>
            </div>
          </div>,
          document.body,
        )}

      {assistantAnchor && (
        <DocsAssistant anchor={assistantAnchor} onClose={() => setAssistantAnchor(null)} />
      )}
    </>
  );
}
