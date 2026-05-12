export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardProductSelector } from "@/components/dashboard/ProductSelector";
import { DashboardHeader, DashboardStats, DashboardProductSection, DashboardUpgradeCard } from "@/components/dashboard/DashboardContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Dashboard | Muakeup",
  description: "Kelola profil dan lihat statistik affiliate kamu.",
};

async function getDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      recommendedProducts: {
        include: {
          product: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) return null;

  const totalClicks = await prisma.affiliateClick.count({
    where: { userId },
  });

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const monthlyClicks = await prisma.affiliateClick.count({
    where: {
      userId,
      createdAt: { gte: startOfMonth },
    },
  });

  return {
    user,
    stats: {
      profileViews: user.profileViews,
      totalClicks,
      monthlyClicks,
      saldo: user.saldo,
    },
  };
}

async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      brand: true,
      category: true,
      imageUrl: true,
      priceEstimate: true,
    },
  });
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const data = await getDashboardData(session.user.id);

  if (!data) {
    redirect("/");
  }

  const { user, stats } = data;

  const isPremium = ["GLOW_BASIC", "GLOW_PRO", "GLOW_STAR"].includes(user.role);

  if (!isPremium) {
    return (
      <main className="min-h-screen bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <DashboardUpgradeCard />
        </div>
      </main>
    );
  }

  const allProducts = await getAllProducts();
  const selectedProductIds = user.recommendedProducts.map((rp: any) => rp.productId);

  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <DashboardHeader />

        <DashboardStats
          stats={stats}
          recommendedProductsCount={user.recommendedProducts.length}
          affiliateCode={user.affiliateCode}
        />

        <section>
          <DashboardProductSection />
          <DashboardProductSelector
            allProducts={allProducts}
            selectedProductIds={selectedProductIds}
            userId={user.id}
          />
        </section>
      </div>
    </main>
  );
}
