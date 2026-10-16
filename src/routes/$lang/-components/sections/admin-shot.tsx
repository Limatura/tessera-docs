import { IconArrowRight } from "@tabler/icons-react";

import type { LandingText } from "../../-landing-text";
import { Glow } from "../glow";
import { Screenshot } from "../screenshot";

// The dashboard of a demo instance: a handful of shares and a month of
// daily snapshots, so the chart has something to draw.
export const AdminShot = ({
  lang,
  shots,
  text,
}: {
  lang: string;
  shots: string;
  text: LandingText["admin"];
}) => (
  <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
    <Glow className="top-1/3 -right-48" />
    <div
      data-reveal
      className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
        {text.title}
      </h2>
      <p className="leading-relaxed text-pretty text-stone-400">{text.lead}</p>
      <a
        className="text-ember-300 focus-visible:outline-ember-300 inline-flex items-center gap-1 text-sm font-medium hover:underline focus-visible:outline-2"
        href={`/${lang}/docs/administration`}
      >
        {text.link}
        <IconArrowRight className="size-4" />
      </a>
    </div>
    <div className="mt-12" data-reveal>
      <Screenshot
        alt={text.shot}
        height={1200}
        src={`/landing/${shots}/admin.webp`}
        width={1920}
      />
    </div>
  </section>
);
