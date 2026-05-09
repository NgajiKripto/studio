import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  Waves, 
  Palette, 
  Fingerprint, 
  Quote, 
  CheckCircle2, 
  Zap,
  ShieldCheck
} from "lucide-react";

export default async function Home() {
  // Fetch featured products from Prisma
  const featuredProducts = await prisma.product.findMany({
    take: 4,
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
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-24">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide">
                <Sparkles className="h-4 w-4" /> Kurasi Profesional MUA
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.9] text-foreground tracking-tighter">
                Tampil Sempurna, <br />
                <span className="text-primary italic">Sesuai Jati Dirimu.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Berhenti menebak. Dapatkan rekomendasi makeup yang dirancang khusus untuk jenis kulit, undertone, dan bentuk wajah unikmu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold shadow-xl shadow-primary/20" asChild>
                  <Link href="/diagnostic">
                    Mulai Diagnostik Gratis
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-10 h-16 text-lg font-bold border-2" asChild>
                  <Link href="/products">
                    Jelajahi Katalog
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl animate-in slide-in-from-right duration-1000">
              <Image
                src="https://picsum.photos/seed/beauty-hero/1000/1250"
                alt="Makeup Artistry"
                fill
                priority
                className="object-cover transition-transform duration-[20s] hover:scale-110"
                data-ai-hint="beauty portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                <p className="text-white font-headline text-2xl font-bold italic leading-tight">
                  "Kecantikan dimulai ketika kamu memutuskan untuk menjadi diri sendiri."
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white/80 text-sm font-bold uppercase tracking-widest">— Resident MUA Muakeup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Standard Kurasi Muakeup</h2>
            <p className="text-muted-foreground text-lg italic">Kami tidak hanya menjual produk, kami memberikan panduan ahli.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Waves, 
                title: "Diagnosis Cerdas", 
                desc: "Analisis jenis kulitmu (oily, dry, sensitive) untuk menentukan formula produk yang paling nyaman.",
                color: "text-primary bg-primary/5"
              },
              { 
                icon: Palette, 
                title: "Analisis Undertone", 
                desc: "Logika MUA untuk menentukan warna (fair to deep) dan undertone (warm, cool, neutral) yang menyatu.",
                color: "text-accent bg-accent/5"
              },
              { 
                icon: Fingerprint, 
                title: "Fit Bentuk Wajah", 
                desc: "Placement produk yang tepat sesuai bentuk wajahmu (oval, square, heart) untuk hasil maksimal.",
                color: "text-pink-600 bg-pink-50"
              }
            ].map((step, idx) => (
              <div key={idx} className="group p-10 rounded-[3rem] bg-background hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-transform group-hover:rotate-12", step.color)}>
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Editor's Choice</h2>
              <p className="text-muted-foreground text-lg">Produk pilihan MUA yang paling banyak dicintai bulan ini.</p>
            </div>
            <Button variant="ghost" className="text-primary font-bold text-lg group gap-2" asChild>
              <Link href="/products">
                Lihat Semua Katalog <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 bg-primary/5 -rotate-3 -z-10" />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-8">
            <Quote className="h-8 w-8 fill-primary" />
          </div>
          <blockquote className="text-3xl md:text-5xl font-headline font-bold italic leading-tight text-foreground mb-12">
            "Seringkali kita membeli makeup hanya karena tren, bukan karena kebutuhan fitur wajah. Di Muakeup, saya ingin membantu Anda menemukan 'signature look' yang sesungguhnya."
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4">
              <Image src="https://picsum.photos/seed/mua/200/200" alt="MUA Profile" width={80} height={80} className="object-cover" />
            </div>
            <h4 className="text-xl font-bold">Vania Clarissa</h4>
            <p className="text-sm uppercase tracking-widest text-primary font-bold">Founder & Resident MUA</p>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-20 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-lg">100% MUA Approved</h4>
                <p className="text-sm text-muted-foreground">Setiap produk diuji oleh tim MUA profesional kami.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                <Zap className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-lg">AI Smart Matching</h4>
                <p className="text-sm text-muted-foreground">Algoritma cerdas mencocokkan profilmu dengan detail produk.</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Tips Aplikasi Eksklusif</h4>
                <p className="text-sm text-muted-foreground">Pelajari cara pakai terbaik untuk hasil maksimal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="relative p-16 md:p-32 rounded-[5rem] bg-primary overflow-hidden text-center space-y-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -ml-48 -mb-48" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-7xl font-headline font-bold text-primary-foreground leading-none">
                Siap Menemukan <br /> Perfect Match-mu?
              </h2>
              <p className="text-primary-foreground/80 text-lg md:text-xl">
                Hanya butuh 2 menit kuis untuk mempermudah hidupmu dalam memilih makeup selamanya.
              </p>
              <div className="pt-6">
                <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 text-xl font-bold shadow-2xl hover:scale-105 transition-transform" asChild>
                  <Link href="/diagnostic">
                    Mulai Diagnostik Sekarang
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper utility for conditional classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
