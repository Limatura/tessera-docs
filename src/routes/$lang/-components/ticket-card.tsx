import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

// A card cut like the ticket in the logo: a stub on top, a perforation with a
// notch bitten out of each edge, and the body below. A soft ember light follows
// the pointer while it is over the card.
// Where the pointer is, for the light that follows it.
const track = (event: PointerEvent<HTMLElement>) => {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - box.top}px`);
};

export const TicketCard = ({
  stub,
  children,
  className,
}: {
  stub: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <article
    className={cn(
      "group bg-panel/50 relative flex h-full flex-col rounded-xl border border-white/10 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/20",
      className
    )}
    onPointerMove={track}
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 [background:radial-gradient(260px_circle_at_var(--x,50%)_var(--y,0%),rgb(242_119_74/0.13),transparent_70%)] group-hover:opacity-100"
    />
    <div className="relative p-6 pb-5">{stub}</div>
    <div
      aria-hidden="true"
      className="relative border-t border-dashed border-white/12"
    >
      <span className="bg-ink absolute -top-2 -left-[9px] size-4 rounded-full border border-white/10 [clip-path:inset(0_0_0_50%)]" />
      <span className="bg-ink absolute -top-2 -right-[9px] size-4 rounded-full border border-white/10 [clip-path:inset(0_50%_0_0)]" />
    </div>
    <div className="relative flex flex-1 flex-col gap-2 p-6 pt-5">
      {children}
    </div>
  </article>
);
