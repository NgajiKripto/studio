"use client";

import { useLanguage } from "@/lib/i18n";

export function ProductsCount({ count }: { count: number }) {
  const { t } = useLanguage();

  return (
    <p className="text-sm text-muted-foreground">
      {t.products.showing} <span className="font-bold text-foreground">{count}</span> {t.products.productsText}
    </p>
  );
}
