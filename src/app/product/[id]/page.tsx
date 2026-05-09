import { PRODUCTS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, CheckCircle, Info, ArrowLeft } from "lucide-react";
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
    description: `MUA Verdict for ${product.name}: ${product.muaVerdict}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-grow bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <Link href="/catalog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white border">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border bg-white hover:border-primary cursor-pointer transition-colors">
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
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest h-6">
                  {product.category}
                </Badge>
                <span className="text-muted-foreground">/</span>
                <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{product.brand}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">{product.priceEstimate}</span>
                <div className="flex items-center gap-1 text-accent">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">(Expert Choice)</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-accent/5 border border-accent/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star className="h-16 w-16 fill-accent" />
              </div>
              <h3 className="text-lg font-headline font-bold text-accent mb-3 flex items-center gap-2">
                 Professional MUA Verdict
              </h3>
              <p className="text-lg italic font-medium leading-relaxed text-foreground/90">
                "{product.muaVerdict}"
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-bold">About the Product</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-6 bg-white rounded-3xl shadow-sm">
                <h4 className="font-bold flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" /> Best For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.skinTypes.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full text-[10px] uppercase font-bold px-3">{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-4 p-6 bg-white rounded-3xl shadow-sm">
                <h4 className="font-bold flex items-center gap-2 text-accent">
                  <Info className="h-5 w-5" /> Ideal Faces
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.faceShapes.map((s) => (
                    <Badge key={s} variant="outline" className="rounded-full text-[10px] uppercase font-bold px-3 border-accent/30 text-accent">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-12 rounded-full text-lg font-bold shadow-xl flex-grow md:flex-grow-0" asChild>
                <Link href={product.affiliateUrl}>
                  Purchase from Affiliate Store
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 w-14 rounded-full flex-shrink-0">
                <ShoppingCart className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Section */}
        <section className="mt-32">
          <h2 className="text-3xl font-headline font-bold mb-12">You Might Also Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== id).slice(0, 4).map((related) => (
              <div key={related.id} className="group">
                <Link href={`/product/${related.id}`}>
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                    <Image src={related.imageUrl} alt={related.name} fill className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest">{related.brand}</p>
                  <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{related.name}</h4>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
