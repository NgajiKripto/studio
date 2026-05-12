"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export function RefreshButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="rounded-full"
      onClick={() => router.refresh()}
    >
      <RotateCcw className="h-4 w-4 mr-2" />
      Refresh Data
    </Button>
  );
}
