"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Plus, Search, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceEstimate: string;
}

interface ProductSelectorProps {
  allProducts: Product[];
  selectedProductIds: string[];
  userId: string;
}

export function DashboardProductSelector({
  allProducts,
  selectedProductIds: initialSelected,
  userId,
}: ProductSelectorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(initialSelected));
  const [saving, setSaving] = useState(false);

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleProduct = (productId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productIds: Array.from(selectedIds),
        }),
      });

      if (res.ok) {
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error("Failed to save products:", error);
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    selectedIds.size !== initialSelected.length ||
    !initialSelected.every((id) => selectedIds.has(id));

  return (
    <div className="space-y-6">
      {/* Search & Save */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari produk berdasarkan nama, brand, atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="rounded-xl gap-2 bg-pink-500 hover:bg-pink-600 text-white"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Simpan ({selectedIds.size} produk)
        </Button>
      </div>

      {/* Selected count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="secondary" className="text-xs">
          {selectedIds.size} dipilih
        </Badge>
        {hasChanges && (
          <span className="text-amber-500 text-xs font-medium">
            Ada perubahan belum disimpan
          </span>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const isSelected = selectedIds.has(product.id);
          return (
            <Card
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              className={cn(
                "relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                isSelected
                  ? "border-pink-500 bg-pink-500/5"
                  : "border-border/50 hover:border-primary/30"
              )}
            >
              <div className="flex gap-3 p-3">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                    {product.brand}
                  </p>
                  <p className="text-sm font-semibold text-foreground line-clamp-1">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[9px]">
                      {product.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {product.priceEstimate}
                    </span>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex-shrink-0 flex items-start pt-1">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      isSelected
                        ? "bg-pink-500 border-pink-500 text-white"
                        : "border-muted-foreground/30"
                    )}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada produk yang cocok dengan pencarian.</p>
        </div>
      )}
    </div>
  );
}
