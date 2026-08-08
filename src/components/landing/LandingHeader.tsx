"use client";

import Link from "next/link";
import { loginWithGithub } from "@/lib/api";
import { LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "@/components/ThemeToggle";

export function LandingHeader() {
  return (
    <header className="fixed top-0 z-50 w-full bg-surface/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark size={32} />
          <span className="font-display text-2xl font-semibold tracking-tight text-on-surface">
            Codessa
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="font-bold text-primary transition-colors">
            Features
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
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-on-primary transition hover:opacity-90"
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
