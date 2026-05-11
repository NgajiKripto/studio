export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductCard } from "@/components/products/ProductCard";
import { ProfileBanner } from "@/components/products/ProfileBanner";
import { ProductSkeleton } from "@/components/products/ProductSkeleton";
import { SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { Sparkles } from "lucide-react";

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
    <main className="min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
            <Sparkles className="h-3 w-3" />
            Personalized For You
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight">
            Katalog Produk Makeup
          </h1>
          <p className="text-muted-foreground text-lg">
            Temukan produk makeup terbaik yang dikurasi sesuai profil kecantikan unikmu.
          </p>
        </header>

        <ProfileBanner />

        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 glass-card rounded-2xl p-6 shadow-lg">
              <ProductFilters />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{products.length}</span> products
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
                <div className="text-center py-20 glass-card rounded-3xl">
                  <div className="w-16 h-16 rounded-full gradient-bg-soft flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
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
