"use client";

import { Icon } from "@/components/Icon";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { PageFeedback } from "@/components/docs/PageFeedback";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

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

const configFieldKeys = [
  "version",
  "auto_review",
  "language",
  "tone",
  "review_rules_ignore_paths",
  "analysis_focus",
  "severity_threshold",
  "custom_instructions",
];

const setupStepIcons = ["login", "download", "toggle_on"];

export function QuickstartArticle() {
  const locale = useLocale();
  const t = useTranslations("docs.quickstart");

  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <main className="relative min-w-0 flex-1 scroll-smooth">
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-8 py-12 md:px-12 md:py-16">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-sm">
            <span className="text-primary">docs</span>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant">{t("breadcrumb")}</span>
          </div>
          <h1 className="mb-4 font-display text-[32px] font-semibold leading-10 tracking-[-0.01em] text-on-surface">
            {t("title")}
          </h1>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            {t("description")}
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <section id="setup" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-primary">
                01
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">{t("setup.title")}</h2>
            </div>

            <ol className="relative ml-4 space-y-8 border-l border-outline-variant/30">
              {setupStepIcons.map((icon, i) => (
                <li key={icon} className="relative pl-8">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-on-primary ring-4 ring-background">
                    {i + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <Icon name={icon} filled className="text-lg text-primary" />
                    <h3 className="text-lg font-medium text-on-surface">{t(`setup.step${i + 1}.title`)}</h3>
                  </div>
                  <p className="mt-1 text-base leading-relaxed text-on-surface-variant">
                    {t(`setup.step${i + 1}.body`)}
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
                {t("setup.enabled")}
              </span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              {t("setup.enabledDesc")}
            </p>
          </section>

          {/* Step 2 */}
          <section id="configuration-setup" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-secondary">
                02
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">
                {t("config.title")}
              </h2>
            </div>
            <p className="mb-6 text-base leading-relaxed text-on-surface-variant">
              {t("config.description.prefix")}{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface">
                .github/.codessa.yml
              </code>{" "}
              {t("config.description.suffix")}
            </p>

            <CodeBlock filename=".github/.codessa.yml" code={configYaml} />

            <ul className="mt-6 space-y-3">
              {configFieldKeys.map((field) => (
                <li key={field} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <code className="w-fit shrink-0 rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs text-primary sm:w-56">
                    {field}
                  </code>
                  <p className="text-sm text-on-surface-variant">{t(`config.fields.${field}`)}</p>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-base leading-relaxed text-on-surface-variant">
              {t("config.pushDesc")}
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
