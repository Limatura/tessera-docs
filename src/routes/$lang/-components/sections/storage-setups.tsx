import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import type { CSSProperties, ReactNode } from "react";

import type { LandingText } from "../../-landing-text";
import { Glow } from "../glow";
import { TicketCard } from "../ticket-card";

type SetupsText = LandingText["setups"];

const Address = ({ children }: { children: ReactNode }) => (
  <code className="text-ember-200 block truncate rounded-md border border-white/10 bg-black/25 px-3 py-2 font-mono text-[12px]">
    {children}
  </code>
);

/**
 * A 40 GB file going into five empty 10 GB buckets. The planner fills
 * backends one after another (storage/split.rs), so four fill and the fifth
 * stays empty. Plays each time the card scrolls into view.
 */
const Split = () => (
  <div aria-hidden="true" className="flex flex-col gap-3">
    <div className="flex items-center justify-between font-mono text-[11px] text-stone-400">
      <span>backup.tar</span>
      <span>40 GB</span>
    </div>
    <div className="flex h-3 gap-1">
      {[0, 1, 2, 3].map((piece) => (
        <span
          className="split-piece bg-ember-500 flex-1 rounded-sm"
          key={piece}
          style={{ "--i": piece } as CSSProperties}
        />
      ))}
    </div>
    <div className="mt-1 grid grid-cols-5 gap-2">
      {[0, 1, 2, 3, 4].map((bucket) => (
        <div className="flex flex-col items-center gap-1" key={bucket}>
          <div className="relative h-14 w-full overflow-hidden rounded-md border border-white/12 bg-black/30">
            {bucket < 4 ? (
              <span
                className="split-fill from-ember-600 to-ember-400 absolute inset-x-0 bottom-0 h-full bg-linear-to-t"
                style={{ "--i": bucket } as CSSProperties}
              />
            ) : null}
          </div>
          <span className="font-mono text-[10px] text-stone-500">10 GB</span>
        </div>
      ))}
    </div>
  </div>
);

const VISUALS = [
  <Address key="folder">data/blobs</Address>,
  <Address key="bucket">s3://bucket</Address>,
  <Split key="split" />,
];

export const StorageSetups = ({
  lang,
  text,
}: {
  lang: string;
  text: SetupsText;
}) => (
  <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
    <Glow className="top-1/4 -left-48" />
    <div
      className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
      data-reveal
    >
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
        {text.title}
      </h2>
      <p className="leading-relaxed text-pretty text-stone-400">{text.lead}</p>
    </div>

    <div className="mt-12 grid gap-4 lg:grid-cols-3">
      {text.tiers.map((tier, index) => (
        <div
          data-reveal
          key={tier.name}
          style={{ "--delay": `${index * 90}ms` } as CSSProperties}
        >
          <TicketCard
            className={index === 2 ? "border-ember-500/30" : undefined}
            stub={
              <div className="flex flex-col gap-4">
                <header className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {tier.name}
                    </h3>
                    <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-xs whitespace-nowrap text-stone-400">
                      {tier.when}
                    </span>
                  </div>
                  <p className="text-sm text-stone-400">{tier.tagline}</p>
                </header>
                {VISUALS[index]}
              </div>
            }
          >
            <ul className="flex flex-col gap-3">
              {tier.points.map((point) => (
                <li
                  className="flex gap-3 text-sm leading-relaxed text-stone-300"
                  key={point}
                >
                  <IconCheck
                    aria-hidden="true"
                    className="text-ember-400 mt-0.5 size-4 shrink-0"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </TicketCard>
        </div>
      ))}
    </div>

    <div className="mt-10 flex justify-center">
      <a
        className="text-ember-300 focus-visible:outline-ember-300 inline-flex items-center gap-1 text-sm font-medium hover:underline focus-visible:outline-2"
        href={`/${lang}/docs/storage`}
      >
        {text.pick}
        <IconArrowRight className="size-4" />
      </a>
    </div>
  </section>
);
