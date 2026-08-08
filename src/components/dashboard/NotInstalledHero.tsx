"use client";

import Link from "next/link";
import { installGithubApp } from "@/lib/api";
import { Icon } from "@/components/Icon";
import { GithubMark } from "@/components/GithubMark";

const steps = [
  {
    n: "01",
    color: "text-tertiary",
    title: "Install App",
    body: "Authorize Codessa in your GitHub account.",
  },
  {
    n: "02",
    color: "text-primary",
    title: "Select Repositories",
    body: "Choose which projects AI should monitor.",
  },
  {
    n: "03",
    color: "text-secondary",
    title: "Receive AI Reviews",
    body: "Get automated PR feedback instantly.",
  },
];

export function NotInstalledHero() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-surface to-surface-container-low p-6 sm:p-10">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/3 rounded-full bg-secondary-container/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/3 rounded-full bg-tertiary-container/10 blur-[150px]" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center space-y-12 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative mb-4 h-35 w-35">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 opacity-50 duration-1000" />
            <div className="absolute inset-3 flex items-center justify-center overflow-hidden rounded-full bg-surface-container-highest shadow-xl">
              <Icon name="cable" filled size={70} className="animate-pulse text-primary" />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="text-outline/40"
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
                <circle
                  className="text-primary/40"
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 6"
                />
              </svg>
            </div>
          </div>

          <h1 className="max-w-2xl font-display text-[28px] font-semibold leading-9 tracking-tight text-on-surface sm:text-[32px] sm:leading-10">
            Connect your first repository to start automating.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Integrate Codessa with your GitHub workflow in seconds. Our AI will automatically
            start reviewing your PRs for bugs, security, and style.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={installGithubApp}
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <GithubMark className="relative z-10 h-5 w-5" />
            <span className="relative z-10">Install GitHub App</span>
          </button>
          <Link
            href="/docs"
            className="flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container px-6 py-3 text-sm text-on-surface transition-colors duration-300 hover:bg-surface-container-high"
          >
            <Icon name="menu_book" className="text-lg" />
            View Documentation
          </Link>
        </div>

        <div className="mt-4 w-full max-w-3xl rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/80 p-8 shadow-sm backdrop-blur-md">
          <h3 className="mb-8 text-center text-sm uppercase tracking-widest text-on-surface opacity-80">
            How it works
          </h3>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Aligned to the vertical center of the h-12 number circles below,
                not the whole column (which also includes title/body text). */}
            <div className="absolute left-[16%] right-[16%] top-6 hidden h-[2px] bg-gradient-to-r from-surface-container-highest via-outline-variant/60 to-surface-container-highest md:block" />
            {steps.map((step) => (
              <div key={step.n} className="group relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-high shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <span className={`font-mono text-sm ${step.color}`}>{step.n}</span>
                </div>
                <h4 className="mb-2 text-base font-medium text-on-surface">{step.title}</h4>
                <p className="text-sm text-on-surface-variant">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
