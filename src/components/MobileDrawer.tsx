"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/Icon";

const TRANSITION_MS = 220;

// Shared open/close state machine for a slide-in mobile drawer: keeps the
// drawer mounted long enough for the exit transition to actually play,
// instead of unmounting instantly on close.
export function useMobileDrawer() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  function openDrawer() {
    setMounted(true);
    // Mount in the closed position first, then flip to open on the next
    // frame so the browser has something to transition from.
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }

  function closeDrawer() {
    setOpen(false);
  }

  useEffect(() => {
    if (open || !mounted) return;
    const timer = setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted]);

  return { mounted, open, openDrawer, closeDrawer };
}

export function MobileDrawer({
  mounted,
  open,
  onClose,
  title,
  children,
}: {
  mounted: boolean;
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute inset-y-0 left-0 flex w-[85vw] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-200 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-outline-variant/20 p-4">
          <span className="font-display text-lg font-semibold text-on-surface">{title}</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
