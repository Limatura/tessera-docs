import { createFileRoute, redirect } from "@tanstack/react-router";

import { i18n } from "@/lib/i18n";

// Every locale carries its prefix, so bare / has to go somewhere.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/$lang",
      params: { lang: i18n.defaultLanguage },
    });
  },
});
