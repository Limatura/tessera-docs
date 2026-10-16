import {
  IconArrowRight,
  IconBrandGithub,
  IconCheck,
  IconCopy,
} from "@tabler/icons-react";
import type { CSSProperties } from "react";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { i18n } from "@/lib/i18n";
import { appName, projectRepo } from "@/lib/shared";

import type { LandingText } from "../../-landing-text";
import { TicketCard } from "../ticket-card";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  ja: "日本語",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
};

export const ApiNote = ({
  lang,
  text,
  link,
}: {
  lang: string;
  text: LandingText["api"];
  link: string;
}) => (
  <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
    <div className="flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-white/3 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-semibold text-white">{text.title}</h2>
        <p className="text-sm leading-relaxed text-pretty text-stone-400">
          {text.lead}
        </p>
      </div>
      <a
        className="text-ember-300 focus-visible:outline-ember-300 inline-flex shrink-0 items-center gap-1 text-sm font-medium hover:underline focus-visible:outline-2"
        href={`/${lang}/docs/api`}
      >
        {link}
        <IconArrowRight className="size-4" />
      </a>
    </div>
  </section>
);

// What each step runs, wrapped the way a shell accepts it. Copying joins the
// lines back into one. The first start logs JSON, hence the grep.
const STEP_COMMANDS = [
  [
    "docker run -d --name tessera \\",
    "  -p 12923:12923 -v tessera-data:/data \\",
    "  ghcr.io/limatura/tessera:latest",
  ],
  ["docker logs tessera 2>&1 \\", "  | grep password"],
  ["http://localhost:12923"],
];

export const Closing = ({
  lang,
  text,
  cta,
  links,
  copy,
  copied,
}: {
  lang: string;
  text: LandingText["closing"];
  cta: string;
  links: LandingText["footer"]["links"];
  copy: string;
  copied: string;
}) => {
  const next = [
    { href: `/${lang}/docs/reverse-proxy`, label: links.proxy },
    { href: `/${lang}/docs/storage`, label: links.storage },
    { href: `/${lang}/docs/configuration`, label: links.configuration },
  ];

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div
        aria-hidden="true"
        className="bg-ember-500/15 pointer-events-none absolute top-1/3 left-1/2 -z-10 h-72 w-3xl max-w-[90vw] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <div
        className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        data-reveal
      >
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {text.title}
        </h2>
        <p className="text-pretty text-stone-400">{text.lead}</p>
      </div>

      <ol className="mt-12 grid gap-4 lg:grid-cols-3">
        {text.steps.map((step, index) => (
          <li
            data-reveal
            key={step.title}
            style={{ "--delay": `${index * 90}ms` } as CSSProperties}
          >
            <TicketCard
              stub={
                <div className="flex items-center gap-3">
                  <span className="bg-ember-600 inline-flex size-8 items-center justify-center rounded-full font-mono text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
              }
            >
              <p className="text-sm leading-relaxed text-pretty text-stone-400">
                {step.body}
              </p>
              <CommandChip
                copied={copied}
                copy={copy}
                lines={STEP_COMMANDS[index] ?? []}
              />
            </TicketCard>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-center gap-5" data-reveal>
        <a
          className="bg-ember-600 hover:bg-ember-500 focus-visible:outline-ember-300 shadow-ember-600/40 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium text-white shadow-[0_8px_30px_-8px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          href={`/${lang}/docs`}
        >
          {cta}
          <IconArrowRight className="size-4" />
        </a>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-stone-500">{text.next}</span>
          {next.map((link) => (
            <a
              className="hover:border-ember-500/50 rounded-full border border-white/10 px-3 py-1 text-stone-300 transition-colors hover:text-white"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const CommandChip = ({
  lines,
  copy: copyLabel,
  copied,
}: {
  lines: string[];
  copy: string;
  copied: string;
}) => {
  const [done, setDone] = useState(false);
  const isUrl = lines[0]?.startsWith("http") ?? false;
  const command = lines
    .map((line) => line.replace(/\s*\\$/u, "").trim())
    .join(" ");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      // Insecure context or permission denied: leave the button as it was.
      return;
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className="mt-auto flex items-start gap-2 rounded-md border border-white/10 bg-black/30 py-1.5 pr-1 pl-3 font-mono text-[11.5px] leading-relaxed text-stone-300">
      <pre className="min-w-0 flex-1 overflow-x-auto py-1">
        {lines.map((line, index) => (
          <span className="block" key={line}>
            {index === 0 && !isUrl ? (
              <span className="text-ember-400">$ </span>
            ) : null}
            {line}
          </span>
        ))}
      </pre>
      <button
        aria-label={done ? copied : copyLabel}
        className="focus-visible:outline-ember-300 inline-flex size-7 shrink-0 items-center justify-center rounded text-stone-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2"
        onClick={copy}
        type="button"
      >
        {done ? (
          <IconCheck className="text-ember-300 size-3.5" />
        ) : (
          <IconCopy className="size-3.5" />
        )}
        <output className="sr-only">{done ? copied : ""}</output>
      </button>
    </div>
  );
};

export const Footer = ({
  lang,
  text,
}: {
  lang: string;
  text: LandingText["footer"];
}) => {
  const docs = (slug: string) => `/${lang}/docs${slug ? `/${slug}` : ""}`;
  const groups = [
    {
      title: text.groups.start,
      links: [
        { href: docs(""), label: text.links.start },
        { href: docs("shares"), label: text.links.shares },
        { href: docs("storage"), label: text.links.storage },
        { href: docs("reverse-proxy"), label: text.links.proxy },
      ],
    },
    {
      title: text.groups.reference,
      links: [
        { href: docs("configuration"), label: text.links.configuration },
        { href: docs("api"), label: text.links.api },
        { href: docs("your-data"), label: text.links.data },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <a
            className="flex w-fit items-center gap-2 font-semibold text-white"
            href={`/${lang}`}
          >
            <Logo className="size-6" />
            {appName}
          </a>
          <p className="text-dim text-sm">{text.tagline}</p>
          <a
            aria-label="GitHub"
            className="text-dim mt-1 w-fit transition-colors hover:text-white"
            href={projectRepo}
          >
            <IconBrandGithub className="size-5" />
          </a>
        </div>
        {groups.map((group) => (
          <nav
            aria-label={group.title}
            className="flex flex-col gap-3"
            key={group.title}
          >
            <span className="text-sm font-medium text-stone-200">
              {group.title}
            </span>
            {group.links.map((link) => (
              <a
                className="text-dim w-fit text-sm transition-colors hover:text-white"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ))}
        <nav aria-label={text.language} className="flex flex-col gap-3">
          {i18n.languages.map((language) => (
            <a
              aria-current={language === lang ? "page" : undefined}
              className="aria-[current=page]:text-ember-300 text-dim w-fit text-sm transition-colors hover:text-white"
              href={`/${language}`}
              hrefLang={language}
              key={language}
              lang={language}
            >
              {LANGUAGE_NAMES[language] ?? language}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
