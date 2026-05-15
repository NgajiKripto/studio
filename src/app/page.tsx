export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { HomeContent } from "@/components/HomeContent";
import type { ProductWithRelations } from "@/lib/types";

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
  let featuredProducts: ProductWithRelations[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const products = await prisma.product.findMany({
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
      featuredProducts = products as unknown as ProductWithRelations[];
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to load featured products for homepage:", error);
      }
    }
  }

  return <HomeContent featuredProducts={featuredProducts} />;
}
