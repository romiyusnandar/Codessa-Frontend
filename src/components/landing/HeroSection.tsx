"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginWithGithub } from "@/lib/api";
import { Icon } from "@/components/Icon";

const languages = ["Python", "JavaScript", "PHP", "Go"];

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

function FloatingCodeCard() {
  return (
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
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[820px] flex-col items-center justify-center overflow-hidden px-6 py-32 md:px-10">
      <FloatingCodeCard />

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
          Automate your code reviews with intelligent insights and seamless GitHub integration.
          Ship faster, with absolute confidence.
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
            {languages.map((lang) => (
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
  );
}
