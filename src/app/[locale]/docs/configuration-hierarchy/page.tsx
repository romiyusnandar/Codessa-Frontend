import { DocsPageShell } from "@/components/docs/DocsPageShell";
import { ConfigHierarchyArticle } from "@/components/docs/ConfigHierarchyArticle";

const toc = [
  { label: "How precedence works", href: "#precedence" },
  { label: "Field-by-field example", href: "#example" },
];

export default function ConfigurationHierarchyPage() {
  return (
    <DocsPageShell toc={toc}>
      <ConfigHierarchyArticle />
    </DocsPageShell>
  );
}
