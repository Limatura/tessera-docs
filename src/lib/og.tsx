import type { ReactNode } from "react";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";

import faviconSvg from "../../public/favicon.svg?raw";
import { siteUrl } from "./shared";

// The same icon as the favicon, inlined so the card never drifts from it.
const icon = `data:image/svg+xml;base64,${btoa(faviconSvg)}`;

// Same palette as the cards the server draws (apps/og/tokens.tsx).
const colors = {
  ink: "#1c1917",
  panel: "#241f1c",
  panelBorder: "rgba(250,250,249,0.09)",
  paper: "#faf9f7",
  faded: "#a39a92",
  primary: "#e8622f",
  primaryDark: "#7c2d12",
  primarySoft: "rgba(232,98,47,0.16)",
  primarySoftBorder: "rgba(232,98,47,0.45)",
};

// Inter has no CJK glyphs and takumi ships only Geist, so each locale names
// the Noto face for its own Han variant; Inter stays first for Latin.
const CJK: Record<string, string> = {
  ja: "Noto Sans JP",
  "zh-TW": "Noto Sans TC",
  "zh-CN": "Noto Sans SC",
};

// Kept per locale. A failed fetch is not kept, so the next request retries.
const fontCache = new Map<string, ReturnType<typeof googleFonts>>();

const loadFonts = async (lang: string) => {
  const cjk = CJK[lang];
  let fonts = fontCache.get(lang);
  if (!fonts) {
    fonts = googleFonts([
      { name: "Inter", weight: "400..800" },
      ...(cjk ? [{ name: cjk, weight: "400..800" }] : []),
    ] as Parameters<typeof googleFonts>[0]);
    fontCache.set(lang, fonts);
  }
  try {
    return await fonts;
  } catch {
    fontCache.delete(lang);
    return [];
  }
};

const Wordmark = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <img alt="" height={88} src={icon} width={88} />
    <span
      style={{
        fontSize: 40,
        fontWeight: 800,
        letterSpacing: -1,
        color: colors.paper,
      }}
    >
      Tessera
    </span>
  </div>
);

const Pill = ({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      padding: "9px 18px",
      borderRadius: 999,
      border: `1px solid ${accent ? colors.primarySoftBorder : colors.panelBorder}`,
      background: accent ? colors.primarySoft : colors.panel,
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: 1,
      color: accent ? colors.primary : colors.faded,
    }}
  >
    {children}
  </div>
);

const Card = ({
  title,
  description,
  pills,
}: {
  title: string;
  description?: string;
  pills: { label: string; accent?: boolean }[];
}) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      padding: 64,
      background: colors.ink,
      color: colors.paper,
      fontFamily: "Inter",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -260,
        right: -220,
        width: 760,
        height: 760,
        borderRadius: 760,
        background: `radial-gradient(circle, ${colors.primaryDark} 0%, rgba(124,45,18,0) 70%)`,
        opacity: 0.55,
      }}
    />

    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <Wordmark />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: title.length > 28 ? 60 : 76,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: -1,
            maxWidth: 960,
            lineClamp: 2,
            textWrap: "balance",
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.45,
              color: colors.faded,
              maxWidth: 900,
              lineClamp: 3,
              textWrap: "pretty",
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {pills.map(({ label, accent }) => (
          <Pill accent={accent} key={label}>
            {label}
          </Pill>
        ))}
      </div>
    </div>
  </div>
);

export const ogImage = async ({
  lang,
  title,
  description,
  pills,
}: {
  lang: string;
  title: string;
  description?: string;
  pills: { label: string; accent?: boolean }[];
}) =>
  new ImageResponse(
    <Card description={description} pills={pills} title={title} />,
    {
      width: 1200,
      height: 630,
      format: "webp",
      fonts: await loadFonts(lang),
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );

export const siteHost = new URL(siteUrl).host;
