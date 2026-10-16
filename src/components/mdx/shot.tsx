import { useParams } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { shotLocale } from "@/routes/$lang/-landing-text";

// The same screenshots the landing page uses, in public/landing/<locale>/.
export type ShotName =
  | "home"
  | "result"
  | "share"
  | "share-mobile"
  | "admin"
  | "og-photo"
  | "og-locked"
  | "og-snippet";

const useShotLocale = () => {
  const { lang } = useParams({ strict: false }) as { lang?: string };
  return shotLocale[lang ?? "en"] ?? "en";
};

/** One screenshot of the real app, with an optional caption underneath. */
export const Shot = ({
  name,
  alt,
  children,
}: {
  name: ShotName;
  alt: string;
  children?: ReactNode;
}) => {
  const locale = useShotLocale();

  return (
    <figure className="my-6">
      <img
        alt={alt}
        className="border-fd-border h-auto w-full rounded-xl border bg-black/40 shadow-lg"
        decoding="async"
        loading="lazy"
        src={`/landing/${locale}/${name}.webp`}
      />
      {children ? (
        <figcaption className="text-fd-muted-foreground mt-2 text-center text-sm">
          {children}
        </figcaption>
      ) : null}
    </figure>
  );
};

/** Screenshots side by side on a wide screen, stacked on a narrow one. */
export const Shots = ({ children }: { children: ReactNode }) => (
  <div className="my-6 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 [&_figure]:my-0">
    {children}
  </div>
);
