import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/mock-data";
import { Sparkles, ArrowRight, Heart, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide">
                  <Sparkles className="h-4 w-4" /> Professional Curation
                </div>
                <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1] text-foreground">
                  Your Signature Look, <br />
                  <span className="text-primary italic">Expertly Recommended.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Stop guessing. Get personalized makeup recommendations based on your skin type, tone, and face shape, curated by a professional MUA.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg font-medium" asChild>
                    <Link href="/recommend">
                      Start Your Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg font-medium" asChild>
                    <Link href="/catalog">
                      Browse Catalog
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image
                  src="https://picsum.photos/seed/makeup-hero/1000/1200"
                  alt="Beautiful makeup application"
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint="makeup beauty"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-white font-headline text-xl font-bold">"Beauty is about being comfortable in your own skin."</p>
                  <p className="text-white/80 text-sm mt-2 font-medium">— Our Resident MUA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">The Muakeup Standard</h2>
              <p className="text-muted-foreground text-lg">We don't just show products; we provide a curated experience tailored to your unique features.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-background hover:shadow-lg transition-shadow border-none text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">MUA Approved</h3>
                <p className="text-muted-foreground leading-relaxed">Every product in our catalog comes with a professional verdict from a certified Makeup Artist.</p>
              </div>
              <div className="p-8 rounded-2xl bg-background hover:shadow-lg transition-shadow border-none text-center">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">AI Intelligence</h3>
                <p className="text-muted-foreground leading-relaxed">Our smart engine matches product attributes with your profile for near-perfect recommendations.</p>
              </div>
              <div className="p-8 rounded-2xl bg-background hover:shadow-lg transition-shadow border-none text-center">
                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mx-auto mb-6">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3">Community First</h3>
                <p className="text-muted-foreground leading-relaxed">Join a community of beauty enthusiasts sharing their experiences with curated products.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Editor's Choice</h2>
                <p className="text-muted-foreground">Hand-picked essentials for your everyday routine.</p>
              </div>
              <Link href="/catalog" className="text-primary font-bold flex items-center gap-1.5 hover:gap-2 transition-all">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-32 -mb-32" />
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary-foreground leading-tight">
                  Ready to find your perfect match?
                </h2>
                <p className="text-primary-foreground/80 text-lg md:text-xl">
                  Answer a few questions and let our AI curate your personalized makeup kit today.
                </p>
                <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-transform" asChild>
                  <Link href="/recommend">
                    Get My Recommendations
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}