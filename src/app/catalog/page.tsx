"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/mock-data";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react";
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
      <div className="space-y-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skin Type</Label>
        <Select value={selectedType} onValueChange={(v) => setSelectedType(v as SkinType | "ALL")}>
          <SelectTrigger className="rounded-xl bg-white/60 border-white/40 backdrop-blur-sm focus:ring-secondary">
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

      <div className="space-y-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skin Tone</Label>
        <Select value={selectedTone} onValueChange={(v) => setSelectedTone(v as SkinTone | "ALL")}>
          <SelectTrigger className="rounded-xl bg-white/60 border-white/40 backdrop-blur-sm focus:ring-secondary">
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

      <div className="space-y-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Face Shape</Label>
        <Select value={selectedShape} onValueChange={(v) => setSelectedShape(v as FaceShape | "ALL")}>
          <SelectTrigger className="rounded-xl bg-white/60 border-white/40 backdrop-blur-sm focus:ring-secondary">
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

      <div className="pt-2">
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-secondary rounded-xl"
          onClick={clearFilters}
        >
          <RotateCcw className="h-4 w-4 mr-2" /> Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-pink-100/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
            <Sparkles className="h-3 w-3" />
            Curated Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight">
            Product Catalog
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Explore our curated selection of makeup products, filtered to match your beauty profile.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 glass-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-secondary" />
                Filters
              </h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 rounded-xl bg-white/60 border-white/40 backdrop-blur-sm focus:ring-secondary h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">
                  <span className="text-foreground font-bold">{filteredProducts.length}</span> products
                </span>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden rounded-xl glass-card">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
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
              <div className="text-center py-20 glass-card rounded-3xl">
                <div className="w-16 h-16 rounded-full gradient-bg-soft flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters or search terms.</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-full text-secondary border-secondary/30 hover:bg-secondary/10"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
