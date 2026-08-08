import { DocsPageShell } from "@/components/docs/DocsPageShell";
import { QuickstartArticle } from "@/components/docs/QuickstartArticle";

const toc = [
  { label: "Get connected", href: "#setup" },
  { label: "Configuration Setup", href: "#configuration-setup" },
];

export default function QuickstartGuidePage() {
  return (
    <DocsPageShell toc={toc}>
      <QuickstartArticle />
    </DocsPageShell>
  );
}
