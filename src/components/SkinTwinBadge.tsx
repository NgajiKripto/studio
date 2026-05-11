"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface SkinTwinBadgeProps {
  matchPercentage: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SkinTwinBadge({
  matchPercentage,
  size = "md",
  className,
}: SkinTwinBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-4 py-1.5 text-sm gap-2",
  };

  const iconSize = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        "bg-gradient-to-r from-pink-500/10 to-purple-500/10",
        "border border-pink-500/20",
        "text-pink-600 dark:text-pink-400",
        "animate-in fade-in duration-500",
        sizeClasses[size],
        className
      )}
    >
      <Sparkles className={cn(iconSize[size], "text-pink-500")} />
      <span>{matchPercentage}% Skin Match</span>
    </div>
  );
}
