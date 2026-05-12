"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function ProductsEmpty() {
  const { t } = useLanguage();

  return (
    <div className="text-center py-20 glass-card rounded-3xl">
      <div className="w-16 h-16 rounded-full gradient-bg-soft flex items-center justify-center mx-auto mb-4">
        <Sparkles className="h-6 w-6 text-secondary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{t.products.noProducts}</h3>
      <p className="text-muted-foreground text-sm">{t.products.noProductsDesc}</p>
    </div>
  );
}
