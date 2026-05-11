export const dynamic = 'force-dynamic';
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import BlurText from "@/components/ui/blur-text";
import { Heart, ArrowRight, ChevronDown } from "lucide-react";

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
      <section className="relative bg-card overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase">
                Triple Skin Diagnostic
              </div>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]">
                <BlurText
                  text="Personalized beauty for every skin."
                  delay={120}
                  className="inline"
                  animateBy="words"
                  direction="top"
                />
              </h1>
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                Discover your perfect match with our Triple Skin Diagnostic. We analyze your skin type, tone, and face shape to curate a personalized makeup catalog just for you.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="rounded-full px-8 font-semibold" asChild>
                  <Link href="/diagnostic">Mulai Kuis Kulitmu</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold border-border" asChild>
                  <Link href="/products">
                    Jelajahi Katalog <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-96 lg:w-96 lg:h-[480px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-card">
                <Image
                  src="https://picsum.photos/seed/beauty-hero/800/1000"
                  alt="Beauty Portrait"
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint="beauty portrait"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/10 -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-secondary -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center animate-bounce">
            <ChevronDown className="h-5 w-5 text-primary" />
          </div>
        </div>
      </section>

      {/* Triple Skin Diagnostic Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Triple Skin Diagnostic
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to unlock a curated catalog designed exclusively for your unique features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 - Skin Type */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Step 01</p>
                <h3 className="font-headline text-2xl font-bold text-foreground">Skin Type</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Identify your skin&apos;s needs—oily, dry, or combination—for the perfect base foundation that lasts all day.
              </p>
            </div>

            {/* Step 2 - Skin Tone */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Step 02</p>
                <h3 className="font-headline text-2xl font-bold text-foreground">Skin Tone</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Find your exact shade match across foundations, concealers, and more.
              </p>
            </div>

            {/* Step 3 - Face Shape */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Step 03</p>
                <h3 className="font-headline text-2xl font-bold text-foreground">Face Shape</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Learn contouring and highlighting techniques tailored to your structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalog Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
                Featured Catalog
              </h2>
              <p className="text-muted-foreground mt-2">
                Curated essentials loved by our community.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="bg-muted/50 rounded-2xl overflow-hidden aspect-[4/5] relative mb-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.priceEstimate}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
              What our community says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/sarah/100/100"
                    alt="Sarah J."
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Sarah J.</p>
                  <p className="text-xs text-muted-foreground">Oily Skin • Warm Undertone</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                &quot;The diagnostic tool is incredible. It recommended a foundation I never would have picked myself, and it&apos;s a perfect match. Finally, my skin looks flawless without looking cakey!&quot;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/alex/100/100"
                    alt="Alex M."
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Alex M.</p>
                  <p className="text-xs text-muted-foreground">Dry Skin • Cool Undertone</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                &quot;I&apos;ve always struggled to find makeup that works with my dry skin. The curated catalog made shopping so easy, and the products feel luxurious and hydrating. Highly recommend!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
