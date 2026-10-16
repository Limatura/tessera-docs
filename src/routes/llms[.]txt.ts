import { createFileRoute } from "@tanstack/react-router";
import { llms } from "fumadocs-core/source";

import { i18n } from "@/lib/i18n";
import { source } from "@/lib/source";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      // English only. Three translations of the same thing is noise here.
      GET() {
        return new Response(llms(source).index(i18n.defaultLanguage));
      },
    },
  },
});
