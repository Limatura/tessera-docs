import { createOpenAPI } from "fumadocs-openapi/server";

// A copy of the contract from the tessera repo. Refresh with:
//   cp ../tessera/openapi.json openapi/tessera.json
// Imported rather than read from disk: on Vercel the function bundle has no
// openapi/ directory, so a runtime readFileSync hits ENOENT in /var/task.
import contract from "../../openapi/tessera.json";

// utoipa uses Rust doc comments as descriptions, `# Errors` headings and all,
// which land as h1 in the middle of the page.
function demoteHeadings(markdown: string) {
  return markdown.replaceAll(/^(?<hashes>#+) /gmu, "###$<hashes> ");
}

// Schemas carry them too, not just operations.
function demoteEveryDescription(node: unknown) {
  if (Array.isArray(node)) {
    for (const item of node) {
      demoteEveryDescription(item);
    }
    return;
  }
  if (node === null || typeof node !== "object") {
    return;
  }

  const record = node as Record<string, unknown>;
  for (const [key, value] of Object.entries(record)) {
    if (key === "description" && typeof value === "string") {
      record[key] = demoteHeadings(value);
    } else {
      demoteEveryDescription(value);
    }
  }
}

function loadContract() {
  const document: unknown = structuredClone(contract);
  demoteEveryDescription(document);
  return document as object;
}

export const openapi = createOpenAPI({
  input: { tessera: loadContract },
});
