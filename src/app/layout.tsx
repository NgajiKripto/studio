import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: 'Muakeup - Rekomendasi Makeup Personal dari MUA',
    template: '%s | Muakeup - Rekomendasi Makeup Personal dari MUA',
  },
  description: 'Temukan makeup yang cocok untuk jenis kulit, warna kulit, dan bentuk wajahmu. Rekomendasi dari MUA profesional, beli via link affiliate brand ternama.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Muakeup',
    title: 'Muakeup - Rekomendasi Makeup Personal dari MUA',
    description: 'Temukan makeup yang cocok untuk jenis kulit, warna kulit, dan bentuk wajahmu. Rekomendasi dari MUA profesional.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muakeup - Rekomendasi Makeup Personal dari MUA',
    description: 'Temukan makeup yang cocok untuk jenis kulit, warna kulit, dan bentuk wajahmu. Rekomendasi dari MUA profesional.',
  },
  other: {
    'theme-color': '#C9BEFF',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Muakeup",
    url: "https://muakeup.com",
    description: "Rekomendasi makeup personal dari MUA profesional berdasarkan jenis kulit, warna kulit, dan bentuk wajah.",
  };

  return (
    <html lang="id">
      <head>
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <Navbar />
          <div className="flex-grow" id="main-content" role="main">
            {children}
          </div>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
