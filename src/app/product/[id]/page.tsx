import { PRODUCTS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} by ${product.brand} - Muakeup`,
    description: `MUA Verdict: ${product.muaVerdict}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/catalog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
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
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-muted/50 border border-border/50 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  <Image
                    src={`https://picsum.photos/seed/product-${id}-${i}/200/200`}
                    alt={`${product.name} thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
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

            {/* MUA Verdict */}
            <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Professional MUA Verdict</p>
              <p className="text-foreground/80 italic leading-relaxed">
                &quot;{product.muaVerdict}&quot;
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-headline text-xl font-bold text-foreground">About this product</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best For</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.skinTypes.map((t) => (
                    <span key={t} className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Face Shapes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.faceShapes.map((s) => (
                    <span key={s} className="text-xs font-medium border border-border px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button size="lg" className="flex-grow rounded-full font-semibold" asChild>
                <Link href={product.affiliateUrl}>
                  Purchase
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full w-12 h-12 p-0">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Section */}
        <section className="mt-24">
          <h2 className="font-headline text-3xl font-bold text-foreground mb-8">You might also love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== id).slice(0, 4).map((related) => (
              <Link key={related.id} href={`/product/${related.id}`} className="group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-muted/50">
                  <Image src={related.imageUrl} alt={related.name} fill className="object-cover transition-transform group-hover:scale-105 duration-500" />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{related.brand}</p>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{related.name}</h4>
                <p className="text-sm text-muted-foreground">{related.priceEstimate}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
