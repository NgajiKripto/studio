"use client";

import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/products", label: "Katalog" },
    { href: "/diagnostic", label: "Kuis Kulit" },
    { href: "/recommend", label: "AI Picks" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 sm:px-8">
        <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card/85 px-4 py-3 shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <Sparkles className="h-5 w-5 text-foreground" />
            </div>
            <span className="font-headline text-xl font-bold text-foreground">Muakeup</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-link transition-opacity hover:opacity-80">
                {link.label}
              </Link>
            ))}
            <Button size="sm" asChild>
              <Link href="/diagnostic">Mulai</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-card p-2 text-link md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <div className="container mx-auto px-4 pb-4 sm:px-8">
          <div className="rounded-lg border border-border/60 bg-card p-4">
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-link hover:bg-primary/40"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
