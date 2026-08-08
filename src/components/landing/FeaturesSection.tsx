import { Icon } from "@/components/Icon";

const customRules = ["Strict Typing", "No console.log"];

export function FeaturesSection() {
  return (
    <section id="features" className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-display text-4xl font-semibold text-on-surface">Why Codessa?</h2>
        <p className="mx-auto max-w-xl text-lg text-on-surface-variant">
          Engineered to integrate seamlessly into your workflow, providing deep context without the
          noise.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Automated Reviews — large */}
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-sm md:col-span-2">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
              <Icon name="troubleshoot" className="text-[24px]" />
            </div>
            <div>
              <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">
                Automated Reviews
              </h3>
              <p className="w-3/4 text-on-surface-variant">
                Catch bugs, security vulnerabilities, and anti-patterns before they merge. Our AI
                understands your entire repository context, not just the diff.
              </p>
            </div>
            <div className="mt-8 flex gap-2">
              <div className="h-2 flex-1 rounded-full bg-error opacity-70" />
              <div className="h-2 flex-[2] rounded-full bg-tertiary opacity-80" />
              <div className="h-2 flex-[3] rounded-full bg-secondary" />
            </div>
          </div>
        </div>

        {/* Custom Rules — tall */}
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm md:col-span-1 md:row-span-2">
          <div className="pointer-events-none absolute -right-12 -top-12 select-none text-[150px] font-semibold text-surface-variant opacity-50 transition-transform duration-700 group-hover:scale-110">
            {"{ }"}
          </div>
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary shadow-sm">
              <Icon name="rule_settings" className="text-[24px]" />
            </div>
            <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">Custom Rules</h3>
            <p className="flex-1 text-on-surface-variant">
              Enforce your specific team conventions. Write custom prompt directives tailored to your
              architecture.
            </p>
            <div className="mt-6 space-y-3">
              {customRules.map((rule) => (
                <div
                  key={rule}
                  className="flex items-center justify-between rounded-lg border border-outline-variant/30 bg-surface p-3 shadow-sm"
                >
                  <span className="truncate font-mono text-xs text-on-surface-variant">{rule}</span>
                  <div className="relative h-4 w-8 rounded-full bg-primary">
                    <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-on-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-sm md:col-span-1">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-tertiary/20 bg-tertiary/10 text-tertiary shadow-sm">
            <Icon name="insights" className="text-[24px]" />
          </div>
          <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">AI Insight</h3>
          <p className="text-on-surface-variant">
            Beyond simple linting, get architectural suggestions and performance optimization
            strategies directly in the PR comments.
          </p>
        </div>

        {/* Fast Integration */}
        <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm transition-colors duration-300 hover:border-secondary/50 md:col-span-1">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-sm">
            <Icon name="bolt" className="text-[24px]" />
          </div>
          <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">
            Fast Integration
          </h3>
          <p className="text-on-surface-variant">
            Install the GitHub App in two clicks. No complex CI/CD pipeline modifications required to
            get started.
          </p>
        </div>
      </div>
    </section>
  );
}
