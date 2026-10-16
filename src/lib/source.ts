import { loader, update } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

import { docs } from "./docs";
import { i18n } from "./i18n";
import { openapi } from "./openapi";
import { docsRoute } from "./shared";

const apiPages = update(
  await openapi.staticSource({
    baseDir: "api/(generated)",
    // Every operation has a tag; without this the sidebar is 18 flat entries.
    // `separator` keeps generated pages flat under one meta.json (---Tag---
    // headings) instead of nesting a meta.json per tag folder.
    groupBy: "tag",
    meta: { folderStyle: "separator" },
  })
)
  // The description is raw markdown, and the title area and nav cards print it
  // as plain text. The operation card renders it properly anyway.
  .page((page) => ({
    ...page,
    data: { ...page.data, description: undefined },
  }))
  .build();

// Server only — `openapi` reaches node:fs and node:path.
export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: apiPages,
  },
  {
    baseUrl: docsRoute,
    i18n,
    plugins: [lucideIconsPlugin(), openapi.loaderPlugin()],
  }
);

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  if (page.type === "openapi") {
    // Not the whole schema: llms-full.txt concatenates every page, and that
    // would be the same 60 KB once per endpoint.
    const endpoints = page.data
      .getOpenAPIPageProps()
      .operations?.map(
        (operation) => `${operation.method.toUpperCase()} ${operation.path}`
      )
      .join("\n");
    const body = page.data.structuredData.contents
      .map((entry) => entry.content)
      .join("\n\n");

    return [`# ${page.data.title} (${page.url})`, endpoints, body]
      .filter(Boolean)
      .join("\n\n");
  }

  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
