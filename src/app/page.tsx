"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginWithGithub } from "@/lib/api";
import { LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "@/components/ThemeToggle";

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className ?? ""}`} aria-hidden>
      {name}
    </span>
  );
}

function LoginErrorBanner() {
  const searchParams = useSearchParams();
  const loginError = searchParams.get("login_error");
  if (!loginError) return null;
  return (
    <div className="mx-auto mb-6 w-full max-w-2xl rounded-xl border border-error/30 bg-error-container/60 px-4 py-3 text-sm text-on-error-container">
      Login gagal: {loginError}
    </div>
  );
}

const features = [
  {
    span: "md:col-span-2",
    surface: "bg-surface-container-low",
    icon: "troubleshoot",
    iconBg: "bg-primary-container text-primary border-primary/10",
    title: "Automated Reviews",
    body: "Catch bugs, security vulnerabilities, and anti-patterns before they merge. Our AI understands your entire repository context, not just the diff.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-on-surface">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full bg-surface/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex h-16 w-full items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark size={32} />
            <span className="font-display text-2xl font-semibold tracking-tight text-on-surface">Codessa</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="font-bold text-primary transition-colors">
              Features
            </a>
            <a
              href="#demo"
              className="text-on-surface-variant transition-colors hover:text-on-surface"
            >
              Demo
            </a>
            <Link
              href="/docs"
              className="text-on-surface-variant transition-colors hover:text-on-surface"
            >
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={loginWithGithub}
              className="rounded-lg bg-tertiary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-on-tertiary transition hover:opacity-90"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      <main className="w-full bg-background pt-16">
        <div className="relative flex w-full flex-col">
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/4 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-secondary-container/30 mix-blend-multiply blur-[100px]" />
            <div className="absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-primary-container/10 opacity-50 mix-blend-multiply blur-[120px]" />
            <div
              className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                opacity: 0.5,
              }}
            />
          </div>

          {/* HERO */}
          <section className="relative flex min-h-[820px] flex-col items-center justify-center overflow-hidden px-6 py-32 md:px-10">
            {/* Floating code card */}
            <div className="absolute right-1/4 top-32 hidden animate-bounce lg:block">
              <div className="rotate-3 rounded-xl border border-outline-variant/30 bg-surface p-4 shadow-xl backdrop-blur-md">
                <div className="mb-2 flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                  <span className="h-3 w-3 rounded-full bg-error" />
                  <span className="h-3 w-3 rounded-full bg-secondary" />
                  <span className="h-3 w-3 rounded-full bg-tertiary" />
                  <span className="ml-2 font-mono text-sm text-on-surface-variant">analyze_pr.py</span>
                </div>
                <pre className="font-mono text-sm font-medium text-primary">
                  <code>
                    <span className="text-secondary">def</span>{" "}
                    <span className="text-tertiary">review</span>(pr):{"\n"}
                    {"  "}
                    <span className="text-secondary">return</span> ai.analyze(pr)
                  </code>
                </pre>
              </div>
            </div>

            <div className="z-10 mx-auto mt-12 max-w-4xl space-y-8 text-center">
              <Suspense fallback={null}>
                <LoginErrorBanner />
              </Suspense>

              <div className="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container px-4 py-2 shadow-sm transition-transform hover:scale-105">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface">
                  Codessa V2.0 Now Available
                </span>
                <Icon name="arrow_forward" className="text-[14px] text-on-surface-variant" />
              </div>

              <h1 className="font-display text-[56px] font-bold leading-[1.1] tracking-tighter text-on-surface drop-shadow-sm md:text-[80px]">
                AI-Powered PR Reviews
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  for GitHub
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-on-surface-variant md:text-2xl">
                Automate your code reviews with intelligent insights and seamless GitHub
                integration. Ship faster, with absolute confidence.
              </p>

              <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
                <button
                  onClick={loginWithGithub}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-wider text-on-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                >
                  Start for free
                  <Icon name="rocket_launch" className="text-[18px]" />
                </button>
                <a
                  href="#demo"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-outline-variant bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-container sm:w-auto"
                >
                  View demo
                  <Icon name="play_circle" className="text-[18px]" />
                </a>
              </div>

              <div className="mt-8 flex flex-col items-center border-t border-outline-variant/20 pt-16 opacity-70">
                <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                  Supports the languages your team ships
                </span>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {["Python", "JavaScript", "PHP", "Go"].map((lang) => (
                    <span
                      key={lang}
                      className="rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-2 font-mono text-sm text-on-surface-variant"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PR DEMO */}
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
                  <div className="flex cursor-pointer items-center gap-2 rounded bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20">
                    <Icon name="description" className="text-[16px]" />
                    <span className="truncate font-mono text-sm">api/routes.ts</span>
                    <span className="ml-auto text-xs text-secondary">+12 -4</span>
                  </div>
                  <div className="flex cursor-pointer items-center gap-2 rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50">
                    <Icon name="description" className="text-[16px]" />
                    <span className="truncate font-mono text-sm">utils/auth.ts</span>
                  </div>
                  <div className="flex cursor-pointer items-center gap-2 rounded p-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50">
                    <Icon name="description" className="text-[16px]" />
                    <span className="truncate font-mono text-sm">package.json</span>
                  </div>
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
                        <span className="font-medium text-primary">#142</span> opened 2 hours ago
                        by <span className="font-medium text-on-surface">@romzdev</span>
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
                          <strong>Security Insight:</strong> The implementation uses a predictable
                          hashing algorithm. Consider upgrading to Argon2 for production credentials.
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

          {/* FEATURES BENTO */}
          <section id="features" className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-4xl font-semibold text-on-surface">Why Codessa?</h2>
              <p className="mx-auto max-w-xl text-lg text-on-surface-variant">
                Engineered to integrate seamlessly into your workflow, providing deep context
                without the noise.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Feature 1 — large */}
              {features.map((f) => (
                <div
                  key={f.title}
                  className={`group relative overflow-hidden rounded-2xl border border-outline-variant/10 ${f.surface} ${f.span} p-8 shadow-sm`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div
                      className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm ${f.iconBg}`}
                    >
                      <Icon name={f.icon} className="text-[24px]" />
                    </div>
                    <div>
                      <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">{f.title}</h3>
                      <p className="w-3/4 text-on-surface-variant">{f.body}</p>
                    </div>
                    <div className="mt-8 flex gap-2">
                      <div className="h-2 flex-1 rounded-full bg-error opacity-70" />
                      <div className="h-2 flex-[2] rounded-full bg-tertiary opacity-80" />
                      <div className="h-2 flex-[3] rounded-full bg-secondary" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Feature 2 — tall */}
              <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container p-8 shadow-sm md:col-span-1 md:row-span-2">
                <div className="pointer-events-none absolute -right-12 -top-12 select-none text-[150px] font-semibold text-surface-variant opacity-50 transition-transform duration-700 group-hover:scale-110">
                  {"{ }"}
                </div>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/10 bg-secondary-container text-secondary shadow-sm">
                    <Icon name="rule_settings" className="text-[24px]" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">Custom Rules</h3>
                  <p className="flex-1 text-on-surface-variant">
                    Enforce your specific team conventions. Write custom prompt directives tailored
                    to your architecture.
                  </p>
                  <div className="mt-6 space-y-3">
                    {["Strict Typing", "No console.log"].map((rule) => (
                      <div
                        key={rule}
                        className="flex items-center justify-between rounded-lg border border-outline-variant/30 bg-surface p-3 shadow-sm"
                      >
                        <span className="truncate font-mono text-xs text-on-surface-variant">
                          {rule}
                        </span>
                        <div className="relative h-4 w-8 rounded-full bg-primary">
                          <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-on-primary" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-sm md:col-span-1">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-tertiary/10 bg-tertiary-container text-tertiary shadow-sm">
                  <Icon name="insights" className="text-[24px]" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">AI Insight</h3>
                <p className="text-on-surface-variant">
                  Beyond simple linting, get architectural suggestions and performance optimization
                  strategies directly in the PR comments.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm transition-colors duration-300 hover:border-secondary/50 md:col-span-1">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-variant text-on-surface shadow-sm">
                  <Icon name="bolt" className="text-[24px]" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold text-on-surface">Fast Integration</h3>
                <p className="text-on-surface-variant">
                  Install the GitHub App in two clicks. No complex CI/CD pipeline modifications
                  required to get started.
                </p>
              </div>
            </div>
          </section>

          {/* VISUAL BREAKER */}
          <section className="relative w-full overflow-hidden py-12">
            <div className="absolute inset-0 -z-10 origin-top-left -skew-y-3 transform bg-secondary-container/20" />
            <div className="pointer-events-none flex select-none overflow-hidden py-4 opacity-50">
              <div className="flex animate-[slide_20s_linear_infinite] gap-8 whitespace-nowrap font-mono text-5xl text-on-surface-variant/40">
                {[0, 1].map((k) => (
                  <span key={k} className="flex items-center gap-8">
                    <span>// ANALYZING_DIFF</span>
                    <span className="text-secondary">•</span>
                    <span>GENERATING_INSIGHTS</span>
                    <span className="text-tertiary">•</span>
                    <span>CHECKING_VULNERABILITIES</span>
                    <span className="text-primary">•</span>
                    <span>OPTIMIZING_PERFORMANCE</span>
                    <span className="text-secondary">•</span>
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-xs font-semibold uppercase tracking-wider text-on-surface-variant md:flex-row md:px-10">
          <span>© 2026 Codessa AI. Built for precision.</span>
          <div className="flex gap-8">
            <Link href="/docs" className="transition-colors hover:text-primary">
              Docs
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-primary">
              Dashboard
            </Link>
            <a href="#features" className="transition-colors hover:text-primary">
              Features
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
