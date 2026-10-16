import type { CSSProperties } from "react";

import type { LandingText } from "../../-landing-text";
import { Screenshot } from "../screenshot";

// The upload page, the result, and the page the recipient opens, in order.
const SHOTS = ["home", "result", "share"];

export const ShareFlow = ({
  shots,
  text,
}: {
  shots: string;
  text: LandingText["flow"];
}) => (
  <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
    <h2
      data-reveal
      className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl"
    >
      {text.title}
    </h2>
    <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
      {text.steps.map((step, index) => (
        <li
          className="flex flex-col gap-5"
          data-reveal
          key={step.title}
          style={{ "--delay": `${index * 90}ms` } as CSSProperties}
        >
          <Screenshot
            alt={step.shot}
            height={930}
            src={`/landing/${shots}/${SHOTS[index]}.webp`}
            width={960}
          />
          <div className="flex flex-col gap-2">
            <h3 className="flex items-baseline gap-2 text-lg font-semibold text-white">
              <span className="text-ember-400 font-mono text-sm">
                {index + 1}
              </span>
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-pretty text-stone-400">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);
