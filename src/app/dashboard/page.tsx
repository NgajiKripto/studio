import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Eye, MousePointerClick, Wallet, TrendingUp } from "lucide-react";
import { DashboardProductSelector } from "@/components/dashboard/ProductSelector";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Dashboard - Glow Circle | Muakeup",
  description: "Kelola profil Glow Circle dan lihat statistik affiliate kamu.",
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

  // Get affiliate click count
  const totalClicks = await prisma.affiliateClick.count({
    where: { userId },
  });

  // Get clicks this month
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

  // Check if user is premium
  const isPremium = ["GLOW_BASIC", "GLOW_PRO", "GLOW_STAR"].includes(user.role);

  if (!isPremium) {
    return (
      <main className="min-h-screen bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="p-8 rounded-2xl border border-border/50 text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="font-headline text-2xl font-bold text-foreground">
              Upgrade ke Glow Circle
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Dapatkan profil publik, bagikan rekomendasi produk, dan hasilkan uang dari affiliate link kamu.
            </p>
          </Card>
        </div>
      </main>
    );
  }

  const allProducts = await getAllProducts();
  const selectedProductIds = user.recommendedProducts.map((rp) => rp.productId);

  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="mb-10 space-y-2">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Kelola profil Glow Circle dan pantau performa affiliate kamu.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card className="p-5 rounded-xl border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Profile Views
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Eye className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <p className="font-headline text-3xl font-bold text-foreground">
              {stats.profileViews.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-muted-foreground">Total kunjungan profil</p>
          </Card>

          <Card className="p-5 rounded-xl border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Klik
              </span>
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <MousePointerClick className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <p className="font-headline text-3xl font-bold text-foreground">
              {stats.totalClicks.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-muted-foreground">
              {stats.monthlyClicks} bulan ini
            </p>
          </Card>

          <Card className="p-5 rounded-xl border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Saldo
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <p className="font-headline text-3xl font-bold text-foreground">
              Rp {stats.saldo.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-muted-foreground">Saldo terkumpul</p>
          </Card>

          <Card className="p-5 rounded-xl border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Produk Aktif
              </span>
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-pink-500" />
              </div>
            </div>
            <p className="font-headline text-3xl font-bold text-foreground">
              {user.recommendedProducts.length}
            </p>
            <p className="text-xs text-muted-foreground">Di profil publik kamu</p>
          </Card>
        </div>

        {/* Affiliate Code */}
        <Card className="p-6 rounded-2xl border border-border/50 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-headline text-lg font-bold text-foreground">Kode Affiliate</h3>
              <p className="text-sm text-muted-foreground">
                Kode unik kamu yang tertanam di setiap link produk.
              </p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-secondary font-mono text-sm font-bold text-foreground">
              {user.affiliateCode || "—"}
            </div>
          </div>
        </Card>

        {/* Product Selector */}
        <section>
          <div className="mb-6 space-y-1">
            <h2 className="font-headline text-xl font-bold text-foreground">
              Pilih Produk Rekomendasi
            </h2>
            <p className="text-sm text-muted-foreground">
              Produk yang kamu pilih akan tampil di profil publik dengan affiliate link kamu.
            </p>
          </div>

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
