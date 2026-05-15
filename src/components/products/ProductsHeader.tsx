"use client";

import { useLanguage } from "@/lib/i18n";

export function ProductsHeader() {
  const { t } = useLanguage();

  return (
    <header className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-primary/60" />
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground font-body">
          {t.products.badge}
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
        {t.products.title}
      </h1>
      <p className="text-muted-foreground text-base font-body max-w-lg">
        {t.products.description}
      </p>
    </header>
  );
}
