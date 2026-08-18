"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/Icon";
import { PageFeedback } from "@/components/docs/PageFeedback";

type Source = "yml" | "dashboard" | "default";

const sourceTag: Record<Source, { label: string; cls: string }> = {
  yml: { label: ".codessa.yml", cls: "bg-primary/10 text-primary" },
  dashboard: { label: "dashboard", cls: "bg-secondary/10 text-secondary" },
  default: { label: "default", cls: "bg-tertiary/10 text-tertiary" },
};

const exampleRows: {
  field: string;
  yml: string;
  dashboard: string;
  effective: string;
  source: Source;
}[] = [
  { field: "tone", yml: "—", dashboard: "strict", effective: "strict", source: "dashboard" },
  {
    field: "severity_threshold",
    yml: "balanced",
    dashboard: "strict",
    effective: "balanced",
    source: "yml",
  },
  {
    field: "analysis_focus.security",
    yml: "true",
    dashboard: "false",
    effective: "true",
    source: "yml",
  },
  { field: "language", yml: "—", dashboard: "—", effective: "en", source: "default" },
];

function SourceBadge({ source }: { source: Source }) {
  const tag = sourceTag[source];
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tag.cls}`}>
      {tag.label}
    </span>
  );
}

export function ConfigHierarchyArticle() {
  const locale = useLocale();
  const t = useTranslations("docs.configHierarchy");

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
            {t("description.prefix")}{" "}
            <Link href={withLocale("/docs/quickstart-guide#configuration-setup")} className="text-primary hover:underline">
              .codessa.yml
            </Link>{" "}
            {t("description.suffix")}
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section id="precedence" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-primary">
                01
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">
                {t("precedence.title")}
              </h2>
            </div>
            <p className="mb-8 text-base leading-relaxed text-on-surface-variant">
              {t("precedence.description")}
            </p>

            <div className="flex flex-col items-stretch">
              {[1, 2, 3].map((rank) => (
                <div key={rank}>
                  <div className="flex gap-4 rounded-xl bg-surface-container p-6 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high font-mono text-sm font-semibold text-on-surface">
                      {rank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Icon name={rank === 1 ? "description" : rank === 2 ? "tune" : "settings_backup_restore"} className="text-lg text-on-surface" />
                        <h3 className="font-mono text-base font-medium text-on-surface">
                          {t(`precedence.tier${rank}.title`)}
                        </h3>
                        <span
                          className={`ml-auto inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                            rank === 1 ? "bg-primary/10 text-primary" : rank === 2 ? "bg-secondary/10 text-secondary" : "bg-tertiary/10 text-tertiary"
                          }`}
                        >
                          {t(`precedence.tier${rank}.badge`)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs uppercase tracking-wider text-on-surface-variant">
                        {t(`precedence.tier${rank}.subtitle`)}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                        {t(`precedence.tier${rank}.desc`)}
                      </p>
                    </div>
                  </div>
                  {rank < 3 && (
                    <div className="flex justify-start py-2 pl-9">
                      <Icon
                        name="south"
                        className="text-lg text-on-surface-variant/50"
                      />
                      <span className="ml-2 self-center text-xs text-on-surface-variant/70">
                        {t("precedence.fallback")}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section id="example" className="scroll-mt-24">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high font-mono text-sm text-secondary">
                02
              </div>
              <h2 className="font-display text-2xl font-semibold text-on-surface">
                {t("example.title")}
              </h2>
            </div>
            <p className="mb-6 text-base leading-relaxed text-on-surface-variant">
              {t("example.description.prefix")}{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface">
                .codessa.yml
              </code>{" "}
              {t("example.description.suffix")}
            </p>

            <div className="overflow-x-auto rounded-xl border border-outline-variant/20 shadow-sm">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-surface-container-high text-xs uppercase tracking-wider text-on-surface-variant">
                    <th className="px-4 py-3 font-medium">{t("example.field")}</th>
                    <th className="px-4 py-3 font-medium">.codessa.yml</th>
                    <th className="px-4 py-3 font-medium">{t("example.dashboard")}</th>
                    <th className="px-4 py-3 font-medium">{t("example.effective")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 bg-surface-container">
                  {exampleRows.map((row) => (
                    <tr key={row.field}>
                      <td className="px-4 py-3 font-mono text-xs text-primary">{row.field}</td>
                      <td className="px-4 py-3 font-mono text-xs text-on-surface-variant">
                        {row.yml}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-on-surface-variant">
                        {row.dashboard}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-on-surface">
                            {row.effective}
                          </span>
                          <SourceBadge source={row.source} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-base leading-relaxed text-on-surface-variant">
              {t("example.conclusion.prefix")}{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface">
                .codessa.yml
              </code>{" "}
              {t("example.conclusion.suffix")}
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
