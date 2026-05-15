"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-4"
      role="alert"
      aria-live="assertive"
    >
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-bold mb-4 outline-none"
      >
        Something went wrong
      </h2>
      <p className="text-muted-foreground mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
