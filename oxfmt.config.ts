import ultracite from "ultracite/oxfmt";

// No defineConfig: the config is plain data either way.
export default {
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    // A copy of the main repository's generated contract. Refresh it from
    // there rather than reformatting it here.
    "openapi/**",
    // Articles. Reflowing Callout bodies, padding tables and splitting the
    // objects inside JSX props scrambles the layout as written.
    "content/**",
    ".claude/**",
  ],
};
