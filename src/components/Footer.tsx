import Link from "next/link";
import { Sparkles, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/70">
      <div className="container mx-auto px-4 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-headline text-2xl font-bold text-foreground">Muakeup</span>
            </Link>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Rekomendasi makeup personal berbasis standar MUA profesional untuk bantu kamu memilih produk yang paling cocok.
            </p>
            <div className="flex gap-4 text-link">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <div key={idx} className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/50">
                  <Icon className="h-5 w-5" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-headline text-sm font-bold uppercase tracking-wide text-foreground">Navigasi</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="text-link hover:opacity-80">Semua Produk</Link></li>
              <li><Link href="/diagnostic" className="text-link hover:opacity-80">Kuis Diagnostik</Link></li>
              <li><Link href="/recommend" className="text-link hover:opacity-80">Rekomendasi AI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-headline text-sm font-bold uppercase tracking-wide text-foreground">Bantuan</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="text-link hover:opacity-80">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="text-link hover:opacity-80">Syarat &amp; Ketentuan</Link></li>
              <li><Link href="#" className="text-link hover:opacity-80">Hubungi Kami</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Muakeup. Crafted for your beauty by Professional MUAs.</p>
        </div>
      </div>
    </footer>
  );
}
