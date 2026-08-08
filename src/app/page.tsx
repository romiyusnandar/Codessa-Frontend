"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginWithGithub } from "@/lib/api";
import { LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "@/components/ThemeToggle";

const languages = ["Python", "JavaScript", "PHP", "Go"];

const steps = [
  {
    n: "01",
    title: "Login dengan GitHub",
    description:
      "Satu klik. Tidak ada password baru — akun kamu terhubung langsung lewat OAuth GitHub.",
  },
  {
    n: "02",
    title: "Install GitHub App",
    description:
      "Pilih akun atau organisasi, lalu tentukan repository mana saja yang boleh diakses Codessa.",
  },
  {
    n: "03",
    title: "Aktifkan repository",
    description:
      "Nyalakan review per repo. Setelah aktif, setiap PR baru langsung masuk antrean review.",
  },
];

const features = [
  {
    title: "Review otomatis tiap PR",
    description:
      "Setiap pull request baru dan setiap commit lanjutan dianalisis otomatis — tanpa trigger manual.",
  },
  {
    title: "Komentar per baris",
    description:
      "Bukan ringkasan umum. Codessa menempel komentar tepat di baris kode yang bermasalah.",
  },
  {
    title: "Severity berjenjang",
    description:
      "Tiap temuan diberi tingkat: info, minor, major, atau critical — supaya kamu tahu mana yang mendesak.",
  },
  {
    title: "History tersimpan",
    description:
      "Semua hasil review terekam rapi dan bisa dibuka lagi kapan pun lewat dashboard.",
  },
  {
    title: "Bahasa output fleksibel",
    description:
      "Atur bahasa penulisan review sesuai tim kamu — Bahasa Indonesia, English, dan lainnya.",
  },
  {
    title: "Empat bahasa pemrograman",
    description:
      "Paham konteks Python, JavaScript, PHP, dan Go — untuk stack backend maupun frontend.",
  },
];

function LoginErrorBanner() {
  const searchParams = useSearchParams();
  const loginError = searchParams.get("login_error");

  if (!loginError) return null;

  return (
    <div className="mx-auto mb-8 w-full max-w-2xl rounded-lg border border-rust/25 bg-rust-soft px-4 py-3 text-sm text-rust">
      Login gagal: {loginError}
    </div>
  );
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

// Faint honeycomb texture echoing the hex clusters in the Codessa logo.
function HexField({ className }: { className?: string }) {
  const R = 26;
  const dx = Math.sqrt(3) * R;
  const dy = 1.5 * R;
  const cols = 7;
  const rows = 6;
  const hex = (cx: number, cy: number) =>
    [90, 150, 210, 270, 330, 30]
      .map((a) => {
        const rad = (a * Math.PI) / 180;
        return `${(cx + R * Math.cos(rad)).toFixed(1)},${(cy + R * Math.sin(rad)).toFixed(1)}`;
      })
      .join(" ");
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(hex(c * dx + (r % 2 ? dx / 2 : 0), r * dy));
    }
  }
  return (
    <svg
      viewBox={`-${R} -${R} ${cols * dx + R} ${rows * dy + R}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      aria-hidden
    >
      {cells.map((pts, i) => (
        <polygon key={i} points={pts} />
      ))}
    </svg>
  );
}

const severities = [
  {
    name: "Info",
    cls: "bg-accent-soft text-accent",
    desc: "Catatan atau saran gaya penulisan — aman untuk diabaikan.",
  },
  {
    name: "Minor",
    cls: "bg-amber-soft text-amber",
    desc: "Masalah kecil yang sebaiknya dirapikan sebelum merge.",
  },
  {
    name: "Major",
    cls: "border border-rust/25 bg-rust-soft text-rust",
    desc: "Bug atau risiko nyata yang perlu perhatian.",
  },
  {
    name: "Critical",
    cls: "bg-rust text-white",
    desc: "Harus dibereskan dulu — misalnya celah keamanan.",
  },
];

function ReviewCard() {
  return (
    <div className="relative animate-fade-up [animation-delay:240ms]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/15 via-accent/5 to-transparent blur-2xl"
      />
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl ring-1 ring-black/5">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-slate-400">
            auth/users.py
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent/25 px-2.5 py-0.5 text-[11px] font-medium text-sky-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Codessa reviewing
          </span>
        </div>

        {/* diff */}
        <div className="relative overflow-hidden font-mono text-[13px] leading-relaxed">
          {/* scan line */}
          <div
            aria-hidden
            className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-accent/25 to-transparent"
          />
          <DiffRow n={12} text="def get_user(user_id):" />
          <DiffRow
            n={13}
            kind="del"
            text={`    q = "SELECT * FROM users WHERE id = " + user_id`}
          />
          <DiffRow
            n={13}
            kind="add"
            text={`    q = "SELECT * FROM users WHERE id = %s"`}
          />
          <DiffRow n={14} kind="del" text="    return db.execute(q)" />
          <DiffRow n={14} kind="add" text="    return db.execute(q, (user_id,))" />
        </div>

        {/* inline review comment */}
        <div className="border-t border-white/10 bg-[#0b0e14] p-4">
          <div className="rounded-lg border border-white/10 bg-white/3 p-4">
            <div className="flex items-center gap-2.5">
              <LogoMark size={24} rounded="rounded-full" />
              <span className="text-sm font-medium text-slate-200">Codessa</span>
              <span className="inline-flex items-center rounded-md bg-rust/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-rust-soft">
                Critical
              </span>
              <span className="ml-auto font-mono text-[11px] text-slate-500">
                baris 13
              </span>
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-slate-300">
              Query dirangkai lewat konkatenasi string — terbuka untuk{" "}
              <span className="font-medium text-slate-100">SQL injection</span>.
              Gunakan parameterized query agar input di-escape aman.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-md bg-moss/15 px-2 py-1 font-medium text-emerald-300">
                Suggested fix diterapkan
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiffRow({
  n,
  text,
  kind,
}: {
  n: number;
  text: string;
  kind?: "add" | "del";
}) {
  const bg =
    kind === "add"
      ? "bg-[#12261e]"
      : kind === "del"
        ? "bg-[#2d1417]"
        : "";
  const marker = kind === "add" ? "+" : kind === "del" ? "-" : " ";
  const markerColor =
    kind === "add"
      ? "text-emerald-400"
      : kind === "del"
        ? "text-rose-400"
        : "text-slate-600";
  const textColor =
    kind === "add"
      ? "text-emerald-100"
      : kind === "del"
        ? "text-rose-200"
        : "text-slate-300";

  return (
    <div className={`flex ${bg}`}>
      <span className="w-10 shrink-0 select-none border-r border-white/5 px-2 py-0.5 text-right text-slate-600">
        {n}
      </span>
      <span className={`w-5 shrink-0 select-none py-0.5 text-center ${markerColor}`}>
        {marker}
      </span>
      <span className={`overflow-x-auto whitespace-pre py-0.5 pr-4 ${textColor}`}>
        {text}
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <span className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink">
            <LogoMark size={28} />
            Codessa
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="text-sm font-medium text-ink-muted transition hover:text-ink"
            >
              Documentation
            </Link>
            <ThemeToggle />
            <button
              onClick={loginWithGithub}
              className="inline-flex items-center gap-2 rounded-md bg-ink px-3.5 py-1.5 text-sm font-medium text-canvas transition hover:bg-ink/90"
            >
              <GithubMark className="h-4 w-4" />
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(60%_50%_at_20%_0%,var(--accent-soft),transparent)]"
          />
          {/* grid texture, faded toward the content */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
              WebkitMaskImage:
                "radial-gradient(95% 85% at 50% 0%, #000 45%, transparent 90%)",
              maskImage:
                "radial-gradient(95% 85% at 50% 0%, #000 45%, transparent 90%)",
            }}
          />
          <HexField className="pointer-events-none absolute -right-16 -top-16 z-0 h-[440px] w-[440px] text-accent/[0.10]" />
          <HexField className="pointer-events-none absolute -bottom-24 -left-20 z-0 h-[320px] w-[320px] text-accent/[0.07]" />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
            <div>
              <Suspense fallback={null}>
                <LoginErrorBanner />
              </Suspense>

              <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                AI Pull Request Review
              </span>

              <h1 className="animate-fade-up mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl [animation-delay:60ms]">
                Reviewer kode yang{" "}
                <span className="text-accent">tak pernah tidur</span>.
              </h1>

              <p className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-ink-muted [animation-delay:120ms]">
                Codessa membaca setiap pull request GitHub kamu dan menempelkan
                komentar review per baris — lengkap dengan tingkat severity. Pasang
                sekali, lalu setiap PR baru langsung mendapat review.
              </p>

              <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3 [animation-delay:180ms]">
                <button
                  onClick={loginWithGithub}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-accent/90"
                >
                  <GithubMark className="h-5 w-5" />
                  Mulai dengan GitHub
                </button>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-6 py-3 text-base font-semibold text-ink shadow-sm transition hover:border-ink/15 hover:bg-canvas"
                >
                  Baca dokumentasi
                </Link>
              </div>

              <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-2 [animation-delay:240ms]">
                <span className="text-xs text-ink-muted">Mengerti:</span>
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <ReviewCard />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-b border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                Cara pakai
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Tiga langkah, lalu lupakan
              </h2>
              <p className="mt-3 text-ink-muted">
                Setup sekali di awal. Setelah itu Codessa bekerja di latar belakang
                setiap kali ada PR.
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
              {steps.map((step) => (
                <li key={step.n} className="bg-surface p-6">
                  <span className="font-mono text-sm font-semibold text-accent">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SEVERITY */}
        <section className="border-b border-line">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                Output
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Setiap temuan diberi bobot
              </h2>
              <p className="mt-3 text-ink-muted">
                Bukan sekadar daftar komentar — tiap catatan ditandai tingkat
                keparahannya, jadi kamu tahu mana yang tinggal dibaca dan mana yang
                wajib dibereskan.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {severities.map((s) => (
                <div key={s.name} className="bg-surface p-6">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${s.cls}`}
                  >
                    {s.name}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-b border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <div className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                Kemampuan
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Review yang benar-benar menempel di kode
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-line bg-surface p-6 shadow-sm transition hover:border-accent/30 hover:shadow-md"
                >
                  <h3 className="font-semibold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="relative overflow-hidden rounded-2xl bg-[#0d1117] px-8 py-14 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(29,99,173,0.45),transparent)]"
              />
              <HexField className="pointer-events-none absolute -bottom-20 -left-16 h-[340px] w-[340px] text-white/[0.06]" />
              <div className="relative mb-5 flex justify-center">
                <LogoMark size={56} rounded="rounded-xl" />
              </div>
              <h2 className="relative text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Biarkan PR berikutnya direview otomatis
              </h2>
              <p className="relative mx-auto mt-3 max-w-md text-slate-300">
                Hubungkan GitHub kamu dan aktifkan repo pertama dalam hitungan menit.
              </p>
              <button
                onClick={loginWithGithub}
                className="relative mt-7 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-[#0d1117] transition hover:bg-slate-100"
              >
                <GithubMark className="h-5 w-5" />
                Login with GitHub
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-ink-muted sm:flex-row">
          <span className="flex items-center gap-2">
            <LogoMark size={22} rounded="rounded" />
            Codessa — AI Pull Request Review
          </span>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="transition hover:text-ink">
              Documentation
            </Link>
            <Link href="/dashboard" className="transition hover:text-ink">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
