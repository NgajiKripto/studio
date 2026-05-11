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
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} by ${product.brand} - Muakeup`,
    description: product.muaVerdict,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      skinTypes: true,
      skinTones: true,
      faceShapes: true,
    },
  });

  if (!product) {
    notFound();
  }

  const tags = {
    skinTypes: product.skinTypes.map(t => t.skinType),
    skinTones: product.skinTones.map(t => t.skinTone),
    faceShapes: product.faceShapes.map(t => t.faceShape),
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/50 border border-border/50">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted/50 border border-border/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  <Image
                    src={`https://picsum.photos/seed/detail-${id}-${i}/400/400`}
                    alt="Product shot"
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
                  {tags.skinTypes.map(t => (
                    <span key={t} className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Face Shapes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.faceShapes.map(s => (
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
    return products.map((p) => ({ id: p.id }));
  } catch (error) {
    const errorName = error instanceof Error ? error.name : String(error);
    if (errorName !== "PrismaClientInitializationError") {
      throw error;
    }
    console.warn(`Failed to generate static params for /products/[id], falling back to runtime rendering. (${errorName})`);
    return [];
  }
}
