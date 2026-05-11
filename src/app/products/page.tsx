export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductCard } from "@/components/products/ProductCard";
import { ProfileBanner } from "@/components/products/ProfileBanner";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { SkinType, SkinTone, FaceShape } from "@/lib/constants";

interface ProductsPageProps {
  searchParams: Promise<{
    skin_types?: string;
    skin_tones?: string;
    face_shapes?: string;
    q?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const selectedSkinTypes = params.skin_types ? (params.skin_types.split(",") as SkinType[]) : [];
  const selectedSkinTones = params.skin_tones ? (params.skin_tones.split(",") as SkinTone[]) : [];
  const selectedFaceShapes = params.face_shapes ? (params.face_shapes.split(",") as FaceShape[]) : [];
  const searchQuery = params.q || "";

  const whereClause: any = {
    AND: [
      searchQuery ? {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { brand: { contains: searchQuery, mode: 'insensitive' } },
          { category: { contains: searchQuery, mode: 'insensitive' } },
        ]
      } : {},
      selectedSkinTypes.length > 0 ? {
        skinTypes: { some: { skinType: { in: selectedSkinTypes } } }
      } : {},
      selectedSkinTones.length > 0 ? {
        skinTones: { some: { skinTone: { in: selectedSkinTones } } }
      } : {},
      selectedFaceShapes.length > 0 ? {
        faceShapes: { some: { faceShape: { in: selectedFaceShapes } } }
      } : {},
    ]
  };

  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      skinTypes: true,
      skinTones: true,
      faceShapes: true,
    },
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-3">Beauty Catalog</h1>
          <p className="text-muted-foreground text-lg">Discover products curated for your unique beauty profile.</p>
        </header>

        <ProfileBanner />

        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <ProductFilters />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{products.length}</span> products
              </p>
              <div className="lg:hidden">
                <ProductFilters isMobile />
              </div>
            </div>

            <Suspense fallback={<ProductSkeleton />}>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
                  <h3 className="font-headline text-xl font-bold mb-2">No products found</h3>
                  <p className="text-muted-foreground text-sm">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
