import { Icon } from "@/components/Icon";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { PageFeedback } from "@/components/docs/PageFeedback";

const configYaml = `version: "1"

auto_review: true

# Review output: en | id | zh
language: "id"

# Review writing style: friendly | strict | concise
tone: "friendly"

review_rules:
  # Glob pattern file/folder what was skipped in the review
  ignore_paths:
    - "**/*.lock"
    - "node_modules/**"
    - "dist/**"
    - "public/assets/**"

analysis_focus:
  security: true
  performance: true
  bugs: true
  code_style: false   # If false, the AI will not comment on the writing style.

  # Strictness of displayed comments and commit status failures:
  #   critical_only -> display and fail status only for "critical" findings
  #   balanced      -> display all severity levels; fail status only for "critical" (default)
  #   strict        -> display all severity levels; fail status for "major" as well
  severity_threshold: "balanced"

# Additional instructions, any text is fine.
custom_instructions: |
  - Always provide a code snippet showing the fix for every bug found.
  - For Go files, ensure error handling is always checked (\`if err != nil\`).`;

const configFields = [
  { key: "version", desc: "Config schema version. Currently always \"1\"." },
  { key: "auto_review", desc: "When true, every new pull request is reviewed automatically." },
  { key: "language", desc: "Language used for review comments: en, id, or zh." },
  { key: "tone", desc: "Writing style of the review: friendly, strict, or concise." },
  { key: "review_rules.ignore_paths", desc: "Glob patterns for files or folders Codessa should skip." },
  {
    key: "analysis_focus",
    desc: "Turn security, performance, bugs, and code_style checks on or off individually.",
  },
  {
    key: "severity_threshold",
    desc: "How strict Codessa is about failing the commit status: critical_only, balanced, or strict.",
  },
  { key: "custom_instructions", desc: "Free-form extra instructions for the AI reviewer." },
];

const setupSteps = [
  {
    icon: "login",
    title: "Sign in using GitHub",
    body: "Open the Codessa homepage and click Sign up. You'll authorize access through GitHub OAuth — there's no new password to create.",
  },
  {
    icon: "download",
    title: "Install the GitHub App",
    body: "From your dashboard, add a repository and install the Codessa GitHub App, choosing which account or organization and which repositories it can access.",
  },
  {
    icon: "toggle_on",
    title: "Enable AI review on a repository",
    body: "AI review is off by default. Find the repository in Overview and toggle its status from Disabled to Enabled.",
  },
];

export function QuickstartArticle() {
  return (
    <main className="relative min-w-0 flex-1 scroll-smooth">
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-8 py-12 md:px-12 md:py-16">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-sm">
            <span className="text-primary">docs</span>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant">quickstart-guide</span>
          </div>
          <h1 className="mb-4 font-display text-[32px] font-semibold leading-10 tracking-[-0.01em] text-on-surface">
            Quickstart Guide
          </h1>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            Getting Codessa running takes a few minutes: sign in, install the GitHub App, enable AI
            review, then add a config file to tune how it reviews each repository.
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <section id="setup" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-primary">
                01
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">Get connected</h2>
            </div>

            <ol className="relative ml-4 space-y-8 border-l border-outline-variant/30">
              {setupSteps.map((step, i) => (
                <li key={step.title} className="relative pl-8">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-on-primary ring-4 ring-background">
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <Icon name={step.icon} filled className="text-lg text-primary" />
                    <h3 className="text-lg font-medium text-on-surface">{step.title}</h3>
                  </div>
                  <p className="mt-1 text-base leading-relaxed text-on-surface-variant">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            {/* Mock repository row, mirroring the dashboard */}
            <div className="mt-8 flex items-center justify-between gap-3 rounded-xl bg-surface-container p-4 shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                <div>
                  <p className="text-sm font-medium text-on-surface">acme/checkout-service</p>
                  <p className="text-xs text-on-surface-variant">Public · default branch: main</p>
                </div>
              </div>
              <span className="inline-flex items-center rounded-md bg-moss-soft px-2 py-0.5 text-xs font-medium text-moss">
                Enabled
              </span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              Enabling is per repository — turn it on for some and leave others off. Once enabled,
              every new pull request is reviewed automatically.
            </p>
          </section>

          {/* Step 2 */}
          <section id="configuration-setup" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-secondary">
                02
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">
                Configuration Setup
              </h2>
            </div>
            <p className="mb-6 text-base leading-relaxed text-on-surface-variant">
              After enabling a repository, add a{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface">
                .github/.codessa.yml
              </code>{" "}
              file to the root of that repository. This is where Codessa reads how strict to be, which
              language to write in, and what to focus on.
            </p>

            <CodeBlock filename=".github/.codessa.yml" code={configYaml} />

            <ul className="mt-6 space-y-3">
              {configFields.map((field) => (
                <li key={field.key} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <code className="w-fit shrink-0 rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs text-primary sm:w-56">
                    {field.key}
                  </code>
                  <p className="text-sm text-on-surface-variant">{field.desc}</p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-base leading-relaxed text-on-surface-variant">
              Push the file to your default branch and it takes effect on the next pull request —
              nothing is re-reviewed retroactively.
            </p>
          </section>

          {/* Feedback */}
          <div className="mt-4">
            <PageFeedback />
          </div>
        </div>
      </div>
    </main>
  );
}
