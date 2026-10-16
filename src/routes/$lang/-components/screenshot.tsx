import { cn } from "@/lib/cn";

// A screenshot of the real app, from public/landing/<locale>/. Taken with
// the app in dark mode and the orange accent; retake them when the UI changes.
export const Screenshot = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) => (
  <img
    alt={alt}
    className={cn(
      "bg-panel h-auto w-full rounded-xl border border-white/10 shadow-2xl shadow-black/40",
      className
    )}
    decoding="async"
    height={height}
    loading={priority ? "eager" : "lazy"}
    src={src}
    width={width}
  />
);
