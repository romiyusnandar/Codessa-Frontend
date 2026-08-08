export interface DocsSearchEntry {
  title: string;
  page: string;
  href: string;
  excerpt: string;
}

// Static search index — one entry per page and per major section heading.
// Add an entry here whenever a new docs page or section is added.
export const docsSearchIndex: DocsSearchEntry[] = [
  {
    title: "Introduction to Codessa",
    page: "Introduction",
    href: "/docs",
    excerpt:
      "Codessa acts as an intelligent layer between your repository and your developers, analyzing pull requests automatically.",
  },
  {
    title: "How It Works",
    page: "Introduction",
    href: "/docs#how-it-works",
    excerpt: "Push code, AI analysis, feedback — the three-step review loop on every pull request.",
  },
  {
    title: "Quickstart Guide",
    page: "Quickstart Guide",
    href: "/docs/quickstart-guide",
    excerpt: "Sign in, install the GitHub App, enable AI review, then add a config file.",
  },
  {
    title: "Get connected",
    page: "Quickstart Guide",
    href: "/docs/quickstart-guide#setup",
    excerpt: "Sign in using GitHub, install the GitHub App, and enable AI review on a repository.",
  },
  {
    title: "Configuration Setup",
    page: "Quickstart Guide",
    href: "/docs/quickstart-guide#configuration-setup",
    excerpt:
      "Add a .github/.codessa.yml file to control tone, severity threshold, and analysis focus.",
  },
  {
    title: "Configuration Hierarchy",
    page: "Configuration Hierarchy",
    href: "/docs/configuration-hierarchy",
    excerpt: "How .codessa.yml, dashboard settings, and built-in defaults override each other.",
  },
  {
    title: "How precedence works",
    page: "Configuration Hierarchy",
    href: "/docs/configuration-hierarchy#precedence",
    excerpt: ".codessa.yml wins when set, then dashboard settings, then built-in defaults.",
  },
  {
    title: "Field-by-field example",
    page: "Configuration Hierarchy",
    href: "/docs/configuration-hierarchy#example",
    excerpt: "A worked example showing which value wins for each individual setting.",
  },
];
