import { Icon } from "@/components/Icon";

const changedFiles = [
  { name: "api/routes.ts", diff: "+12 -4", active: true },
  { name: "utils/auth.ts", diff: null, active: false },
  { name: "package.json", diff: null, active: false },
];

export function PrDemoSection() {
  return (
    <section id="demo" className="relative z-20 mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface shadow-xl transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] md:flex-row">
        {/* File tree */}
        <div className="hidden w-64 flex-col border-r border-outline-variant/20 bg-surface-container-low md:flex">
          <div className="flex items-center justify-between border-b border-outline-variant/20 bg-surface-container p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface">
              Files changed
            </span>
            <span className="rounded bg-surface-variant px-2 py-0.5 text-xs text-on-surface-variant">
              3
            </span>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {changedFiles.map((file) => (
              <div
                key={file.name}
                className={`flex cursor-pointer items-center gap-2 rounded p-2 transition-colors ${
                  file.active
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-on-surface-variant hover:bg-surface-variant/50"
                }`}
              >
                <Icon name="description" className="text-[16px]" />
                <span className="truncate font-mono text-sm">{file.name}</span>
                {file.diff && <span className="ml-auto text-xs text-secondary">{file.diff}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Diff */}
        <div className="flex flex-1 flex-col bg-surface-bright">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/20 bg-surface-container-lowest p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary/30 bg-secondary-container/50 text-secondary">
                <Icon name="merge" className="text-[18px]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-on-surface">
                  feat: implement robust rate limiting
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-on-surface-variant">
                  <span className="font-medium text-primary">#142</span> opened 2 hours ago by{" "}
                  <span className="font-medium text-on-surface">@romzdev</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                AI Analyzed
              </span>
            </div>
          </div>

          <div className="relative overflow-x-auto p-6 font-mono text-sm leading-relaxed text-on-surface">
            {/* AI popover */}
            <div className="absolute right-8 top-1/4 z-10 w-80 translate-x-4 rounded-xl border border-outline-variant/30 bg-surface p-4 opacity-0 shadow-lg transition-all delay-100 duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
                  <Icon name="smart_toy" className="text-[14px]" />
                </div>
                <div>
                  <p className="mb-2 text-base text-on-surface">
                    <strong>Security Insight:</strong> The implementation uses a predictable hashing
                    algorithm. Consider upgrading to Argon2 for production credentials.
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded bg-secondary px-3 py-1 text-xs text-on-secondary shadow transition-colors hover:opacity-90">
                      Apply Fix
                    </button>
                    <button className="rounded border border-outline-variant px-3 py-1 text-xs text-on-surface-variant transition-colors hover:bg-surface-variant">
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <table className="w-full border-collapse text-left">
              <tbody>
                <tr>
                  <td className="w-8 select-none pr-4 text-right text-outline-variant">42</td>
                  <td className="w-8 select-none pr-4 text-right text-outline-variant">42</td>
                  <td>
                    <span className="text-tertiary">const</span> req =
                    context.switchToHttp().getRequest();
                  </td>
                </tr>
                <tr className="bg-error-container/50">
                  <td className="w-8 select-none pr-4 text-right text-error/70">43</td>
                  <td className="w-8 select-none pr-4 text-right text-outline-variant" />
                  <td className="text-error">
                    - <span className="text-on-surface">const ip = req.ip;</span>
                  </td>
                </tr>
                <tr className="relative bg-primary/10">
                  <td className="w-8 select-none pr-4 text-right text-outline-variant" />
                  <td className="w-8 select-none pr-4 text-right text-primary/70">43</td>
                  <td className="text-primary">
                    +{" "}
                    <span className="text-on-surface">
                      const ip = req.headers[&apos;x-forwarded-for&apos;] || req.ip;
                    </span>
                    <div className="absolute inset-y-0 right-0 w-1 animate-pulse bg-secondary" />
                  </td>
                </tr>
                <tr>
                  <td className="w-8 select-none pr-4 text-right text-outline-variant">44</td>
                  <td className="w-8 select-none pr-4 text-right text-outline-variant">44</td>
                  <td>
                    <span className="text-tertiary">return</span>{" "}
                    <span className="text-secondary">this</span>.rateLimiter.check(ip);
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
