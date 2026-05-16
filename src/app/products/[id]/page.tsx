export const dynamic = 'force-dynamic';
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MUAVerdict } from "@/components/products/MUAVerdict";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return { title: "Produk Tidak Ditemukan" };

    const description = product.muaVerdict
      ? `${product.muaVerdict.substring(0, 150)}...`
      : `Beli ${product.name} dari ${product.brand}. Rekomendasi makeup ${product.category} sesuai jenis kulit dan warna kulitmu.`;

    return {
      title: `${product.name} - ${product.brand} | Review & Rekomendasi`,
      description,
      openGraph: {
        title: `${product.name} oleh ${product.brand} | Muakeup`,
        description,
        images: [{ url: product.imageUrl, alt: `Produk ${product.name} dari ${product.brand}` }],
      },
    };
  } catch {
    return { title: "Produk Tidak Ditemukan" };
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product = null;

  try {
    product = await prisma.product.findUnique({
      where: { id },
      include: {
        skinTypes: true,
        skinTones: true,
        faceShapes: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch product:", error instanceof Error ? error.message : "Unknown error");
  }

  if (!product) {
    notFound();
  }

  const tags = {
    skinTypes: product.skinTypes.map((t: { skinType: string }) => t.skinType),
    skinTones: product.skinTones.map((t: { skinTone: string }) => t.skinTone),
    faceShapes: product.faceShapes.map((t: { faceShape: string }) => t.faceShape),
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            brand: { "@type": "Brand", name: product.brand },
            image: product.imageUrl,
            description: product.description || `${product.name} by ${product.brand}`,
            ...(/^\D*(\d[\d.]*)\D*$/.test(product.priceEstimate) ? {
              offers: {
                "@type": "Offer",
                price: product.priceEstimate.replace(/[^0-9]/g, ""),
                priceCurrency: "IDR",
              },
            } : {}),
          }),
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="space-y-4" role="region" aria-label="Product image gallery">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/50 border border-border/50">
              <Image
                src={product.imageUrl}
                alt={`Produk ${product.name} dari ${product.brand} - makeup ${product.category} untuk kulit Indonesia`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} role="img" aria-label={`${product.name} detail view ${i}`} className="relative aspect-square rounded-xl overflow-hidden bg-muted/50 border border-border/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  <Image
                    src={`https://picsum.photos/seed/detail-${id}-${i}/400/400`}
                    alt={`${product.name} dari ${product.brand} - tampilan detail ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-secondary text-secondary-foreground border-none text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  {product.category}
                </Badge>
                <span className="text-sm text-muted-foreground">{product.brand}</span>
              </div>

              <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">{product.priceEstimate}</span>
                <div className="flex items-center gap-0.5 text-primary">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <MUAVerdict verdict={product.muaVerdict} brand={product.brand} />

            <div className="space-y-3">
              <h3 className="font-headline text-xl font-bold text-foreground">About this product</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-2xl" />}>
              <ProductDetailClient
                productId={product.id}
                tags={tags}
                productName={product.name}
                brandName={product.brand}
              />
            </Suspense>

            {/* Tags */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best For</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.skinTypes.map((t: string) => (
                    <span key={t} className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Face Shapes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.faceShapes.map((s: string) => (
                    <span key={s} className="text-xs font-medium border border-border px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({ select: { id: true } });
    return products.map((p: { id: string }) => ({ id: p.id }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isDbUnavailable = errorMessage.includes("DATABASE_URL") || 
      (error instanceof Error && error.name === "PrismaClientInitializationError");
    if (!isDbUnavailable) {
      throw error;
    }
    console.warn(`Failed to generate static params for /products/[id], falling back to runtime rendering. (${errorMessage})`);
    return [];
  }
}
