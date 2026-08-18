import { DocsPageShell } from "@/components/docs/DocsPageShell";
import { DocsArticle } from "@/components/docs/DocsArticle";

const toc = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Supported languages", href: "#languages" },
];

export default function DocsPage() {
  return (
    <DocsPageShell toc={toc}>
      <DocsArticle />
    </DocsPageShell>
  );
}
