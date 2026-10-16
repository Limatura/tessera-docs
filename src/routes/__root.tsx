import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import * as React from "react";

import { i18n } from "@/lib/i18n";
import { translations } from "@/lib/translations";

import appCss from "@/styles/app.css?url";

type Language = (typeof i18n.languages)[number];

function isLanguage(value: string): value is Language {
  return (i18n.languages as readonly string[]).includes(value);
}

const RootComponent = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segment = pathname.split("/")[1] ?? "";
  const lang = isLanguage(segment) ? segment : i18n.defaultLanguage;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={i18nProvider(translations, lang)}>
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "tessera docs",
      },
      { property: "og:site_name", content: "tessera" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootComponent,
});
