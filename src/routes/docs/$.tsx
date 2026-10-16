import { createFileRoute, redirect } from "@tanstack/react-router";

import { i18n } from "@/lib/i18n";

// Every locale carries its prefix, so bare /docs/... has to go somewhere.
export const Route = createFileRoute("/docs/$")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$lang/docs/$",
      params: { lang: i18n.defaultLanguage, _splat: params._splat ?? "" },
    });
  },
});
