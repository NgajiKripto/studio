
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
  
  // Parse filters from URL
  const selectedSkinTypes = params.skin_types ? (params.skin_types.split(",") as SkinType[]) : [];
  const selectedSkinTones = params.skin_tones ? (params.skin_tones.split(",") as SkinTone[]) : [];
  const selectedFaceShapes = params.face_shapes ? (params.face_shapes.split(",") as FaceShape[]) : [];
  const searchQuery = params.q || "";

  // Build Prisma Query
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
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-headline font-bold mb-2">Beauty Catalog</h1>
            <p className="text-muted-foreground">Temukan produk terbaik yang dikurasi khusus untuk profil unikmu.</p>
          </header>

          <ProfileBanner />

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Sidebar Filter - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24">
                <ProductFilters />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-medium">
                  Menampilkan <span className="text-primary font-bold">{products.length}</span> produk
                </p>
                {/* Mobile Filter Trigger is handled inside ProductFilters component */}
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
                  <div className="text-center py-20 bg-white/50 rounded-[2.5rem] border-2 border-dashed">
                    <h3 className="text-xl font-headline font-bold mb-2">Tidak ada produk ditemukan</h3>
                    <p className="text-muted-foreground">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
                  </div>
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
