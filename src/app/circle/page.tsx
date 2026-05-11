export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { CircleGrid } from "@/components/circle/CircleGrid";

export const metadata = {
  title: "Glow Circle - Muakeup",
  description: "Temukan Skin Twin kamu dan beauty creators dengan profil kulit yang sama.",
};

async function getPremiumUsers() {
  const users = await prisma.user.findMany({
    where: {
      role: { in: ["GLOW_BASIC", "GLOW_PRO", "GLOW_STAR"] },
      subscriptionStatus: "ACTIVE",
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      bio: true,
      role: true,
      skinType: true,
      skinTone: true,
      faceShape: true,
      affiliateCode: true,
      _count: {
        select: {
          recommendedProducts: true,
        },
      },
    },
    orderBy: [
      { role: "desc" }, // GLOW_STAR first
      { createdAt: "desc" },
    ],
  });

  return users;
}

export default async function CirclePage() {
  const premiumUsers = await getPremiumUsers();

  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 text-pink-600 text-xs font-semibold tracking-wide uppercase">
            Glow Circle
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Find Your Skin Twin
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Temukan beauty creators dengan profil kulit yang sama denganmu. Dapatkan rekomendasi produk yang sudah terbukti cocok.
          </p>
        </div>

        {/* Grid */}
        <CircleGrid users={premiumUsers} />
      </div>
    </main>
  );
}
