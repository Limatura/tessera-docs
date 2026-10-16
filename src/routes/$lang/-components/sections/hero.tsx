import {
  IconArrowRight,
  IconBrandDocker,
  IconBrandGithub,
  IconDatabase,
  IconLicense,
  IconLink,
  IconServer2,
} from "@tabler/icons-react";

import { projectRepo } from "@/lib/shared";

import type { LandingText } from "../../-landing-text";
import { FirstRun } from "../first-run";

// Facts, not claims: each one is in the docs or the build's default features.
const FACTS = [
  { icon: IconLicense, label: "AGPL-3.0" },
  { icon: IconBrandDocker, label: "amd64 · arm64" },
  { icon: IconDatabase, label: "SQLite · PostgreSQL · MySQL" },
  { icon: IconServer2, label: "S3 · Azure Blob · GCS" },
];

export const Hero = ({
  lang,
  cta,
  shots,
  text,
}: {
  lang: string;
  cta: string;
  shots: string;
  text: LandingText["hero"];
}) => (
  <section className="relative w-full overflow-hidden">
    <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <h1 className="reveal-now bg-linear-to-b from-white via-stone-100 to-stone-400 bg-clip-text pb-2 text-4xl leading-[1.2] font-semibold tracking-tight text-balance text-transparent sm:text-6xl">
          {text.title}
        </h1>
        <p className="reveal-now mt-6 max-w-xl text-base leading-relaxed text-pretty text-stone-400 [animation-delay:80ms] sm:text-lg">
          {text.lead}
        </p>
        <div className="reveal-now mt-9 flex flex-row flex-wrap items-stretch justify-center gap-3 [animation-delay:160ms] lg:justify-start">
          <a
            className="bg-ember-600 hover:bg-ember-500 focus-visible:outline-ember-300 shadow-ember-600/40 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium text-white shadow-[0_8px_30px_-8px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            href={`/${lang}/docs`}
          >
            {cta}
            <IconArrowRight className="size-4" />
          </a>
          <a
            className="focus-visible:outline-ember-300 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/12 px-5 text-sm text-stone-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
            href={projectRepo}
          >
            <IconBrandGithub className="size-4" />
            GitHub
          </a>
        </div>
        <ul className="reveal-now mt-8 flex flex-wrap justify-center gap-2 [animation-delay:240ms] lg:justify-start">
          {FACTS.map(({ icon: Icon, label }) => (
            <li
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-stone-400"
              key={label}
            >
              <Icon aria-hidden="true" className="size-3.5 text-stone-500" />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="reveal-now relative w-full [animation-delay:200ms]">
        {/* Glass shows what is behind it, so give it something to show. */}
        <div
          aria-hidden="true"
          className="bg-ember-500/30 pointer-events-none absolute -top-8 -right-8 -z-10 size-64 rounded-full blur-[80px]"
        />
        <FirstRun copied={text.copied} copy={text.copy} text={text.terminal} />
      </div>
    </div>

    <Stage shots={shots} text={text} />
  </section>
);

/**
 * The product, as it really looks: the result page in a browser, the share
 * page on a phone, and the card the server draws for a link preview.
 */
const Stage = ({
  shots,
  text,
}: {
  shots: string;
  text: LandingText["hero"];
}) => (
  <div className="relative mx-auto mt-12 w-full max-w-6xl px-4 pb-16 sm:px-6 md:mt-20 md:pb-32">
    <div
      aria-hidden="true"
      className="bg-ember-500/25 pointer-events-none absolute top-1/3 left-1/2 -z-10 h-2/3 w-3/4 -translate-x-1/2 rounded-full blur-[110px]"
    />

    {/* Phones get the phone. */}
    <div className="reveal-now mx-auto w-[62%] max-w-xs [animation-delay:320ms] md:hidden">
      <div className="overflow-hidden rounded-[2rem] border-[6px] border-stone-800 bg-black shadow-2xl ring-1 shadow-black/70 ring-white/10">
        <img
          alt={text.shotPhone}
          className="block h-auto w-full"
          decoding="async"
          height={1266}
          src={`/landing/${shots}/share-mobile.webp`}
          width={585}
        />
      </div>
    </div>

    <div className="reveal-now relative hidden [animation-delay:320ms] md:block md:w-[80%]">
      <div className="overflow-hidden rounded-xl border border-white/12 bg-stone-900 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-stone-500">
            files.example.com
          </span>
        </div>
        <img
          alt={text.shotResult}
          className="block h-auto w-full"
          decoding="async"
          fetchPriority="high"
          height={1000}
          src={`/landing/${shots}/result-wide.webp`}
          width={1600}
        />
      </div>
    </div>

    <figure className="float-slow absolute top-[14%] right-6 hidden w-[21%] md:block">
      <div className="overflow-hidden rounded-[2.2rem] border-[7px] border-stone-800 bg-black shadow-2xl ring-1 shadow-black/70 ring-white/10">
        <img
          alt={text.shotPhone}
          className="block h-auto w-full"
          decoding="async"
          height={1266}
          loading="lazy"
          src={`/landing/${shots}/share-mobile.webp`}
          width={585}
        />
      </div>
    </figure>

    <figure className="float-slower absolute bottom-10 left-0 hidden w-[34%] -rotate-3 lg:block">
      <figcaption className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-stone-900/90 px-2.5 py-1 text-xs text-stone-300">
        <IconLink aria-hidden="true" className="text-ember-400 size-3.5" />
        {text.shotCard}
      </figcaption>
      <img
        alt=""
        className="block h-auto w-full rounded-xl border border-white/12 shadow-2xl shadow-black/70"
        decoding="async"
        height={504}
        loading="lazy"
        src={`/landing/${shots}/og-photo.webp`}
        width={960}
      />
    </figure>
  </div>
);
