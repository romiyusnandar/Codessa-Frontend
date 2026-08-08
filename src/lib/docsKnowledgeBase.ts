export interface DocsChunk {
  id: string;
  title: string;
  page: string;
  href: string;
  content: string;
}

// Plain-text mirror of the docs content, used to ground the docs assistant.
// Add a chunk here whenever a new docs page or section is added — this is the
// assistant's only source of truth, so keep it in sync with the actual pages.
export const docsKnowledgeBase: DocsChunk[] = [
  {
    id: "intro-overview",
    title: "Introduction to Codessa",
    page: "Introduction",
    href: "/docs",
    content:
      "Codessa acts as an intelligent layer between your repository and your developers. By automatically analyzing pull requests, it identifies structural flaws, style violations, and potential bugs before a human reviewer even looks at the code.",
  },
  {
    id: "intro-how-it-works",
    title: "How It Works",
    page: "Introduction",
    href: "/docs#how-it-works",
    content:
      "Codessa reviews a pull request in three steps. 1) Push Code: the developer pushes a commit and opens a pull request on GitHub. 2) AI Analysis: Codessa intercepts the webhook and fetches the diff and surrounding context for analysis. 3) Feedback: actionable comments and suggested fixes are posted directly on the pull request. Codessa doesn't just look at line-level syntax — it builds a localized semantic graph of the change to understand how it impacts surrounding files and architectural patterns.",
  },
  {
    id: "quickstart-get-connected",
    title: "Get connected",
    page: "Quickstart Guide",
    href: "/docs/quickstart-guide#setup",
    content:
      "Setting up Codessa takes three steps. 1) Sign in using GitHub: open the Codessa homepage and click Sign up, authorizing access through GitHub OAuth — there is no new password to create. 2) Install the GitHub App: from the dashboard, add a repository and install the Codessa GitHub App, choosing which account or organization and which repositories it can access. 3) Enable AI review on a repository: AI review is off by default for every repository; find the repository in Overview and toggle its status from Disabled to Enabled. Enabling is per repository, so some repositories can be enabled while others stay off. Once enabled, every new pull request on that repository is reviewed automatically.",
  },
  {
    id: "quickstart-config-setup",
    title: "Configuration Setup",
    page: "Quickstart Guide",
    href: "/docs/quickstart-guide#configuration-setup",
    content:
      'After enabling a repository, add a .github/.codessa.yml file to the root of that repository to control how Codessa reviews it. Fields: version is the config schema version, currently "1". auto_review, when true, reviews every new pull request automatically. language sets the language used for review comments — en, id, or zh. tone sets the writing style of review comments — friendly, strict, or concise. review_rules.ignore_paths lists glob patterns for files or folders Codessa should skip, for example "**/*.lock", "node_modules/**", "dist/**", "public/assets/**". analysis_focus turns security, performance, bugs, and code_style checks on or off individually with true or false; when code_style is false the AI will not comment on writing style. severity_threshold controls how strict Codessa is about failing the commit status: critical_only fails the commit status only for critical findings, balanced (the default) shows all severity levels but only fails the commit status for critical findings, and strict shows all severity levels and also fails the commit status for major findings. custom_instructions is free-form extra text for the AI reviewer, for example asking it to always provide a code snippet for every bug found. Changes to .codessa.yml apply to the next pull request reviewed on that repository — nothing is re-reviewed retroactively.',
  },
  {
    id: "config-hierarchy-precedence",
    title: "How precedence works",
    page: "Configuration Hierarchy",
    href: "/docs/configuration-hierarchy#precedence",
    content:
      "A repository's review behavior can come from three places, checked in this order for every individual field: 1) .codessa.yml committed to the repository — any field set here wins, no matter what the dashboard says, since it's the most specific place to configure a repo. 2) Dashboard Settings, set per repository in Codessa — used for any field .codessa.yml leaves out. 3) Built-in defaults shipped with Codessa — used when a field isn't set in .codessa.yml or the dashboard, so every repository always ends up with a complete, working configuration. This lookup happens per field, not per file, so a .codessa.yml that only sets a couple of fields still works — everything else falls through to the dashboard, then to the defaults.",
  },
  {
    id: "config-hierarchy-example",
    title: "Field-by-field example",
    page: "Configuration Hierarchy",
    href: "/docs/configuration-hierarchy#example",
    content:
      'Example of the override rules: if .codessa.yml does not set tone but the dashboard sets it to "strict", the effective tone is "strict" from the dashboard. If .codessa.yml sets severity_threshold to "balanced" and the dashboard sets it to "strict", the effective value is "balanced" from .codessa.yml, because .codessa.yml wins whenever it sets a field. If .codessa.yml sets analysis_focus.security to true and the dashboard sets it to false, the effective value is true, from .codessa.yml. If neither .codessa.yml nor the dashboard set language, the effective value falls back to the built-in default, "en".',
  },
];
