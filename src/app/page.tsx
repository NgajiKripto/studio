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
  let featuredProducts: Awaited<ReturnType<typeof prisma.product.findMany>> = [];

  if (process.env.DATABASE_URL) {
    try {
      featuredProducts = await prisma.product.findMany({
        take: 4,
        include: {
          skinTypes: true,
          skinTones: true,
          faceShapes: true,
        },
        orderBy: {
          name: 'asc'
        }
      });
    } catch {
      featuredProducts = [];
    }
  }

  return <HomeContent featuredProducts={featuredProducts} />;
}
