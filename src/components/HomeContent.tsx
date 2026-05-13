"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ShinyText } from "@/components/ui/shiny-text";
import BlurText from "@/components/ui/blur-text";
import { Heart, ArrowRight, ChevronDown, Sparkles, Star, Droplets, Palette, Layers, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ProductData {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceEstimate: string;
  skinTypes: any[];
  skinTones: any[];
  faceShapes: any[];
}

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
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-foreground/80">
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

export function HomeContent({ featuredProducts }: { featuredProducts: ProductData[] }) {
  const { t } = useLanguage();
  const startQuizShineProps = {
    color: "rgba(255,255,255,0.88)",
    shineColor: "#ffffff",
    spread: 110,
    speed: 2.2,
    delay: 0.4,
  } as const;

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold tracking-wide uppercase text-secondary">
                <Sparkles className="h-3.5 w-3.5" />
                {t.home.badge}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                <BlurText text={t.home.heroTitle1} delay={100} className="inline" animateBy="words" direction="top" />
                <br />
                <BlurText text={t.home.heroTitle2} delay={100} className="inline text-foreground" animateBy="words" direction="top" />
              </h1>

              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
                {t.home.heroDescription}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="rounded-full px-8 font-semibold gradient-bg text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12" asChild>
                  <Link href="/diagnostic">
                    <Sparkles className="h-4 w-4 mr-2" />
                    <ShinyText
                      text={t.home.startQuiz}
                      {...startQuizShineProps}
                    />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 font-semibold glass-card hover:bg-white/80 transition-all duration-300 h-12" asChild>
                  <Link href="/products">
                    {t.home.exploreCatalog} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt={`User ${i}`} width={32} height={32} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs mt-0.5">{t.home.lovedByUsers}</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-[380px] lg:h-[480px] rounded-[2.5rem] overflow-hidden shadow-[5px_5px_0px_0px_rgba(132,148,255,0.5)] border-2 border-foreground/80">
                  <Image src="https://picsum.photos/seed/beauty-hero/800/1000" alt="Beauty hero" fill priority className="object-cover" data-ai-hint="beauty portrait" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-4 -left-8 glass-card-strong rounded-2xl px-4 py-3 animate-float shadow-[3px_3px_0px_0px_rgba(132,148,255,0.5)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center border-2 border-foreground/80">
                      <Droplets className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{t.home.skinTypeAnalyzed}</p>
                      <p className="text-[10px] text-muted-foreground">{t.home.analyzed}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-6 glass-card-strong rounded-2xl px-4 py-3 animate-float-delayed shadow-[3px_3px_0px_0px_rgba(132,148,255,0.5)]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-foreground/80">
                      <Palette className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{t.home.perfectMatch}</p>
                      <p className="text-[10px] text-muted-foreground">{t.home.accurate}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-primary/20 blur-2xl -z-10" />
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-secondary/20 blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-4 border-2 border-foreground/80 shadow-[2px_2px_0px_0px_rgba(132,148,255,0.3)]">
              <AlertTriangle className="h-3 w-3" />
              {t.home.commonProblem}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
              <span className="gradient-text">{t.home.whyWrongMakeup}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.home.problemDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <article className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl" role="img" aria-label="skin">💧</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t.home.problem1Title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.home.problem1Desc}</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border-2 border-foreground/60">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">{t.home.problem1Solution}</span>
              </div>
            </article>

            <article className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl" role="img" aria-label="shade">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t.home.problem2Title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.home.problem2Desc}</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border-2 border-foreground/60">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">{t.home.problem2Solution}</span>
              </div>
            </article>

            <article className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl" role="img" aria-label="contour">✨</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{t.home.problem3Title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t.home.problem3Desc}</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border-2 border-foreground/60">
                <Sparkles className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs font-semibold text-green-700">{t.home.problem3Solution}</span>
              </div>
            </article>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="rounded-full px-10 font-semibold gradient-bg text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12" asChild>
              <Link href="/diagnostic">
                {t.home.tryQuiz} <ArrowRight className="ml-2 h-4 w-4" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4 border-2 border-foreground/80 shadow-[2px_2px_0px_0px_rgba(132,148,255,0.3)]">
              <Layers className="h-3 w-3" />
              {t.home.howItWorks}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
              {t.home.tripleSkinTitle}{" "}
              <span className="gradient-text">Diagnostic</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.home.tripleSkinDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] border-2 border-foreground/80 group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{t.home.step01}</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t.home.skinType}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.home.skinTypeDesc}</p>
            </div>

            <div className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] border-2 border-foreground/80 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{t.home.step02}</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t.home.skinTone}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.home.skinToneDesc}</p>
            </div>

            <div className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-5 shadow-[3px_3px_0px_0px_rgba(132,148,255,0.4)] border-2 border-foreground/80 group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{t.home.step03}</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t.home.faceShape}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.home.faceShapeDesc}</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="rounded-full px-10 font-semibold gradient-bg text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-12" asChild>
              <Link href="/diagnostic">
                {t.home.startFreeDiagnostic} <ArrowRight className="ml-2 h-4 w-4" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-foreground text-xs font-semibold mb-4 border-2 border-foreground/80 shadow-[2px_2px_0px_0px_rgba(132,148,255,0.3)]">
                <Star className="h-3 w-3 text-secondary" />
                {t.home.curatedForYou}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{t.home.featuredCatalog}</h2>
              <p className="text-muted-foreground mt-3 text-lg">{t.home.featuredDesc}</p>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary/80 transition-colors group">
              {t.home.viewAll}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div className="glass-card rounded-2xl overflow-hidden hover-lift">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border-2 border-foreground/80 shadow-[2px_2px_0px_0px_rgba(132,148,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(132,148,255,0.4)] transition-all">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-foreground/60 shadow-[1px_1px_0px_0px_rgba(132,148,255,0.3)]">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors line-clamp-1 text-sm">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground">{product.priceEstimate}</p>
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
              <Link href="/products">{t.home.viewAllProducts}</Link>
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-foreground text-xs font-semibold mb-4 border-2 border-foreground/80 shadow-[2px_2px_0px_0px_rgba(132,148,255,0.3)]">
              <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
              {t.home.testimonials}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {t.home.whatCommunitySays}{" "}
              <span className="gradient-text">{t.home.says}</span>
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
              {t.home.readyToFind}{" "}
              <span className="gradient-text">{t.home.readyToFindHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.home.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="rounded-full px-10 font-semibold gradient-bg text-white border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 h-13 text-base w-full sm:w-auto" asChild>
                <Link href="/diagnostic">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <ShinyText
                    text={t.home.startQuiz}
                    {...startQuizShineProps}
                  />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-10 font-semibold border-2 border-foreground/20 hover:bg-white/80 transition-all duration-300 h-13 text-base w-full sm:w-auto" asChild>
                <Link href="/products">
                  {t.home.seeAllProducts} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-2">{t.home.proMuaRecommendation}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
