import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Star, Gem, ExternalLink, MessageCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ username: string }>;
}

function getRoleBadge(role: string) {
  switch (role) {
    case "GLOW_STAR":
      return (
        <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0 text-xs gap-1">
          <Crown className="h-3 w-3" /> Glow Star
        </Badge>
      );
    case "GLOW_PRO":
      return (
        <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 text-xs gap-1">
          <Gem className="h-3 w-3" /> Glow Pro
        </Badge>
      );
    case "GLOW_BASIC":
      return (
        <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white border-0 text-xs gap-1">
          <Star className="h-3 w-3" /> Glow Basic
        </Badge>
      );
    default:
      return null;
  }
}

async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      recommendedProducts: {
        include: {
          product: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return user;
}

async function incrementProfileView(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { profileViews: { increment: 1 } },
  });
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const user = await getUser(username);
  if (!user) return { title: "User Not Found - Muakeup" };

  return {
    title: `${user.name} - Glow Circle | Muakeup`,
    description: user.bio || `Lihat profil Beauty DNA dan rekomendasi produk dari ${user.name}`,
  };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  // Increment profile view count
  await incrementProfileView(user.id);

  const isPremium = ["GLOW_BASIC", "GLOW_PRO", "GLOW_STAR"].includes(user.role);

  return (
    <main className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Profile Header */}
        <div className="text-center space-y-6 mb-12">
          <Avatar className="h-28 w-28 mx-auto border-4 border-primary/20 shadow-lg">
            <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3">
              <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
                {user.name}
              </h1>
              {isPremium && getRoleBadge(user.role)}
            </div>
            <p className="text-muted-foreground">@{user.username}</p>
            {user.bio && (
              <p className="text-muted-foreground max-w-md mx-auto mt-3">
                {user.bio}
              </p>
            )}
          </div>

          {/* Tanya via Token button (disabled for now) */}
          <Button variant="outline" className="rounded-full gap-2" disabled>
            <MessageCircle className="h-4 w-4" />
            Tanya via Token
            <Badge variant="secondary" className="text-[10px]">Coming Soon</Badge>
          </Button>
        </div>

        {/* Beauty DNA Section */}
        <section className="mb-12">
          <h2 className="font-headline text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-lg">🧬</span> Beauty DNA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5 rounded-xl border border-border/50 bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shadow-sm">
                  <span className="text-base">💧</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Jenis Kulit</p>
                  <p className="font-headline text-lg font-bold text-foreground">
                    {user.skinType || "—"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-xl border border-border/50 bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shadow-sm">
                  <span className="text-base">🎨</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Warna Kulit</p>
                  <p className="font-headline text-lg font-bold text-foreground">
                    {user.skinTone?.replace("_", " ") || "—"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-xl border border-border/50 bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shadow-sm">
                  <span className="text-base">💎</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Bentuk Wajah</p>
                  <p className="font-headline text-lg font-bold text-foreground">
                    {user.faceShape || "—"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Recommended Products Section */}
        <section>
          <h2 className="font-headline text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-pink-500" /> Produk Rekomendasi
          </h2>

          {user.recommendedProducts.length === 0 ? (
            <Card className="p-8 rounded-2xl border border-border/50 text-center">
              <p className="text-muted-foreground">
                Belum ada produk rekomendasi dari {user.name}.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.recommendedProducts.map(({ product, note }) => (
                <Card
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-border/50 group hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-[10px] bg-card/90 backdrop-blur-sm">
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {product.brand}
                      </p>
                      <h3 className="font-headline text-sm font-bold text-foreground line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    {note && (
                      <p className="text-xs text-muted-foreground italic line-clamp-2">
                        &ldquo;{note}&rdquo;
                      </p>
                    )}

                    <p className="text-sm font-semibold text-foreground">
                      {product.priceEstimate}
                    </p>

                    {/* Affiliate Buy Button */}
                    <Button
                      asChild
                      size="sm"
                      className="w-full rounded-full gap-2 bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Link
                        href={`/api/affiliate/click?ref=${user.affiliateCode}&product=${product.id}&url=${encodeURIComponent(product.affiliateUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Beli Produk
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
