export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { HomeContent } from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Muakeup | Temukan Makeup yang Memahamimu",
  description:
    "Bingung pilih foundation? Muakeup bantu kamu memilih makeup sesuai jenis kulit, undertone, dan bentuk wajah. Dapatkan rekomendasi personal dari MUA sekarang.",
  openGraph: {
    title: "Muakeup | Temukan Makeup yang Memahamimu",
    description:
      "Bingung pilih foundation? Muakeup bantu kamu memilih makeup sesuai jenis kulit, undertone, dan bentuk wajah.",
  },
};

export default async function Home() {
  const featuredProducts = process.env.DATABASE_URL
    ? await prisma.product.findMany({
        take: 4,
        include: {
          skinTypes: true,
          skinTones: true,
          faceShapes: true,
        },
        orderBy: {
          name: 'asc'
        }
      })
    : [];

  return <HomeContent featuredProducts={featuredProducts} />;
}
