"use client";

import React, { forwardRef, useRef } from "react";
import confetti from "canvas-confetti";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ConfettiButtonProps extends ButtonProps {
  options?: confetti.Options;
}

const ConfettiButton = forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  ({ className, children, options, onClick, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = (
        buttonRef.current ?? (ref as React.RefObject<HTMLButtonElement>)?.current
      )?.getBoundingClientRect();

      if (rect) {
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          ...options,
        });
      }

      onClick?.(e);
    };

    return (
      <Button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ConfettiButton.displayName = "ConfettiButton";

export { ConfettiButton };
