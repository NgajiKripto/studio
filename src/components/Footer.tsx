import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 gradient-bg-soft opacity-50" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative border-t border-white/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground tracking-tight">
                  Muakeup
                </span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Personalized beauty for every skin. Discover your perfect match with our
                Triple Skin Diagnostic and find makeup that truly celebrates you.
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-pink-400 fill-pink-400" />
                <span>for beauty enthusiasts</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">
                Explore
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/diagnostic" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Skin Diagnostic
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Beauty Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/circle" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Glow Circle
                  </Link>
                </li>
                <li>
                  <Link href="/recommend" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Recommendations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Muakeup. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-white/50 border border-white/40">
                v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
