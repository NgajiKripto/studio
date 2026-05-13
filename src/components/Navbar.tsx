"use client";

import Link from "next/link";
import { Menu, X, Sparkles, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, t, setLocale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/diagnostic", label: t.nav.diagnostic },
    { href: "/products", label: t.nav.catalog },
    { href: "/dashboard", label: t.nav.dashboard },
  ];

  const toggleLocale = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-white/70 backdrop-blur-2xl border-b border-white/40 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Muakeup
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Language Switcher + CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/50 border border-border/50 transition-all"
              title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === "id" ? "EN" : "ID"}
            </button>

            <Button
              size="sm"
              className="rounded-full px-6 font-semibold gradient-bg text-white border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/diagnostic">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                {t.nav.getStarted}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/50 border border-border/50 transition-all"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === "id" ? "EN" : "ID"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/50 transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-400 ease-in-out overflow-hidden",
          isOpen
            ? "max-h-96 opacity-100 bg-white/90 backdrop-blur-2xl border-b border-white/40"
            : "max-h-0 opacity-0 border-none"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/60 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 px-4">
            <Button className="w-full rounded-full gradient-bg text-white border-0 shadow-md" asChild>
              <Link href="/diagnostic" onClick={() => setIsOpen(false)}>
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                {t.nav.getStarted}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
