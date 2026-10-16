import { createGetUrl } from "fumadocs-core/source";

import { i18n } from "./i18n";

export const appName = "tessera";
export const siteUrl = "https://4000--main--tessera--only.coder.sao-x.com";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";

// The product itself, for the GitHub links in the header and footer.
export const projectRepo = "https://github.com/Limatura/tessera";

// Where the "edit this page" links point.
export const gitConfig = {
  user: "Limatura",
  repo: "tessera-docs",
  branch: "main",
};

export function encodeMarkdownUrl(slugs: string[], locale?: string) {
  const segments = [...slugs];
  if (segments.length === 0) {
    segments.push("index.md");
  } else {
    segments[segments.length - 1] += ".md";
  }

  return `/${[locale, ...docsRoute.split("/"), ...segments]
    .filter(Boolean)
    .join("/")}`;
}

/** @returns page slugs */
export function decodeMarkdownUrl(segments: string[]) {
  if (segments.length === 0) {
    return [];
  }

  const out = [...segments];
  out[out.length - 1] = (out.at(-1) ?? "").replace(/\.md$/u, "");
  if (out.length === 1 && out[0] === "index") {
    out.pop();
  }
  return out;
}

/** An absolute URL on this site, for canonical, hreflang, og:image and the sitemap. */
export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "image.webp"];

  return { segments, url: getImageUrl(segments, page.locale) };
}

/** The landing page's card, one per locale. */
export const getHomeImageUrl = (lang: string) => `/${lang}/og/image.webp`;

/** canonical + hreflang for the landing page; the content is the same in every locale. */
export const homeLinks = (lang: string) => [
  { rel: "canonical", href: absoluteUrl(`/${lang}`) },
  ...i18n.languages.map((language) => ({
    rel: "alternate",
    hrefLang: language,
    href: absoluteUrl(`/${language}`),
  })),
  {
    rel: "alternate",
    hrefLang: "x-default",
    href: absoluteUrl(`/${i18n.defaultLanguage}`),
  },
];

// Open Graph wants language_TERRITORY, which the route's lang is not.
export const ogLocales: Record<string, string> = {
  en: "en_US",
  ja: "ja_JP",
  "zh-TW": "zh_TW",
  "zh-CN": "zh_CN",
};
