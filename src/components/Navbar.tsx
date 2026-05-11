"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/diagnostic", label: "Diagnostic" },
    { href: "/products", label: "Catalog" },
    { href: "/recommend", label: "How it Works" },
    { href: "/recommend", label: "Testimonials" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-headline text-2xl font-bold text-foreground">Muakeup</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              asChild
            >
              <Link href="/diagnostic">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-card border-b border-border/50",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-none"
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button className="w-full rounded-full" asChild>
              <Link href="/diagnostic" onClick={() => setIsOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
