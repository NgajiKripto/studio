import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
