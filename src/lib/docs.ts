import { defineDocs } from "fumadocs-mdx/macro";

// Kept apart from `source`: importing that one client-side drags in node:path
// and breaks hydration.
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
