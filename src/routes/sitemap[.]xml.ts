import { createFileRoute } from "@tanstack/react-router";

import { i18n } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET() {
        const paths = [
          ...i18n.languages.map((lang) => `/${lang}`),
          ...source.getPages().map((page) => page.url),
        ];
        const urls = paths
          .map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`)
          .join("\n");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
          { headers: { "Content-Type": "application/xml" } }
        );
      },
    },
  },
});
