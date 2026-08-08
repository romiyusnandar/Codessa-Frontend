import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { ConfigHierarchyArticle } from "@/components/docs/ConfigHierarchyArticle";
import { DocsToc } from "@/components/docs/DocsToc";

const toc = [
  { label: "How precedence works", href: "#precedence" },
  { label: "Field-by-field example", href: "#example" },
];

export default function ConfigurationHierarchyPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-on-surface">
      <LandingHeader />

      <main className="pt-16">
        <div className="mx-auto flex w-full max-w-[1600px]">
          <DocsSidebar activeHref="/docs/configuration-hierarchy" />
          <ConfigHierarchyArticle />
          <DocsToc items={toc} />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
