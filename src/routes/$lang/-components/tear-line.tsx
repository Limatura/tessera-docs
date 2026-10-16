import { Logo } from "@/components/logo";

// A perforation between sections, after the ticket in the logo.
export const TearLine = () => (
  <div
    aria-hidden="true"
    className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 sm:px-6"
  >
    <span className="h-px flex-1 border-t border-dashed border-white/12" />
    <Logo className="size-5 opacity-60" />
    <span className="h-px flex-1 border-t border-dashed border-white/12" />
  </div>
);
