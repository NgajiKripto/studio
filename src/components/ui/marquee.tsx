import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = ComponentPropsWithoutRef<"div"> & {
  pauseOnHover?: boolean;
  reverse?: boolean;
  repeat?: number;
};

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 2,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]", className)}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={`marquee-repeat-${reverse ? "reverse" : "forward"}-${repeat}-${index}`}
          className={cn(
            "flex min-w-max shrink-0 items-stretch [gap:var(--gap)] animate-marquee",
            reverse && "animate-marquee-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
