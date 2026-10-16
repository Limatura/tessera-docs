import {
  IconArrowDown,
  IconLock,
  IconLockAccess,
  IconRefresh,
  IconShieldCheck,
} from "@tabler/icons-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

import type { LandingText } from "../../-landing-text";
import { Glow } from "../glow";
import { TicketCard } from "../ticket-card";

// In the order of text.features.items.
const ICONS = [IconLock, IconRefresh, IconLockAccess, IconShieldCheck];

// The server's own preview cards, fanned out: a file, a locked share, a note.
const CARDS = [
  { file: "og-photo", place: "left-0 top-6 -rotate-6 z-10" },
  { file: "og-locked", place: "left-1/2 top-0 -translate-x-1/2 rotate-0 z-20" },
  { file: "og-snippet", place: "right-0 top-6 rotate-6 z-10" },
];

const delay = (index: number) =>
  ({ "--delay": `${index * 70}ms` }) as CSSProperties;

export const Features = ({
  shots,
  text,
}: {
  shots: string;
  text: LandingText["features"];
}) => (
  <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
    <Glow className="top-1/4 -left-48" />
    <h2
      className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      data-reveal
    >
      {text.title}
    </h2>

    <div className="mt-12 grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2 lg:row-span-2" data-reveal>
        <article className="flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/3 p-6">
          <h3 className="text-lg font-semibold text-white">
            {text.previews.name}
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-pretty text-stone-400">
            {text.previews.description}
          </p>
          <div className="relative mt-6 h-56 sm:h-72">
            {CARDS.map(({ file, place }, index) => (
              <img
                alt={text.previews.cards[index]}
                className={cn(
                  "absolute w-[62%] rounded-lg border border-white/12 shadow-2xl shadow-black/60 transition-transform duration-300 hover:z-30 hover:-translate-y-2 sm:w-[54%]",
                  place
                )}
                decoding="async"
                height={504}
                key={file}
                loading="lazy"
                src={`/landing/${shots}/${file}.webp`}
                width={960}
              />
            ))}
          </div>
        </article>
      </div>

      <div data-reveal style={delay(1)}>
        <TicketCard
          stub={
            <div
              aria-hidden="true"
              className="flex flex-col items-center gap-2 py-1"
            >
              <span className="font-mono text-sm text-stone-500">
                ozpq-4m7k
              </span>
              <IconArrowDown className="size-4 text-stone-600" />
              {/* The dashed chip is how the server's preview card prints a code. */}
              <span className="border-ember-500/70 text-ember-200 rounded-md border border-dashed px-3 py-1 font-mono text-lg font-semibold tracking-[0.2em]">
                0ZPQ4M7K
              </span>
            </div>
          }
        >
          <h3 className="font-semibold text-white">{text.codes.name}</h3>
          <p className="text-sm leading-relaxed text-pretty text-stone-400">
            {text.codes.description}
          </p>
        </TicketCard>
      </div>

      {text.items.map((item, index) => {
        const Icon = ICONS[index] ?? IconShieldCheck;
        return (
          <div data-reveal key={item.name} style={delay(index + 2)}>
            <TicketCard
              stub={
                <div className="flex items-center gap-3">
                  <span className="bg-ember-500/12 text-ember-300 ring-ember-500/25 inline-flex size-9 items-center justify-center rounded-lg ring-1">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="font-semibold text-white">{item.name}</h3>
                </div>
              }
            >
              <p className="text-sm leading-relaxed text-pretty text-stone-400">
                {item.description}
              </p>
            </TicketCard>
          </div>
        );
      })}
    </div>
  </section>
);
