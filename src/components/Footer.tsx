import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="font-headline text-xl font-bold text-foreground">
            Muakeup
          </Link>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link>
            <Link href="/diagnostic" className="font-semibold text-foreground hover:text-primary transition-colors">
              Diagnostic Quiz
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Muakeup. Personalized beauty for every skin.
          </p>
        </div>
      </div>
    </footer>
  );
}
