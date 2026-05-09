import Link from "next/link";
import { Sparkles, Instagram, Facebook, Twitter, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-primary">
                Muakeup
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Memberdayakan perjalanan kecantikan Anda dengan kurasi ahli. Misi kami adalah memberikan rekomendasi makeup profesional yang disesuaikan secara unik untuk fitur wajah Anda.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-primary mb-6">Navigasi</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">Semua Produk</Link></li>
              <li><Link href="/diagnostic" className="hover:text-primary transition-colors">Kuis Diagnostik</Link></li>
              <li><Link href="/recommend" className="hover:text-primary transition-colors">Rekomendasi AI</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Admin Panel</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-primary mb-6">Bantuan</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Muakeup. Crafted for your beauty by Professional MUAs.</p>
          <div className="flex gap-6">
            <span>Made with Love</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
