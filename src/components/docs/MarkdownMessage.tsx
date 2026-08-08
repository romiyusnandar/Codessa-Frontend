import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders assistant replies as markdown. react-markdown never renders raw
// HTML by default, so this stays safe even though the content originates
// from an LLM response.
const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-on-surface">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  h1: ({ children }) => <p className="mb-1 font-semibold text-on-surface">{children}</p>,
  h2: ({ children }) => <p className="mb-1 font-semibold text-on-surface">{children}</p>,
  h3: ({ children }) => <p className="mb-1 font-semibold text-on-surface">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote className="mb-2 border-l-2 border-outline-variant/40 pl-3 text-on-surface-variant last:mb-0">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = /language-/.test(className ?? "");
    if (isBlock) {
      return (
        <code className={`font-mono text-xs ${className ?? ""}`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-surface px-1 py-0.5 font-mono text-[0.85em] text-on-surface">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-2 overflow-x-auto rounded-lg bg-[#0f172a] p-3 text-[#d4e4fa] last:mb-0">
      {children}
    </pre>
  ),
};

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="text-sm leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
