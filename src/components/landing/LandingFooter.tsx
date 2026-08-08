import Link from "next/link";

export function LandingFooter() {
  return (
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
  );
}
