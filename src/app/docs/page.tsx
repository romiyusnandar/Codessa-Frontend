"use client";

import Link from "next/link";
import { loginWithGithub } from "@/lib/api";

const nav = [
  { href: "#login", label: "1. Login dengan GitHub" },
  { href: "#install", label: "2. Install GitHub App" },
  { href: "#enable", label: "3. Aktifkan repository" },
  { href: "#reviews", label: "Cara kerja review" },
  { href: "#language", label: "Ubah bahasa review" },
  { href: "#faq", label: "Pertanyaan umum" },
];

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3.5">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink">
          Codessa
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:border-ink/15 hover:bg-canvas hover:text-ink"
        >
          Buka dashboard
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-1 gap-10 px-6 py-10 sm:px-10">
        <nav className="sticky top-10 hidden h-fit w-56 shrink-0 flex-col gap-0.5 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-ink-muted transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <main className="flex min-w-0 flex-1 flex-col gap-14">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Panduan
            </span>
            <h1 className="mt-1 text-2xl font-semibold text-ink">Cara pakai Codessa</h1>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">
              Codessa mereview pull request GitHub kamu secara otomatis pakai AI. Ada tiga
              langkah untuk mulai: login, install GitHub App, lalu aktifkan repository yang
              mau direview.
            </p>
          </div>

          <section id="login" className="scroll-mt-10">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Langkah 1
            </span>
            <h2 className="mt-1 text-lg font-semibold text-ink">Login dengan GitHub</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Buka halaman utama Codessa dan klik <strong className="text-ink">Login with GitHub</strong>.
              Kamu akan diarahkan ke GitHub untuk menyetujui akses akun, lalu dibawa kembali
              ke dashboard. Tidak ada password baru yang perlu dibuat — akun kamu terhubung
              langsung lewat GitHub.
            </p>
            <button
              onClick={loginWithGithub}
              className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              Login with GitHub
            </button>
          </section>

          <section id="install" className="scroll-mt-10">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Langkah 2
            </span>
            <h2 className="mt-1 text-lg font-semibold text-ink">Install GitHub App</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Setelah login, buka menu <strong className="text-ink">Overview</strong> di
              dashboard lalu klik <strong className="text-ink">+ Add repository</strong>.
              Kalau ini pertama kalinya kamu memakai Codessa, akan muncul tombol{" "}
              <strong className="text-ink">Install GitHub App</strong> — klik itu untuk
              memilih akun atau organisasi, dan repository mana saja yang boleh diakses
              Codessa.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Kamu bisa pilih semua repository atau cuma sebagian. Daftar ini bisa diubah
              kapan saja lewat pengaturan GitHub App di akun kamu.
            </p>
          </section>

          <section id="enable" className="scroll-mt-10">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Langkah 3
            </span>
            <h2 className="mt-1 text-lg font-semibold text-ink">Aktifkan repository</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Install GitHub App saja belum membuat review berjalan — repository harus
              diaktifkan dulu satu per satu. Di modal <strong className="text-ink">Add
              repository</strong>, cari nama repo-nya lalu klik tombol status di
              sampingnya sampai berubah jadi <strong className="text-ink">Enabled</strong>.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Repository yang aktif akan langsung muncul sebagai kartu di halaman Overview.
              Mau berhenti direview? Klik <strong className="text-ink">Disable</strong> di
              kartu repo tersebut kapan saja.
            </p>
          </section>

          <section id="reviews" className="scroll-mt-10">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Setelah aktif
            </span>
            <h2 className="mt-1 text-lg font-semibold text-ink">Cara kerja review</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Begitu repository aktif, setiap pull request baru atau update commit di PR
              yang sudah ada otomatis memicu review — tidak ada tombol atau perintah yang
              perlu dijalankan manual. Hasilnya bisa dilihat di menu{" "}
              <strong className="text-ink">History</strong>: status (berhasil, gagal,
              masih berjalan), ringkasan perubahan, dan komentar per baris kode lengkap
              dengan tingkat keparahannya (info, minor, major, critical).
            </p>
          </section>

          <section id="language" className="scroll-mt-10">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              Personalisasi
            </span>
            <h2 className="mt-1 text-lg font-semibold text-ink">Ubah bahasa review</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Secara default Codessa menulis hasil review dalam bahasa yang sudah diatur
              di akun kamu. Untuk menggantinya, buka menu{" "}
              <strong className="text-ink">Settings</strong>, pilih bahasa di dropdown{" "}
              <strong className="text-ink">Review output language</strong> (misalnya Bahasa
              Indonesia atau English), lalu klik <strong className="text-ink">Save</strong>.
              Perubahan berlaku untuk review berikutnya.
            </p>
          </section>

          <section id="faq" className="scroll-mt-10">
            <h2 className="text-lg font-semibold text-ink">Pertanyaan umum</h2>
            <div className="mt-4 flex flex-col gap-4">
              {[
                {
                  q: "Apakah Codessa mendukung repository private?",
                  a: "Bisa, selama repository itu dipilih saat instalasi GitHub App dan diaktifkan di Overview.",
                },
                {
                  q: "Bahasa pemrograman apa saja yang didukung?",
                  a: "Python, JavaScript, PHP, dan Go. Bahasa yang bisa diganti di Settings itu bahasa penulisan hasil review (misalnya Bahasa Indonesia atau English), bukan bahasa kode yang direview.",
                },
                {
                  q: "GitHub access saya kok muncul peringatan “Needs reauthorization”?",
                  a: "Itu artinya izin akses GitHub kamu kedaluwarsa atau dicabut. Klik “Login again” di banner yang muncul, atau ulangi langkah Login dengan GitHub.",
                },
                {
                  q: "Bagaimana cara berhenti direview untuk repo tertentu?",
                  a: "Buka Overview, cari kartu repo-nya, lalu klik Disable. Repo langsung berhenti direview tanpa perlu uninstall GitHub App.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-lg border border-line bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-ink">{item.q}</p>
                  <p className="mt-1 text-sm text-ink-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
