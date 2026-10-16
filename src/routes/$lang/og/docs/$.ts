import { createFileRoute } from "@tanstack/react-router";

import { ogImage, siteHost } from "@/lib/og";
import { source } from "@/lib/source";

export const Route = createFileRoute("/$lang/og/docs/$")({
  server: {
    handlers: {
      GET: ({ params }) => {
        // The last segment is the image.webp the URL ends in.
        const slugs = (params._splat?.split("/") ?? [])
          .filter((segment) => segment.length > 0)
          .slice(0, -1);
        const page = source.getPage(slugs, params.lang);
        if (!page) {
          return new Response(undefined, { status: 404 });
        }

        return ogImage({
          lang: params.lang,
          title: page.data.title ?? "tessera",
          description: page.data.description,
          pills: [{ label: "DOCS", accent: true }, { label: siteHost }],
        });
      },
    },
  },
});
