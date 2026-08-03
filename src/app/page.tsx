"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginWithGithub } from "@/lib/api";

const features = [
  {
    title: "Auto-review tiap PR baru",
    description:
      "Codessa otomatis menganalisis setiap pull request baru di repository kamu, tanpa perlu trigger manual.",
  },
  {
    title: "Python, JavaScript, PHP, Go",
    description:
      "Mendukung empat bahasa pemrograman ini, jadi cocok untuk stack backend maupun frontend yang kamu pakai.",
  },
  {
    title: "History tersimpan",
    description:
      "Setiap hasil review tersimpan rapi, lengkap dengan komentar per file dan tingkat severity-nya.",
  },
  {
    title: "Custom bahasa output review",
    description:
      "Atur bahasa hasil review sesuai preferensi tim kamu, misalnya Bahasa Indonesia atau English.",
  },
];

function LoginErrorBanner() {
  const searchParams = useSearchParams();
  const loginError = searchParams.get("login_error");

  if (!loginError) return null;

  return (
    <div className="mx-auto mb-6 w-full max-w-2xl rounded-lg border border-rust/25 bg-rust-soft px-4 py-3 text-sm text-rust">
      Login gagal: {loginError}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas">
      <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3.5">
        <span className="text-[15px] font-semibold tracking-tight text-ink">Codessa</span>
        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className="text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            Documentation
          </Link>
          <button
            onClick={loginWithGithub}
            className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink transition hover:border-ink/15 hover:bg-canvas"
          >
            Login with GitHub
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <Suspense fallback={null}>
          <LoginErrorBanner />
        </Suspense>

        <section className="flex max-w-2xl flex-col items-center text-center">
          <span className="mb-4 rounded-md bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            AI Pull Request Review
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Codessa</h1>
          <p className="mt-4 text-lg text-ink-muted">
            AI yang otomatis review pull request GitHub kamu untuk Python, JavaScript, PHP,
            dan Go. Tinggal install, dan setiap PR baru langsung mendapat review.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={loginWithGithub}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-accent/90"
            >
              <svg viewBox="0 0 16 16" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Login with GitHub
            </button>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-6 py-3 text-base font-semibold text-ink shadow-sm transition hover:border-ink/15 hover:bg-canvas"
            >
              Baca dokumentasi
            </Link>
          </div>
        </section>

        <section className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-line bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
