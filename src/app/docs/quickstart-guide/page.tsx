import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { QuickstartArticle } from "@/components/docs/QuickstartArticle";
import { DocsToc } from "@/components/docs/DocsToc";

const toc = [
  { label: "Get connected", href: "#setup" },
  { label: "Configuration Setup", href: "#configuration-setup" },
];

export default function QuickstartGuidePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-on-surface">
      <LandingHeader />

      <main className="pt-16">
        <div className="mx-auto flex w-full max-w-[1600px]">
          <DocsSidebar activeHref="/docs/quickstart-guide" />
          <QuickstartArticle />
          <DocsToc items={toc} />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
