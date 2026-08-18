import { defineRouting } from "next-intl/routing";
 
export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "id",
  localePrefix: {
    mode: "always",
    prefixes: {
      // Force both locales to keep their prefix. This avoids a redirect from
      // `/id` → `/` and prevents the root layout from redirecting `/` → `/en`.
      en: "/en",
      id: "/id",
    },
  },
});
