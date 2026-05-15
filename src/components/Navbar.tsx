"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Home, Search, LayoutDashboard, ShoppingBag } from "lucide-react";
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
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between h-14 lg:h-16 rounded-none lg:rounded-full px-4 sm:px-6 lg:px-8 transition-all duration-500",
              scrolled
                ? "bg-white/85 backdrop-blur-2xl shadow-sm border border-border/40"
                : "bg-transparent"
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-display text-2xl font-bold text-foreground tracking-tight">
                Muakeup
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "relative px-5 py-2 text-sm font-medium transition-colors rounded-full",
                    pathname === link.href
                      ? "text-foreground bg-secondary/5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleLocale}
                aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-all border border-border/50 hover:border-border"
                title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
              >
                <Globe className="h-3.5 w-3.5" />
                {locale === "id" ? "EN" : "ID"}
              </button>

              <Link
                href="/diagnostic"
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300"
              >
                {t.nav.getStarted}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLocale}
                aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground border border-border/50 transition-all"
              >
                <Globe className="h-3.5 w-3.5" />
                {locale === "id" ? "EN" : "ID"}
              </button>

              <button
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="inline-flex items-center justify-center p-2 rounded-full text-foreground hover:bg-muted transition-colors"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
