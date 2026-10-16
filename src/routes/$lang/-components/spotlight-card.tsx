import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

// A card that lights up under the pointer: a soft glow inside and a brighter
// edge where the cursor is closest (the effect of Magic UI's magic-card,
// without pulling in motion for it). The position goes to CSS variables
// directly, so moving the pointer re-renders nothing. Touch has no hover, so
// there it stays a plain card.
const follow = (event: PointerEvent<HTMLElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--x",
    `${event.clientX - rect.left}px`
  );
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

export const SpotlightCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "group relative transition-transform duration-300 motion-safe:hover:-translate-y-1",
      className
    )}
    onPointerMove={follow}
  >
    {/* The card's chrome reaches past the content instead of padding it, so
        wrapping something in a SpotlightCard does not change its size. */}
    <div className="absolute -inset-2 rounded-2xl border border-white/10 bg-white/3">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgb(217 79 43 / 0.16), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="border-ember-400/70 pointer-events-none absolute -inset-px rounded-[inherit] border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          maskImage:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), black, transparent)",
        }}
      />
    </div>
    <div className="relative flex flex-col gap-5">{children}</div>
  </div>
);
