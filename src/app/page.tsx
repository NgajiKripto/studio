export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import BlurText from "@/components/ui/blur-text";
import { Heart, ArrowRight, ChevronDown, Sparkles, Star, Droplets, Palette, Layers, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Muakeup | Temukan Makeup yang Memahamimu",
  description:
    "Bingung pilih foundation? Muakeup bantu kamu memilih makeup sesuai jenis kulit, undertone, dan bentuk wajah. Dapatkan rekomendasi personal dari MUA sekarang.",
  openGraph: {
    title: "Muakeup | Temukan Makeup yang Memahamimu",
    description:
      "Bingung pilih foundation? Muakeup bantu kamu memilih makeup sesuai jenis kulit, undertone, dan bentuk wajah.",
  },
};

const communityTestimonials = [
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    title: "Product Designer, TechCorp",
    image: "https://picsum.photos/seed/community-emma/100/100",
    body: "This design system has transformed our workflow. The components are intuitive and well-documented.",
  },
  {
    id: "lucas-chen",
    name: "Lucas Chen",
    title: "Frontend Developer, WebFlow",
    image: "https://picsum.photos/seed/community-lucas/100/100",
    body: "The components are well-structured and customizable. They've significantly reduced our development time.",
  },
  {
    id: "sophia-martinez",
    name: "Sophia Martinez",
    title: "UI/UX Lead, DesignHub",
    image: "https://picsum.photos/seed/community-sophia/100/100",
    body: "Every component feels polished and professional. It's become our go-to resource for all projects.",
  },
  {
    id: "oliver-thompson",
    name: "Oliver Thompson",
    title: "Creative Director, StudioX",
    image: "https://picsum.photos/seed/community-oliver/100/100",
    body: "This design system brings consistency and efficiency to our creative process. Beautiful and functional.",
  },
];

function TestimonialCard({ item }: { item: (typeof communityTestimonials)[number] }) {
  return (
    <article className="glass-card rounded-3xl p-6 w-[320px] md:w-[360px] hover-lift">
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <Star key={index} className="h-4 w-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">&quot;{item.body}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30">
          <Image src={item.image} alt={item.name} width={40} height={40} className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.title}</p>
        </div>
      </div>
    </article>
  );
}

export default async function Home() {
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold tracking-wide uppercase text-secondary">
                <Sparkles className="h-3.5 w-3.5" />
                Triple Skin Diagnostic
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                <BlurText
                  text="Beauty that"
                  delay={100}
                  className="inline"
                  animateBy="words"
                  direction="top"
                />
                <br />
                <BlurText
                  text="understands you."
                  delay={100}
                  className="inline text-foreground"
                  animateBy="words"
                  direction="top"
                />
              </h1>

              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
                Discover your perfect match with our Triple Skin Diagnostic. We analyze your
                skin type, tone, and face shape to curate a personalized makeup catalog
                designed exclusively for you.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  size="lg"
                  className="rounded-full px-8 font-semibold gradient-bg text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12"
                  asChild
                >
                  <Link href="/diagnostic">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Mulai Kuis Kulitmu
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 font-semibold glass-card hover:bg-white/80 transition-all duration-300 h-12"
                  asChild
                >
                  <Link href="/products">
                    Jelajahi Katalog <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image
                        src={`https://picsum.photos/seed/user${i}/100/100`}
                        alt={`Pengguna Muakeup ${i}`}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Dicintai 2,000+ pengguna
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main image */}
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-[380px] lg:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/60">
                  <Image
                    src="https://picsum.photos/seed/beauty-hero/800/1000"
                    alt="Wanita dengan makeup sempurna hasil rekomendasi Muakeup"
                    fill
                    priority
                    className="object-cover"
                    data-ai-hint="beauty portrait"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -left-8 glass-card-strong rounded-2xl px-4 py-3 animate-float shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                      <Droplets className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Skin Type</p>
                      <p className="text-[10px] text-muted-foreground">Analyzed</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-6 glass-card-strong rounded-2xl px-4 py-3 animate-float-delayed shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Palette className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Perfect Match</p>
                      <p className="text-[10px] text-muted-foreground">98% accurate</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary/20 blur-2xl -z-10" />
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-secondary/20 blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center animate-bounce shadow-md">
            <ChevronDown className="h-5 w-5 text-secondary" />
          </div>
        </div>
      </section>

      {/* Problem Solving Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50/60 to-pink-50" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-4">
              <AlertTriangle className="h-3 w-3" />
              Masalah Umum
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
              Kenapa Sering{" "}
              <span className="gradient-text">Salah Pilih Makeup?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Banyak orang kesulitan cara memilih foundation sesuai jenis kulit, menentukan shade warna kulit yang pas,
              atau menemukan teknik contour untuk bentuk wajah mereka. Muakeup hadir untuk menyelesaikan itu semua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Problem 1 */}
            <article className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl" role="img" aria-label="Kulit berminyak">💧</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Kulit Berminyak vs Foundation Geser
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Foundation luntur dalam hitungan jam? Kulit berminyak butuh formula khusus yang tahan lama.
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Solusi: Filter Produk Berdasarkan Jenis Kulit</span>
              </div>
            </article>

            {/* Problem 2 */}
            <article className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl" role="img" aria-label="Shade warna kulit">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Shade Terlalu Terang atau Gelap
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Susah menentukan shade warna kulit yang tepat? Salah shade bikin wajah terlihat abu-abu atau terlalu oranye.
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Solusi: Rekomendasi Sesuai Warna Kulit & Undertone</span>
              </div>
            </article>

            {/* Problem 3 */}
            <article className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl" role="img" aria-label="Bentuk wajah untuk contour">✨</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Contour & Blush Tidak Pas
                </h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Teknik contour yang salah justru membuat wajah terlihat tidak proporsional. Setiap bentuk wajah untuk contour butuh pendekatan berbeda.
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">Solusi: Panduan Berdasarkan Bentuk Wajah</span>
              </div>
            </article>
          </div>

          {/* CTA below problem cards */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="rounded-full px-10 font-semibold gradient-bg text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12"
              asChild
            >
              <Link href="/diagnostic">
                Coba Kuis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Triple Skin Diagnostic Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50/60 to-pink-50" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
              <Layers className="h-3 w-3" />
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
              The Triple Skin{" "}
              <span className="gradient-text">Diagnostic</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Three simple steps to unlock a curated catalog designed exclusively for your unique features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 - Skin Type */}
            <div className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">Step 01</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Skin Type</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Identify your skin&apos;s needs—oily, dry, or combination—for the perfect base foundation that lasts all day.
              </p>
            </div>

            {/* Step 2 - Skin Tone */}
            <div className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">Step 02</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Skin Tone</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Find your exact shade match across foundations, concealers, and more. Never guess your shade again.
              </p>
            </div>

            {/* Step 3 - Face Shape */}
            <div className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">Step 03</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Face Shape</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Learn contouring and highlighting techniques tailored to your unique facial structure.
              </p>
            </div>
          </div>

          {/* CTA below steps */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="rounded-full px-10 font-semibold gradient-bg text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12"
              asChild
            >
              <Link href="/diagnostic">
                Mulai Diagnostic Gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Catalog Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50/60 to-pink-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-foreground text-xs font-semibold mb-4">
                <Star className="h-3 w-3 text-secondary" />
                Curated For You
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Featured Catalog
              </h2>
              <p className="text-muted-foreground mt-3 text-lg">
                Curated essentials loved by our community.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors group"
            >
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div className="glass-card rounded-2xl overflow-hidden hover-lift">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Image
                      src={product.imageUrl}
                      alt={`Produk ${product.name} dari ${product.brand} - makeup ${product.category}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors line-clamp-1 text-sm">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground">
                        {product.priceEstimate}
                      </p>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-muted-foreground">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" className="rounded-full glass-card" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50/60 to-pink-50" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-foreground text-xs font-semibold mb-4">
              <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              What our community{" "}
              <span className="gradient-text">says</span>
            </h2>
          </div>

          <div className="relative mx-auto max-w-6xl overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
            <Marquee pauseOnHover className="[--duration:42s] py-2">
              {communityTestimonials.map((item) => (
                <TestimonialCard key={`community-left-${item.id}`} item={item} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:48s] py-2 mt-4">
              {communityTestimonials.map((item) => (
                <TestimonialCard key={`community-right-${item.id}`} item={item} />
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_70%)]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Siap Temukan Makeup yang{" "}
              <span className="gradient-text">Cocok Untukmu?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ikuti kuis singkat kami dan dapatkan rekomendasi produk makeup yang dipersonalisasi untuk kulit unikmu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-full px-10 font-semibold gradient-bg text-white border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 h-13 text-base w-full sm:w-auto"
                asChild
              >
                <Link href="/diagnostic">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Mulai Kuis Kulitmu
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 font-semibold border-2 border-foreground/20 hover:bg-white/80 transition-all duration-300 h-13 text-base w-full sm:w-auto"
                asChild
              >
                <Link href="/products">
                  Lihat Semua Produk <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Rekomendasi dari MUA Profesional
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
