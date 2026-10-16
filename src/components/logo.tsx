import { useId } from "react";

import { cn } from "@/lib/cn";

// The ticket from the repo's logo.svg. The torn-off stub follows the primary
// colour, and the face swaps with the theme, so it needs no backing tile.
export const Logo = ({ className }: { className?: string }) => {
  const clipId = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn("size-6", className)}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M92 160 H420 A28 28 0 0 1 448 188 V222 A34 34 0 0 0 448 290 V324 A28 28 0 0 1 420 352 H92 A28 28 0 0 1 64 324 V290 A34 34 0 0 0 64 222 V188 A28 28 0 0 1 92 160 Z" />
        </clipPath>
      </defs>
      <g transform="rotate(-12 256 256)">
        <g clipPath={`url(#${clipId})`}>
          <rect className="fill-fd-foreground" height="512" width="340" />
          <rect className="fill-fd-primary" height="512" width="172" x="340" />
        </g>
        <g className="fill-fd-background">
          <rect height="22" rx="8" width="16" x="332" y="175" />
          <rect height="22" rx="8" width="16" x="332" y="214" />
          <rect height="22" rx="8" width="16" x="332" y="253" />
          <rect height="22" rx="8" width="16" x="332" y="292" />
          <rect height="22" rx="8" width="16" x="332" y="331" />
          <path d="M118 304 L156 208 H186 L148 304 Z" />
          <path d="M170 304 L208 208 H238 L200 304 Z" />
          <path d="M222 304 L260 208 H290 L252 304 Z" />
        </g>
      </g>
    </svg>
  );
};
