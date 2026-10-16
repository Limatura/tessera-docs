import { cn } from "@/lib/cn";

// A soft ember glow behind a section, so the long middle of the page is not
// one flat colour. The caller positions it; the section has to be `relative`.
export const Glow = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn(
      "bg-ember-500/10 pointer-events-none absolute -z-10 size-[36rem] max-w-[90vw] rounded-full blur-[120px]",
      className
    )}
  />
);
