export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import type { ProductWithRelations } from "@/lib/types";

interface CatalogPageProps {
  searchParams: Promise<{
    type?: string;
    tone?: string;
    shape?: string;
    q?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const selectedType = params.type || "";
  const selectedTone = params.tone || "";
  const selectedShape = params.shape || "";
  const searchQuery = params.q || "";

  let products: ProductWithRelations[] = [];

  try {
    const whereClause = {
      AND: [
        searchQuery ? {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' as const } },
            { brand: { contains: searchQuery, mode: 'insensitive' as const } },
            { category: { contains: searchQuery, mode: 'insensitive' as const } },
          ]
        } : {},
        selectedType ? {
          skinTypes: { some: { skinType: selectedType } }
        } : {},
        selectedTone ? {
          skinTones: { some: { skinTone: selectedTone } }
        } : {},
        selectedShape ? {
          faceShapes: { some: { faceShape: selectedShape } }
        } : {},
      ]
    };

    products = await prisma.product.findMany({
      where: whereClause,
      include: {
        skinTypes: true,
        skinTones: true,
        faceShapes: true,
      },
      orderBy: {
        name: 'asc'
      }
    }) as ProductWithRelations[];
  } catch (error) {
    console.error("Failed to fetch catalog products:", error instanceof Error ? error.message : "Unknown error");
  }

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
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skin Type</p>
                  <p className="text-sm text-muted-foreground">{selectedType || "All"}</p>
                </div>
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skin Tone</p>
                  <p className="text-sm text-muted-foreground">{selectedTone || "All"}</p>
                </div>
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Face Shape</p>
                  <p className="text-sm text-muted-foreground">{selectedShape || "All"}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">
                <span className="text-foreground font-bold">{products.length}</span> products
              </span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 glass-card rounded-3xl">
                <div className="w-16 h-16 rounded-full gradient-bg-soft flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {products.length === 0 && !selectedType && !selectedTone && !selectedShape
                    ? "Products are currently unavailable. Please try again later."
                    : "Try adjusting your filters or search terms."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
