import { createFileRoute } from "@tanstack/react-router";

import { i18n } from "@/lib/i18n";
import { ogImage } from "@/lib/og";

import { getLandingText } from "../-landing-text";

export const Route = createFileRoute("/$lang/og/image.webp")({
  server: {
    handlers: {
      GET: ({ params }) => {
        if (!(i18n.languages as readonly string[]).includes(params.lang)) {
          return new Response(undefined, { status: 404 });
        }
        const { hero } = getLandingText(params.lang);

        return ogImage({
          lang: params.lang,
          title: hero.title,
          // The first sentence; the rest would be cut mid-sentence by the card.
          description: hero.lead.split(/(?<=[。.])\s*/u)[0],
          pills: [
            { label: "AGPL-3.0", accent: true },
            { label: "Docker" },
            { label: "SQLite · PostgreSQL · MySQL" },
          ],
        });
      },
    },
  },
});
