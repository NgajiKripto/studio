import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MUAVerdict } from "@/components/products/MUAVerdict";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Info, CheckCircle } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} by ${product.brand} - Muakeup Expert Picks`,
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

  // Pre-process tags for the client component
  const tags = {
    skinTypes: product.skinTypes.map(t => t.skinType),
    skinTones: product.skinTones.map(t => t.skinTone),
    faceShapes: product.faceShapes.map(t => t.faceShape),
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Katalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Visual Column */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="relative aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl bg-white border border-primary/5">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square rounded-[1.5rem] overflow-hidden border bg-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
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

          {/* Information Column */}
          <div className="space-y-10 animate-in slide-in-from-right duration-700">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest px-3 h-7">
                  {product.category}
                </Badge>
                <span className="text-muted-foreground">/</span>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">{product.brand}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[0.95] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6">
                <span className="text-4xl font-bold text-primary">{product.priceEstimate}</span>
                <div className="h-10 w-px bg-muted mx-2" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Recommended Choice</span>
                </div>
              </div>
            </div>

            <MUAVerdict verdict={product.muaVerdict} brand={product.brand} />

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Detail Produk
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-3xl" />}>
              <ProductDetailClient 
                productId={product.id} 
                tags={tags} 
                productName={product.name}
                brandName={product.brand}
              />
            </Suspense>

            {/* Tag Breakdown */}
            <div className="grid grid-cols-2 gap-4 border-t pt-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Ideal For
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.skinTypes.map(t => (
                    <span key={t} className="text-[10px] font-medium bg-secondary/50 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Best Faces
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {tags.faceShapes.map(s => (
                    <span key={s} className="text-[10px] font-medium border border-accent/20 text-accent px-2 py-0.5 rounded-full">{s}</span>
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
    console.warn("Failed to generate static params for /products/[id], falling back to runtime rendering.", error);
    return [];
  }
}
