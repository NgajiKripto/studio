export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductCard } from "@/components/products/ProductCard";
import { ProfileBanner } from "@/components/products/ProfileBanner";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsCount } from "@/components/products/ProductsCount";
import { ProductsEmpty } from "@/components/products/ProductsEmpty";
import { SkinType, SkinTone, FaceShape } from "@/lib/constants";
import type { ProductWithRelations } from "@/lib/types";

export const metadata: Metadata = {
  title: "Katalog Produk Makeup - Rekomendasi Sesuai Jenis Kulit",
  description:
    "Jelajahi katalog produk makeup terlengkap dengan filter berdasarkan jenis kulit, warna kulit, dan bentuk wajah. Temukan foundation, lipstik, contour terbaik untukmu.",
  openGraph: {
    title: "Katalog Produk Makeup | Muakeup",
    description:
      "Jelajahi katalog produk makeup terlengkap dengan filter berdasarkan jenis kulit, warna kulit, dan bentuk wajah.",
  },
};

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
    console.error("Failed to fetch products:", error instanceof Error ? error.message : "Unknown error");
  }

  return (
    <main className="min-h-screen relative noise-texture" aria-label="Product catalog">
      {/* Subtle background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] -z-10" aria-hidden="true" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] -z-10" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductsHeader />
        <ProfileBanner />

        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          <aside className="hidden lg:block w-72 shrink-0" aria-label="Filter products">
            <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
              <ProductFilters />
            </div>
          </aside>

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-8">
              <div aria-live="polite" aria-atomic="true">
                <ProductsCount count={products.length} />
              </div>
              <div className="lg:hidden">
                <ProductFilters isMobile />
              </div>
            </div>

            <Suspense fallback={<ProductSkeleton />}>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {(products as ProductWithRelations[]).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <ProductsEmpty />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
