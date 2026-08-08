"use client";

import { Suspense, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginWithGithub } from "@/lib/api";
import { Icon } from "@/components/Icon";

const languages = ["Python", "JavaScript", "PHP", "Go"];

const GRID_LINE = "color-mix(in srgb, var(--primary) 12%, transparent)";
const GRID = `linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px), linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)`;
const GRID_STRONG =
  "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)";
const CELL = "72px 72px";

// Grid that is always faintly visible, and brightens around the cursor on
// hover. The mouse position is written to CSS custom properties on the section
// (via ref, so there is no React re-render) and read here through a radial mask.
function InteractiveGrid() {
  return (
    <>
      {/* base grid — always visible, low opacity, fading toward the content */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: GRID,
          backgroundSize: CELL,
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 92%)",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 92%)",
        }}
      />
      {/* highlight grid — brighter lines that follow the cursor on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/hero:opacity-100"
        style={{
          backgroundImage: GRID_STRONG,
          backgroundSize: CELL,
          WebkitMaskImage:
            "radial-gradient(240px circle at var(--mx) var(--my), rgba(0,0,0,0.9), transparent 70%)",
          maskImage:
            "radial-gradient(240px circle at var(--mx) var(--my), rgba(0,0,0,0.9), transparent 70%)",
        }}
      />
      {/* soft glow around the cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/hero:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), color-mix(in srgb, var(--primary) 14%, transparent), transparent 72%)",
        }}
      />
    </>
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
  const sectionRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{ "--mx": "50%", "--my": "-200px" } as CSSProperties}
      className="group/hero relative flex min-h-[820px] flex-col items-center justify-center overflow-hidden px-6 py-32 md:px-10"
    >
      <InteractiveGrid />
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
          <Link
            href="/docs"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-outline-variant bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-container sm:w-auto"
          >
            Docs
            <Icon name="menu_book" className="text-[18px]" />
          </Link>
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
