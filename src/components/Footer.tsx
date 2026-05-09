import Link from "next/link";
import { Sparkles, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-headline text-xl font-bold tracking-tight text-primary">
                Muakeup
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Empowering your beauty journey with expert curation. Our mission is to provide personalized, professional makeup recommendations tailored to your unique features.
            </p>
            <div className="flex space-x-4 mt-6">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-primary mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/catalog" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/recommend" className="hover:text-primary transition-colors">AI Recommendations</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Beauty Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-primary mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Muakeup. Crafted for your beauty.
        </div>
      </div>
    </footer>
  );
}