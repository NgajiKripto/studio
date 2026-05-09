"use client";

import Link from "next/link";
import { Sparkles, ShoppingBag, Menu, X, Fingerprint } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:bg-accent transition-colors">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tight text-primary">
              Muakeup
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Catalog
            </Link>
            <Link href="/diagnostic" className="text-sm font-medium flex items-center gap-1.5 text-accent hover:text-primary transition-colors">
              <Fingerprint className="h-4 w-4" /> Skin Quiz
            </Link>
            <Link href="/recommend" className="text-sm font-medium hover:text-primary transition-colors">
              AI Picks
            </Link>
            <Button variant="default" className="rounded-full px-6">
              Expert Tips
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-muted"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-background border-b transition-all duration-300 ease-in-out",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link
            href="/catalog"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            onClick={() => setIsOpen(false)}
          >
            Catalog
          </Link>
          <Link
            href="/diagnostic"
            className="block px-3 py-2 rounded-md text-base font-medium text-accent hover:bg-muted"
            onClick={() => setIsOpen(false)}
          >
            Skin Quiz
          </Link>
          <Link
            href="/recommend"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            onClick={() => setIsOpen(false)}
          >
            AI Recommendations
          </Link>
          <div className="pt-4">
            <Button variant="default" className="w-full rounded-full">
              Expert Tips
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
