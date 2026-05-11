"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/mock-data";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SkinType | "ALL">("ALL");
  const [selectedTone, setSelectedTone] = useState<SkinTone | "ALL">("ALL");
  const [selectedShape, setSelectedShape] = useState<FaceShape | "ALL">("ALL");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "ALL" || p.skinTypes.includes(selectedType);
      const matchesTone = selectedTone === "ALL" || p.skinTones.includes(selectedTone);
      const matchesShape = selectedShape === "ALL" || p.faceShapes.includes(selectedShape);

      return matchesSearch && matchesType && matchesTone && matchesShape;
    });
  }, [searchQuery, selectedType, selectedTone, selectedShape]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("ALL");
    setSelectedTone("ALL");
    setSelectedShape("ALL");
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skin Type</Label>
        <Select value={selectedType} onValueChange={(v) => setSelectedType(v as SkinType | "ALL")}>
          <SelectTrigger className="rounded-xl bg-white border-border">
            <SelectValue placeholder="All Skin Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Skin Types</SelectItem>
            {SKIN_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skin Tone</Label>
        <Select value={selectedTone} onValueChange={(v) => setSelectedTone(v as SkinTone | "ALL")}>
          <SelectTrigger className="rounded-xl bg-white border-border">
            <SelectValue placeholder="All Skin Tones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Skin Tones</SelectItem>
            {SKIN_TONES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Face Shape</Label>
        <Select value={selectedShape} onValueChange={(v) => setSelectedShape(v as FaceShape | "ALL")}>
          <SelectTrigger className="rounded-xl bg-white border-border">
            <SelectValue placeholder="All Face Shapes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Face Shapes</SelectItem>
            {FACE_SHAPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary" onClick={clearFilters}>
        <RotateCcw className="h-4 w-4 mr-2" /> Reset Filters
      </Button>
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-3">Product Catalog</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Explore our curated selection of makeup products, filtered to match your beauty profile.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
              <h2 className="font-headline text-lg font-bold mb-6">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 rounded-xl bg-white border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {filteredProducts.length} products
                </span>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden rounded-xl">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="font-headline text-xl">Filters</SheetTitle>
                    </SheetHeader>
                    <FilterPanel />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-border/50">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-headline text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your filters.</p>
                <Button variant="link" onClick={clearFilters} className="mt-4 text-primary">Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
