import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageFeedback } from "@/components/docs/PageFeedback";

const tiers = [
  {
    rank: 1,
    icon: "description",
    title: ".codessa.yml",
    subtitle: "Committed to the repository",
    desc: "Any field set here wins, no matter what the dashboard says. It lives with the code and travels with the branch, which makes it the most specific place to configure a repo.",
    badge: "Wins when set",
    badgeCls: "bg-primary/10 text-primary",
  },
  {
    rank: 2,
    icon: "tune",
    title: "Dashboard Settings",
    subtitle: "Set per repository in Codessa",
    desc: "Used for any field .codessa.yml leaves out. Handy for a quick baseline without maintaining a config file at all.",
    badge: "Fills the gaps",
    badgeCls: "bg-secondary/10 text-secondary",
  },
  {
    rank: 3,
    icon: "settings_backup_restore",
    title: "Built-in defaults",
    subtitle: "Shipped with Codessa",
    desc: "Used when a field isn't set in .codessa.yml or the dashboard. Every repository always ends up with a complete, working configuration.",
    badge: "Final fallback",
    badgeCls: "bg-tertiary/10 text-tertiary",
  },
];

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
  return (
    <main className="relative min-w-0 flex-1 scroll-smooth">
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-8 py-12 md:px-12 md:py-16">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-sm">
            <span className="text-primary">docs</span>
            <span className="text-outline">/</span>
            <span className="text-on-surface-variant">configuration-hierarchy</span>
          </div>
          <h1 className="mb-4 font-display text-[32px] font-semibold leading-10 tracking-[-0.01em] text-on-surface">
            Configuration Hierarchy
          </h1>
          <p className="text-lg leading-relaxed text-on-surface-variant">
            A repository&apos;s review behavior can come from three places. Codessa checks them in
            order, field by field, so a{" "}
            <Link
              href="/docs/quickstart-guide#configuration-setup"
              className="text-primary hover:underline"
            >
              .codessa.yml
            </Link>{" "}
            file doesn&apos;t have to set everything to take effect.
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
                How precedence works
              </h2>
            </div>
            <p className="mb-8 text-base leading-relaxed text-on-surface-variant">
              For every individual setting — tone, severity threshold, each analysis focus flag — Codessa
              looks top to bottom until it finds a value.
            </p>

            <div className="flex flex-col items-stretch">
              {tiers.map((tier, i) => (
                <div key={tier.rank}>
                  <div className="flex gap-4 rounded-xl bg-surface-container p-6 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high font-mono text-sm font-semibold text-on-surface">
                      {tier.rank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Icon name={tier.icon} className="text-lg text-on-surface" />
                        <h3 className="font-mono text-base font-medium text-on-surface">
                          {tier.title}
                        </h3>
                        <span
                          className={`ml-auto inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tier.badgeCls}`}
                        >
                          {tier.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs uppercase tracking-wider text-on-surface-variant">
                        {tier.subtitle}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                        {tier.desc}
                      </p>
                    </div>
                  </div>
                  {i < tiers.length - 1 && (
                    <div className="flex justify-start py-2 pl-9">
                      <Icon
                        name="south"
                        className="text-lg text-on-surface-variant/50"
                      />
                      <span className="ml-2 self-center text-xs text-on-surface-variant/70">
                        not set? fall back
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
                Field-by-field example
              </h2>
            </div>
            <p className="mb-6 text-base leading-relaxed text-on-surface-variant">
              Say a repository has a partial{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface">
                .codessa.yml
              </code>{" "}
              and some dashboard settings. Here&apos;s what actually gets used:
            </p>

            <div className="overflow-x-auto rounded-xl border border-outline-variant/20 shadow-sm">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-surface-container-high text-xs uppercase tracking-wider text-on-surface-variant">
                    <th className="px-4 py-3 font-medium">Field</th>
                    <th className="px-4 py-3 font-medium">.codessa.yml</th>
                    <th className="px-4 py-3 font-medium">Dashboard</th>
                    <th className="px-4 py-3 font-medium">Effective value</th>
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
              This is why a{" "}
              <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-sm text-on-surface">
                .codessa.yml
              </code>{" "}
              file only needs to contain the fields you actually want to lock in — everything else
              still falls through to the dashboard, then to Codessa&apos;s defaults.
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
