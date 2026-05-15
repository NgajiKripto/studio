"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ShinyText } from "@/components/ui/shiny-text";
import BlurText from "@/components/ui/blur-text";
import { ArrowRight, ChevronDown, Sparkles, Star, Droplets, Palette, Layers, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { motion } from "motion/react";

interface ProductData {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  priceEstimate: string;
  skinTypes: { id: string; productId: string; skinType: string }[];
  skinTones: { id: string; productId: string; skinTone: string }[];
  faceShapes: { id: string; productId: string; faceShape: string }[];
}

const communityTestimonials = [
  {
    id: "rina-pratiwi",
    name: "Rina Pratiwi",
    title: "Beauty Enthusiast",
    image: "https://picsum.photos/seed/community-rina/100/100",
    body: "Akhirnya nemu foundation yang beneran cocok sama jenis kulit aku. Gak geser lagi seharian!",
  },
  {
    id: "maya-sari",
    name: "Maya Sari",
    title: "Content Creator",
    image: "https://picsum.photos/seed/community-maya/100/100",
    body: "Triple Skin Diagnostic-nya akurat banget. Shade yang direkomendasikan perfect match sama kulitku.",
  },
  {
    id: "anisa-dewi",
    name: "Anisa Dewi",
    title: "MUA Professional",
    image: "https://picsum.photos/seed/community-anisa/100/100",
    body: "Sebagai MUA, aku appreciate banget sistem rekomendasi ini. Membantu client-ku nemuin produk yang pas.",
  },
  {
    id: "dian-kusuma",
    name: "Dian Kusuma",
    title: "Skincare Lover",
    image: "https://picsum.photos/seed/community-dian/100/100",
    body: "Dari dulu selalu salah pilih shade. Sekarang berkat Muakeup, makeup shopping jadi jauh lebih mudah.",
  },
];

function TestimonialCard({ item }: { item: (typeof communityTestimonials)[number] }) {
  return (
    <article className="editorial-card rounded-2xl p-6 w-[300px] md:w-[340px]">
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <Star key={index} className="h-3.5 w-3.5 text-primary fill-primary" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-body italic">
        &ldquo;{item.body}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-border">
          <Image src={item.image} alt={item.name} width={36} height={36} className="object-cover" />
        </div>
        <div>
          <p className="font-medium text-sm text-foreground font-body">{item.name}</p>
          <p className="text-xs text-muted-foreground font-body">{item.title}</p>
        </div>
      </div>
    </article>
  );
}



export function HomeContent({ featuredProducts }: { featuredProducts: ProductData[] }) {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col">
      {/* Hero Section — Editorial, dramatic */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden noise-texture" role="region" aria-labelledby="hero-heading">
        {/* Subtle organic shapes */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-20 left-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float-delayed" />
          <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-accent/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left content - spans 7 cols */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-3">
                <div className="decorative-line" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground font-body">
                  {t.home.badge}
                </span>
              </div>

              <h1 id="hero-heading" className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-foreground leading-[1.0] tracking-tight">
                <BlurText text={t.home.heroTitle1} delay={100} className="inline" animateBy="words" direction="top" />
                <br />
                <span className="italic text-primary">
                  <BlurText text={t.home.heroTitle2} delay={200} className="inline" animateBy="words" direction="top" />
                </span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed font-body font-light">
                {t.home.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button size="lg" className="rounded-full px-8 h-13 font-body font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 shadow-none hover:shadow-lg" asChild>
                  <Link href="/diagnostic">
                    <ShinyText
                      text={t.home.startQuiz}
                      color="rgba(255,255,255,0.88)"
                      shineColor="#ffffff"
                      spread={110}
                      speed={2.2}
                      delay={0.4}
                    />
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" className="rounded-full px-8 h-13 font-body font-medium text-foreground hover:bg-muted/50 transition-all duration-300" asChild>
                  <Link href="/products">
                    {t.home.exploreCatalog}
                  </Link>
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-5 pt-6 border-t border-border/50">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                      <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt={`User ${i}`} width={32} height={32} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3 w-3 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs mt-0.5 font-body">{t.home.lovedByUsers}</p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10">
                <Image
                  src="https://picsum.photos/seed/beauty-editorial/800/1060"
                  alt="Beauty editorial portrait"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
              </div>

              {/* Floating badge top-left */}
              <div className="absolute -top-3 -left-4 lg:-left-8 glass-card-strong rounded-xl px-4 py-3 animate-float shadow-lg z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground font-body">{t.home.skinTypeAnalyzed}</p>
                    <p className="text-[10px] text-muted-foreground font-body">{t.home.analyzed}</p>
                  </div>
                </div>
              </div>

              {/* Floating badge bottom-right */}
              <div className="absolute -bottom-3 -right-4 lg:-right-8 glass-card-strong rounded-xl px-4 py-3 animate-float-delayed shadow-lg z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Palette className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground font-body">{t.home.perfectMatch}</p>
                    <p className="text-[10px] text-muted-foreground font-body">{t.home.accurate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-8 h-12 rounded-full border border-border/60 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </section>



      {/* Problem Section — Editorial grid */}
      <motion.section
        className="relative py-28 lg:py-36 noise-texture"
        role="region"
        aria-labelledby="problem-solving-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="section-divider mb-28" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="decorative-line" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground font-body">
                {t.home.commonProblem}
              </span>
              <div className="decorative-line" />
            </div>
            <h2 id="problem-solving-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              {t.home.whyWrongMakeup}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed font-body">{t.home.problemDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <article className="editorial-card rounded-2xl p-8 group">
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-primary/20">01</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-3 mb-2">{t.home.problem1Title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">{t.home.problem1Desc}</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/5 border border-primary/10 w-fit">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary font-body">{t.home.problem1Solution}</span>
              </div>
            </article>

            <article className="editorial-card rounded-2xl p-8 group">
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-primary/20">02</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-3 mb-2">{t.home.problem2Title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">{t.home.problem2Desc}</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/5 border border-primary/10 w-fit">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary font-body">{t.home.problem2Solution}</span>
              </div>
            </article>

            <article className="editorial-card rounded-2xl p-8 group">
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-primary/20">03</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-3 mb-2">{t.home.problem3Title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">{t.home.problem3Desc}</p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/5 border border-primary/10 w-fit">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary font-body">{t.home.problem3Solution}</span>
              </div>
            </article>
          </div>

          <div className="mt-14 text-center">
            <Button size="lg" className="rounded-full px-10 h-13 font-body font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300" asChild>
              <Link href="/diagnostic">
                {t.home.tryQuiz} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>



      {/* Triple Skin Diagnostic Section */}
      <motion.section
        className="relative py-28 lg:py-36 bg-secondary text-secondary-foreground noise-texture overflow-hidden"
        role="region"
        aria-labelledby="triple-skin-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full translate-y-1/2 -translate-x-1/3" aria-hidden="true" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-white/20" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/60 font-body">
                {t.home.howItWorks}
              </span>
              <div className="w-12 h-px bg-white/20" />
            </div>
            <h2 id="triple-skin-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight text-balance">
              {t.home.tripleSkinTitle}{" "}
              <span className="italic text-primary">&ldquo;Diagnostic&rdquo;</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed font-body">{t.home.tripleSkinDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                  <Droplets className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider font-body">{t.home.step01}</span>
                <h3 className="text-2xl font-display font-bold text-white mt-2">{t.home.skinType}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed font-body">{t.home.skinTypeDesc}</p>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider font-body">{t.home.step02}</span>
                <h3 className="text-2xl font-display font-bold text-white mt-2">{t.home.skinTone}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed font-body">{t.home.skinToneDesc}</p>
            </motion.div>

            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider font-body">{t.home.step03}</span>
                <h3 className="text-2xl font-display font-bold text-white mt-2">{t.home.faceShape}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed font-body">{t.home.faceShapeDesc}</p>
            </motion.div>
          </div>

          <div className="mt-14 text-center">
            <Button size="lg" className="rounded-full px-10 h-13 font-body font-medium bg-white text-secondary hover:bg-white/90 transition-all duration-300" asChild>
              <Link href="/diagnostic">
                {t.home.startFreeDiagnostic} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>



      {/* Featured Catalog Section */}
      <motion.section
        className="py-28 lg:py-36 relative noise-texture"
        role="region"
        aria-labelledby="featured-catalog-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="decorative-line" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground font-body">
                  {t.home.curatedForYou}
                </span>
              </div>
              <h2 id="featured-catalog-heading" className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">{t.home.featuredCatalog}</h2>
              <p className="text-muted-foreground mt-3 text-base font-body">{t.home.featuredDesc}</p>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group font-body">
              {t.home.viewAll}
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group block">
                <div className="editorial-card rounded-2xl overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-medium uppercase tracking-wider text-muted-foreground font-body">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-body font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-sm">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground font-body">{product.priceEstimate}</p>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-primary fill-primary" />
                        <span className="text-xs text-muted-foreground font-body">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" className="rounded-full font-body" asChild>
              <Link href="/products">{t.home.viewAllProducts}</Link>
            </Button>
          </div>
        </div>
      </motion.section>



      {/* Testimonials Section */}
      <motion.section
        className="py-28 lg:py-36 relative overflow-hidden"
        role="region"
        aria-labelledby="testimonials-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="section-divider mb-28" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="decorative-line" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground font-body">
                {t.home.testimonials}
              </span>
              <div className="decorative-line" />
            </div>
            <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {t.home.whatCommunitySays}{" "}
              <span className="italic text-primary">{t.home.says}</span>
            </h2>
          </div>

          <div className="relative mx-auto max-w-6xl overflow-hidden" aria-label="Customer testimonials">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
            <Marquee pauseOnHover className="[--duration:45s] py-2">
              {communityTestimonials.map((item) => (
                <TestimonialCard key={`community-left-${item.id}`} item={item} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:50s] py-2 mt-4">
              {communityTestimonials.map((item) => (
                <TestimonialCard key={`community-right-${item.id}`} item={item} />
              ))}
            </Marquee>
          </div>
        </div>
      </motion.section>

      {/* CTA Section — Dramatic, full-width */}
      <motion.section
        className="py-28 lg:py-40 relative overflow-hidden noise-texture"
        role="region"
        aria-labelledby="cta-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" aria-hidden="true" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 id="cta-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
              {t.home.readyToFind}{" "}
              <span className="italic text-primary">{t.home.readyToFindHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">{t.home.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="rounded-full px-10 h-14 font-body font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 text-base w-full sm:w-auto" asChild>
                <Link href="/diagnostic">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t.home.startQuiz}
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-10 h-14 font-body font-medium border-border hover:bg-muted/50 transition-all duration-300 text-base w-full sm:w-auto" asChild>
                <Link href="/products">
                  {t.home.seeAllProducts} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground pt-2 font-body tracking-wide">{t.home.proMuaRecommendation}</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
