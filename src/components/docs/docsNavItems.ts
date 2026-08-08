export interface DocsNavItem {
  label: string;
  href: string | null;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavItem[];
}

// href: null means the page doesn't exist yet — rendered as a disabled item
// instead of a dead link. Add new sections here as their docs pages are built.
export const docsNav: DocsNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Quickstart Guide", href: "/docs/quickstart-guide" },
      { label: "Configuration Hierarchy", href: "/docs/configuration-hierarchy" },
    ],
  },
];
