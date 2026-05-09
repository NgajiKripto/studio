
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { Filter, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ProductFiltersProps {
  isMobile?: boolean;
}

export function ProductFilters({ isMobile }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    skin_types: searchParams.get("skin_types")?.split(",").filter(Boolean) || [],
    skin_tones: searchParams.get("skin_tones")?.split(",").filter(Boolean) || [],
    face_shapes: searchParams.get("face_shapes")?.split(",").filter(Boolean) || [],
  });

  // Sync internal state with URL params (e.g., when clicking "Clear All" or using Profile Banner)
  useEffect(() => {
    setFilters({
      skin_types: searchParams.get("skin_types")?.split(",").filter(Boolean) || [],
      skin_tones: searchParams.get("skin_tones")?.split(",").filter(Boolean) || [],
      face_shapes: searchParams.get("face_shapes")?.split(",").filter(Boolean) || [],
    });
  }, [searchParams]);

  const updateURL = useCallback((newFilters: typeof filters) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    router.push(`/products?${params.toString()}`);
  }, [router, searchParams]);

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    const current = [...filters[category]];
    const index = current.indexOf(value);
    
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(value);
    }

    const nextFilters = { ...filters, [category]: current };
    setFilters(nextFilters);
    updateURL(nextFilters);
  };

  const clearAll = () => {
    const cleared = { skin_types: [], skin_tones: [], face_shapes: [] };
    setFilters(cleared);
    router.push("/products");
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-headline font-bold flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground hover:text-primary">
          <RotateCcw className="h-3 w-3 mr-1" /> Clear All
        </Button>
      </div>

      <Separator />

      {/* Skin Type */}
      <div className="space-y-4">
        <Label className="text-sm font-bold uppercase tracking-widest text-primary">Jenis Kulit</Label>
        <div className="space-y-3">
          {SKIN_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-3">
              <Checkbox 
                id={`skin-${type.value}`} 
                checked={filters.skin_types.includes(type.value)}
                onCheckedChange={() => toggleFilter("skin_types", type.value)}
              />
              <Label htmlFor={`skin-${type.value}`} className="text-sm font-medium cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Skin Tone */}
      <div className="space-y-4">
        <Label className="text-sm font-bold uppercase tracking-widest text-primary">Warna Kulit</Label>
        <ScrollArea className="h-64 pr-4">
          <div className="space-y-3">
            {SKIN_TONES.map((tone) => (
              <div key={tone.value} className="flex items-center space-x-3">
                <Checkbox 
                  id={`tone-${tone.value}`} 
                  checked={filters.skin_tones.includes(tone.value)}
                  onCheckedChange={() => toggleFilter("skin_tones", tone.value)}
                />
                <Label htmlFor={`tone-${tone.value}`} className="text-xs font-medium cursor-pointer">
                  {tone.label}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Face Shape */}
      <div className="space-y-4">
        <Label className="text-sm font-bold uppercase tracking-widest text-primary">Bentuk Wajah</Label>
        <div className="space-y-3">
          {FACE_SHAPES.map((shape) => (
            <div key={shape.value} className="flex items-center space-x-3">
              <Checkbox 
                id={`shape-${shape.value}`} 
                checked={filters.face_shapes.includes(shape.value)}
                onCheckedChange={() => toggleFilter("face_shapes", shape.value)}
              />
              <Label htmlFor={`shape-${shape.value}`} className="text-sm font-medium cursor-pointer">
                {shape.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-full gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-[3rem]">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="font-headline text-2xl">Filter Produk</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full pb-10">
            <FilterContent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-primary/5">
      <FilterContent />
    </div>
  );
}
