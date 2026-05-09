"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/mock-data";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, RotateCcw, SlidersHorizontal } from "lucide-react";
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
    <div className="space-y-8">
      <div className="space-y-2">
        <Label className="text-sm font-bold uppercase tracking-widest text-primary">Skin Type</Label>
        <Select value={selectedType} onValueChange={(v) => setSelectedType(v as SkinType | "ALL")}>
          <SelectTrigger className="rounded-xl border-none shadow-sm bg-white">
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
        <Label className="text-sm font-bold uppercase tracking-widest text-primary">Skin Tone</Label>
        <Select value={selectedTone} onValueChange={(v) => setSelectedTone(v as SkinTone | "ALL")}>
          <SelectTrigger className="rounded-xl border-none shadow-sm bg-white">
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
        <Label className="text-sm font-bold uppercase tracking-widest text-primary">Face Shape</Label>
        <Select value={selectedShape} onValueChange={(v) => setSelectedShape(v as FaceShape | "ALL")}>
          <SelectTrigger className="rounded-xl border-none shadow-sm bg-white">
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

      <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary mt-4" onClick={clearFilters}>
        <RotateCcw className="h-4 w-4 mr-2" /> Reset Filters
      </Button>
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Product Catalog</h1>
          <p className="text-muted-foreground max-w-xl">Explore our curated selection of high-quality makeup products, filtered to match your specific beauty profile.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block space-y-8">
            <div className="p-6 rounded-3xl bg-secondary/20 border border-primary/5">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="font-headline text-xl font-bold">Filters</h2>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by brand, product or category..." 
                  className="pl-10 rounded-full border-none shadow-sm bg-white focus-visible:ring-accent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Showing <strong>{filteredProducts.length}</strong> products
                </span>
                
                {/* Mobile Filter Toggle */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden rounded-full">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader className="mb-8">
                      <SheetTitle className="font-headline text-2xl flex items-center gap-2">
                        <Filter className="h-5 w-5" /> Filters
                      </SheetTitle>
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
              <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-headline font-bold">No products found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters to see more results.</p>
                <Button variant="link" onClick={clearFilters} className="mt-4">Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
