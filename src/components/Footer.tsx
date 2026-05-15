"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer aria-label="Site footer" className="relative bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                Muakeup
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-1 mb-1" />
              </span>
            </Link>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed font-body">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40 font-body">
              <span>{t.footer.madeWith}</span>
              <span className="text-primary">&#10084;</span>
              <span>{t.footer.forBeautyEnthusiasts}</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Explore links" className="md:col-span-3 space-y-5">
            <h3 className="font-body font-medium text-xs text-white/40 uppercase tracking-[0.15em]">
              {t.footer.explore}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/diagnostic" className="text-sm text-white/70 hover:text-white transition-colors font-body">
                  {t.footer.skinDiagnostic}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-white/70 hover:text-white transition-colors font-body">
                  {t.footer.beautyCatalog}
                </Link>
              </li>
              <li>
                <Link href="/recommend" className="text-sm text-white/70 hover:text-white transition-colors font-body">
                  {t.footer.recommendations}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Company links" className="md:col-span-4 space-y-5">
            <h3 className="font-body font-medium text-xs text-white/40 uppercase tracking-[0.15em]">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" aria-disabled="true" className="text-sm text-white/70 hover:text-white transition-colors font-body">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="#" aria-disabled="true" className="text-sm text-white/70 hover:text-white transition-colors font-body">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="#" aria-disabled="true" className="text-sm text-white/70 hover:text-white transition-colors font-body">
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link href="#" aria-disabled="true" className="text-sm text-white/70 hover:text-white transition-colors font-body">
                  {t.footer.contactUs}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-body">
            &copy; {new Date().getFullYear()} Muakeup. {t.footer.allRightsReserved}
          </p>
          <span className="text-xs text-white/30 font-body">
            v1.0
          </span>
        </div>
      </div>
    </footer>
  );
}
