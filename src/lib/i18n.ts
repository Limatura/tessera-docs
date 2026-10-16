import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
  languages: ["en", "ja", "zh-TW", "zh-CN"],
  defaultLanguage: "en",
  // Content lives in content/docs/<lang>/, not index.<lang>.mdx.
  parser: "dir",
});
