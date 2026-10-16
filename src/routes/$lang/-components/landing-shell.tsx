import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

// The landing page's frame: forces the dark scope (see .landing in app.css),
// lays one static glow behind the top of the page, and runs the scroll
// reveals. Anything marked data-reveal fades in as it enters and out as it
// leaves, from whichever edge it crossed. Without JS, or with reduced motion,
// nothing is hidden in the first place.
export const LandingShell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.dataset.shown = "";
            delete element.dataset.above;
          } else {
            delete element.dataset.shown;
            if (entry.boundingClientRect.top < 0) {
              element.dataset.above = "";
            } else {
              delete element.dataset.above;
            }
          }
        }
      },
      { rootMargin: "-6% 0px -6% 0px", threshold: 0.1 }
    );

    root.classList.add("reveal-on");
    for (const element of root.querySelectorAll("[data-reveal]")) {
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-on");
    };
  }, []);

  return (
    <div
      className={cn(
        "landing dark text-fd-foreground relative isolate min-h-screen overflow-x-clip",
        className
      )}
      ref={ref}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[48rem] overflow-hidden"
      >
        <div className="bg-ember-500/14 absolute -top-72 left-1/2 h-[40rem] w-[72rem] max-w-[200vw] -translate-x-1/2 rounded-full blur-[120px]" />
      </div>
      {children}
    </div>
  );
};
