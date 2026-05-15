"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, Globe, Home, Search, LayoutDashboard, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import CircularNavigation from "@/components/ui/circular-navigation-bar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, t, setLocale } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const links = [
    { href: "/diagnostic", label: t.nav.diagnostic },
    { href: "/products", label: t.nav.catalog },
    { href: "/dashboard", label: t.nav.dashboard },
  ];

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: t.nav.diagnostic, icon: Search, href: "/diagnostic" },
    { name: t.nav.catalog, icon: ShoppingBag, href: "/products" },
    { name: t.nav.dashboard, icon: LayoutDashboard, href: "/dashboard" },
  ];

  const toggleLocale = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={cn(
          "sticky top-0 z-50 w-full pt-3 transition-all duration-500"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between h-16 lg:h-18 rounded-2xl px-3 sm:px-4 lg:px-5 border transition-all duration-500",
              scrolled
                ? "bg-white/70 backdrop-blur-2xl border-white/45 shadow-lg"
                : "bg-white/35 backdrop-blur-xl border-white/30 shadow-md"
            )}
          >
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
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/60"
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
                aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/60 border border-white/50 transition-all"
                title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              >
                <Globe className="h-3.5 w-3.5" />
                {locale === "id" ? "EN" : "ID"}
              </button>

            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Language Switcher */}
              <button
                onClick={toggleLocale}
                aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/60 border border-white/50 transition-all"
              >
                <Globe className="h-3.5 w-3.5" />
                {locale === "id" ? "EN" : "ID"}
              </button>

              <button
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="inline-flex items-center justify-center p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/60 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Circular Navigation Menu (Mobile) */}
      <CircularNavigation
        navItems={navItems}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />
    </>
  );
}
