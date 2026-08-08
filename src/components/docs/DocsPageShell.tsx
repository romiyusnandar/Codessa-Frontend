import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { DocsNav } from "@/components/docs/DocsNav";
import { DocsToc, type DocsTocItem } from "@/components/docs/DocsToc";

// Shared shell for every /docs page: header, responsive nav (sidebar on
// desktop, drawer on mobile), article content, "on this page" toc, footer.
export function DocsPageShell({
  toc,
  children,
}: {
  toc: DocsTocItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-on-surface">
      <LandingHeader />

      <main className="pt-16">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col md:flex-row">
          <DocsNav />
          {children}
          <DocsToc items={toc} />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
