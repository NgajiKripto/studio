"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function ProductsHeader() {
  const { t } = useLanguage();

  return (
    <header className="mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
        <Sparkles className="h-3 w-3" />
        {t.products.badge}
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight">
        {t.products.title}
      </h1>
      <p className="text-muted-foreground text-lg">
        {t.products.description}
      </p>
    </header>
  );
}
