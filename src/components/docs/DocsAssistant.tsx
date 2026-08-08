"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { MarkdownMessage } from "@/components/docs/MarkdownMessage";

interface Source {
  title: string;
  href: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export interface AssistantAnchor {
  left: number;
  top: number;
}

const SUGGESTED_QUESTIONS = [
  "How do I enable AI review on a repository?",
  "What does severity_threshold do?",
  "Does .codessa.yml override my dashboard settings?",
];

const PANEL_WIDTH = 500;
const PANEL_GAP = 12;
const EDGE_MARGIN = 16;

export function DocsAssistant({
  anchor,
  onClose,
}: {
  anchor: AssistantAnchor;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Codessa docs assistant. Ask me anything about setup, .codessa.yml, or how review settings work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    setError(null);
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/docs-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: next.slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, sources: data.sources },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // Anchor the panel just above-and-right of the button that opened it,
  // clamped so it never runs off the edge of the viewport.
  const left = Math.min(
    Math.max(EDGE_MARGIN, anchor.left),
    window.innerWidth - PANEL_WIDTH - EDGE_MARGIN,
  );
  const bottom = Math.max(EDGE_MARGIN, window.innerHeight - anchor.top + PANEL_GAP);
  const tailOffset = Math.max(12, anchor.left - left + 8);
  // Never taller than the space actually available above the button.
  const height = Math.min(680, anchor.top - PANEL_GAP - EDGE_MARGIN);

  // Rendered via portal straight into <body> so the fixed panel escapes the
  // sidebar's own stacking context and scroll container entirely — otherwise
  // it can end up painted behind the docs content depending on ancestor CSS.
  return createPortal(
    <div
      ref={panelRef}
      style={{ left, bottom, width: PANEL_WIDTH, height }}
      className="animate-pop-in fixed z-[60] flex max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl"
    >
      {/* speech-bubble tail pointing at the button */}
      <span
        style={{ left: tailOffset }}
        className="absolute -bottom-1.5 h-3 w-3 rotate-45 border-b border-r border-outline-variant/20 bg-surface-container-lowest"
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-outline-variant/20 p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="smart_toy" filled className="text-lg" />
          </span>
          <div>
            <p className="text-sm font-medium text-on-surface">Codessa Assistant</p>
            <p className="text-xs text-on-surface-variant">Answers grounded in the docs</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-1 text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
        >
          <Icon name="close" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface"
              }`}
            >
              {m.role === "assistant" ? (
                <MarkdownMessage content={m.content} />
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 border-t border-outline-variant/20 pt-2">
                  {m.sources.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-primary transition hover:underline"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl bg-surface-container px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-surface-variant [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-surface-variant [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-surface-variant" />
            </div>
          </div>
        )}

        {error && <p className="text-center text-xs text-error">{error}</p>}
      </div>

      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="rounded-full border border-outline-variant/30 px-3 py-1.5 text-xs text-on-surface-variant transition hover:border-primary/40 hover:text-on-surface"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-outline-variant/20 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about setup, .codessa.yml, review settings..."
          className="flex-1 rounded-lg border border-outline-variant/20 bg-surface-container px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary transition disabled:opacity-40"
        >
          <Icon name="arrow_upward" className="text-lg" />
        </button>
      </form>
    </div>,
    document.body,
  );
}
