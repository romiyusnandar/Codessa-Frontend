import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageFeedback } from "@/components/docs/PageFeedback";

const codeLanguages = ["Python", "JavaScript", "PHP", "Go"];

const outputLanguages = [
  { code: "en", label: "English" },
  { code: "id", label: "Indonesian" },
  { code: "zh", label: "Chinese" },
];

const steps = [
  {
    icon: "commit",
    color: "text-primary",
    glow: "from-primary/5",
    title: "1. Push Code",
    body: "Developer pushes a commit and opens a Pull Request in GitHub.",
  },
  {
    icon: "troubleshoot",
    color: "text-secondary",
    glow: "from-secondary/5",
    title: "2. AI Analysis",
    body: "Codessa intercepts the webhook, fetching diffs and context for analysis.",
  },
  {
    icon: "forum",
    color: "text-tertiary",
    glow: "from-tertiary/5",
    title: "3. Feedback",
    body: "Actionable comments and suggested fixes are posted directly to the PR.",
  },
];

export function DocsArticle() {
  return (
    <main className="relative min-w-0 flex-1 scroll-smooth">
      {/* Ambient decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-8 py-12 md:px-12 md:py-16">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-sm">
            <span className="text-primary">docs</span>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant">getting-started</span>
          </div>
          <h1 className="mb-4 font-display text-[32px] font-semibold leading-10 tracking-[-0.01em] text-on-surface">
            Introduction to Codessa
          </h1>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            Codessa acts as an intelligent layer between your repository and your developers. By
            automatically analyzing Pull Requests, it identifies structural flaws, style violations,
            and potential bugs before a human reviewer even looks at the code.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section id="how-it-works" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-primary">
                01
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">How It Works</h2>
            </div>
            <div className="mb-8 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="group relative overflow-hidden rounded-xl bg-surface-container p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.glow} to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
                  />
                  <Icon name={step.icon} filled className={`mb-4 block text-3xl ${step.color}`} />
                  <h3 className="mb-2 text-lg font-medium text-on-surface">{step.title}</h3>
                  <p className="text-base text-on-surface-variant">{step.body}</p>
                </div>
              ))}
            </div>
            <p className="text-base leading-relaxed text-on-surface-variant">
              Our engine doesn&apos;t just look at line-level syntax; it builds a localized semantic
              graph of your changes to understand how modifications impact surrounding files and
              architectural patterns.
            </p>
          </section>

          {/* Section 2 */}
          <section id="languages" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-secondary">
                02
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">
                Supported languages
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-on-surface">Code Codessa reviews</p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Programming languages Codessa understands well enough to analyze.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {codeLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-lg border border-outline-variant/30 bg-surface-container px-3 py-1.5 font-mono text-sm text-on-surface"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-on-surface">Review output language</p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  The language Codessa writes review comments in — separate from the code
                  language above.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {outputLanguages.map((lang) => (
                    <span
                      key={lang.code}
                      className="rounded-lg border border-outline-variant/30 bg-surface-container px-3 py-1.5 font-mono text-sm text-on-surface"
                    >
                      {lang.code}{" "}
                      <span className="text-on-surface-variant">— {lang.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-on-surface-variant">
              Set with the{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface">
                language
              </code>{" "}
              field in{" "}
              <Link
                href="/docs/quickstart-guide#configuration-setup"
                className="text-primary hover:underline"
              >
                .codessa.yml
              </Link>
              , or from the account&apos;s Settings page — following the same{" "}
              <Link href="/docs/configuration-hierarchy" className="text-primary hover:underline">
                configuration hierarchy
              </Link>{" "}
              as every other setting.
            </p>
          </section>

          {/* Pointer to the actionable walkthrough */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-4">
              <Icon name="rocket_launch" filled className="text-2xl text-primary" />
              <div>
                <h3 className="text-base font-medium text-on-surface">Ready to set it up?</h3>
                <p className="mt-0.5 text-sm text-on-surface-variant">
                  The Quickstart Guide walks through signing in, installing the app, and
                  configuring review settings.
                </p>
              </div>
            </div>
            <Link
              href="/docs/quickstart-guide"
              className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-on-primary transition hover:opacity-90"
            >
              Quickstart
            </Link>
          </div>

          {/* Feedback */}
          <div className="mt-4">
            <PageFeedback />
          </div>
        </div>
      </div>
    </main>
  );
}
