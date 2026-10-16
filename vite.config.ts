import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  // Prerendering fetches from the preview server by "localhost", which Node
  // resolves to 127.0.0.1, while the server binds ::1 alone unless told.
  preview: {
    host: "127.0.0.1",
  },
  plugins: [
    fumadocsMdx(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
      // The crawler starts at "/", which only links to the default locale.
      // Seed the others and it follows their sidebars from there.
      pages: [
        { path: "/ja" },
        { path: "/ja/docs" },
        { path: "/zh-TW" },
        { path: "/zh-TW/docs" },
        { path: "/zh-CN" },
        { path: "/zh-CN/docs" },
      ],
    }),
    react(),
    // please see https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro for guides on hosting
    nitro({
      preset: "vercel",
      // With wasm on, nitro resolves shiki/wasm through its "unwasm" export to
      // the raw onig.wasm, whose "env" import nothing provides. Off, it takes
      // the default export, which carries the same binary inlined.
      wasm: false,
      // Bundled, takumi-js resolves its wasm backend and then looks for the
      // .wasm next to the function, where nothing copied it. External, Node
      // loads the native binding, which tracing puts in node_modules.
      traceDeps: ["takumi-js", "@takumi-rs/core"],
    }),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      tslib: "tslib/tslib.es6.js",
    },
  },
});
