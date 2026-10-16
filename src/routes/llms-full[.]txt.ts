import { createFileRoute } from "@tanstack/react-router";

import { i18n } from "@/lib/i18n";
import { source, getLLMText } from "@/lib/source";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      // English only, same as llms.txt.
      GET: async () => {
        const scan = source.getPages(i18n.defaultLanguage).map(getLLMText);
        const scanned = await Promise.all(scan);
        return new Response(scanned.join("\n\n"));
      },
    },
  },
});
