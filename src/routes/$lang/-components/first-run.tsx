import { IconCheck, IconCopy, IconPlayerPlay } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

import type { LandingText } from "../-landing-text";

const COMMAND =
  "docker run -p 12923:12923 -v tessera-data:/data ghcr.io/limatura/tessera:latest";
const COMMAND_LINES = [
  "docker run -p 12923:12923 \\",
  "  -v tessera-data:/data \\",
  "  ghcr.io/limatura/tessera:latest",
];

/** Each wrapped line, and where its characters start in COMMAND. */
const WRAPPED = COMMAND_LINES.map((line, index) => {
  const flat = line.replace(" \\", " ").trimStart();
  const start = COMMAND_LINES.slice(0, index).reduce(
    (sum, earlier) => sum + earlier.replace(" \\", " ").trimStart().length,
    0
  );
  return {
    flat,
    indent: line.length - line.trimStart().length,
    start,
    more: line.endsWith("\\"),
  };
});

interface Log {
  level: "INFO" | "WARN";
  message: string;
  fields: [string, string][];
}

// The lines of a real first start (it logs JSON) from the generated password
// on, with the timestamp and target fields left out and long values cut.
// What comes before is routine and not what a reader needs.
const LOGS: Log[] = [
  {
    level: "WARN",
    message:
      "created the first administrator with a generated password; sign in and change it",
    fields: [
      ["username", "admin"],
      ["password", "d8558ce68d08…"],
    ],
  },
  {
    level: "INFO",
    message: "listening",
    fields: [["address", "0.0.0.0:12923"]],
  },
];

const TYPE_MS = 22;
const LINE_MS = 320;

export const FirstRun = ({
  text,
  copy,
  copied,
}: {
  text: LandingText["hero"]["terminal"];
  copy: string;
  copied: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // How far the run has got: characters of the command typed, then log lines.
  const [typed, setTyped] = useState(COMMAND.length);
  const [lines, setLines] = useState(LOGS.length + 1);
  // Set by the effect, so the replay button can start the run again.
  const replay = useRef<(() => void) | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let timers: number[] = [];
    const start = () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
      timers = [];
      setTyped(0);
      setLines(0);
      for (let index = 1; index <= COMMAND.length; index += 1) {
        timers.push(
          window.setTimeout(() => setTyped(index), 400 + index * TYPE_MS)
        );
      }
      const typedAt = 400 + COMMAND.length * TYPE_MS + 350;
      for (let index = 1; index <= LOGS.length + 1; index += 1) {
        timers.push(
          window.setTimeout(() => setLines(index), typedAt + index * LINE_MS)
        );
      }
    };
    replay.current = start;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
    } catch {
      // Insecure context or permission denied: leave the button as it was.
      return;
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  // The command, wrapped where a shell would accept a line break.
  const shown = WRAPPED.map(({ flat, indent, start, more }) => {
    const take = Math.max(0, Math.min(flat.length, typed - start));
    return {
      text: " ".repeat(indent) + flat.slice(0, take).trimEnd(),
      full: take >= flat.length,
      more,
    };
  });

  return (
    <div
      className="overflow-hidden rounded-xl border border-white/15 bg-linear-to-b from-stone-950/35 to-black/40 text-left shadow-2xl ring-1 shadow-black/50 ring-white/5 backdrop-blur-2xl backdrop-saturate-150 ring-inset"
      ref={ref}
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/3 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="font-mono text-[11px] text-stone-500">
          {text.caption}
        </span>
        <span className="ms-auto flex items-center gap-1">
          <button
            aria-label={text.replay}
            className="focus-visible:outline-ember-300 inline-flex size-7 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2"
            onClick={() => replay.current?.()}
            type="button"
          >
            <IconPlayerPlay className="size-3.5" />
          </button>
          <button
            aria-label={done ? copied : copy}
            className="focus-visible:outline-ember-300 inline-flex size-7 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2"
            onClick={copyCommand}
            type="button"
          >
            {done ? (
              <IconCheck className="text-ember-300 size-3.5" />
            ) : (
              <IconCopy className="size-3.5" />
            )}
            <output className="sr-only">{done ? copied : ""}</output>
          </button>
        </span>
      </div>

      <div className="min-h-[14rem] space-y-1 p-4 font-mono text-[11.5px] leading-relaxed sm:text-xs">
        <p className="sr-only">{COMMAND}</p>
        <div aria-hidden="true">
          {shown.map((line, index) => (
            <div className="whitespace-pre text-stone-200" key={index}>
              {index === 0 ? <span className="text-ember-400">$ </span> : "  "}
              {line.text}
              {line.full && line.more ? (
                <span className="text-stone-500"> \</span>
              ) : null}
              {!line.full && (index === 0 || shown[index - 1]?.full) ? (
                <span className="bg-ember-300 ms-px inline-block h-3.5 w-1.5 animate-pulse align-middle" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="space-y-1 pt-2">
          {LOGS.slice(0, lines).map((log) => (
            <LogLine key={log.message} log={log} />
          ))}
          {lines > LOGS.length ? (
            <p className="text-ember-200 pt-2 break-words whitespace-normal">
              <span className="text-stone-500"># </span>
              {text.done}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const LogLine = ({ log }: { log: Log }) => {
  const warn = log.level === "WARN";
  return (
    <p
      className={cn(
        "animate-[landing-line_0.35s_ease-out] break-words whitespace-normal text-stone-400",
        warn && "bg-ember-500/10 -mx-2 rounded px-2 py-1"
      )}
    >
      <span className="text-stone-600">{"{"}</span>
      <Key name="level" />
      <span className={warn ? "text-ember-300" : "text-sky-300/80"}>
        "{log.level}"
      </span>
      <span className="text-stone-600">,</span>
      <Key name="message" />
      <span className="text-stone-200">"{log.message}"</span>
      {log.fields.map(([key, value]) => (
        <span key={key}>
          <span className="text-stone-600">,</span>
          <Key name={key} />
          <span
            className={
              key === "password"
                ? "text-ember-200 font-semibold"
                : "text-emerald-300/80"
            }
          >
            "{value}"
          </span>
        </span>
      ))}
      <span className="text-stone-600">{"}"}</span>
    </p>
  );
};

const Key = ({ name }: { name: string }) => (
  <>
    <span className="text-stone-500">"{name}"</span>
    <span className="text-stone-600">:</span>
  </>
);
