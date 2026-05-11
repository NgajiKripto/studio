"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkinTwinBadge } from "@/components/SkinTwinBadge";
import { Crown, Star, Gem, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircleUser {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
  role: "GLOW_BASIC" | "GLOW_PRO" | "GLOW_STAR";
  skinType: string | null;
  skinTone: string | null;
  faceShape: string | null;
  affiliateCode: string | null;
  _count: {
    recommendedProducts: number;
  };
}

interface VisitorProfile {
  skinType: string;
  skinTone: string;
  faceShape: string;
}

interface CircleGridProps {
  users: CircleUser[];
}

function calculateSkinMatch(user: CircleUser, visitor: VisitorProfile): number {
  let score = 0;
  const total = 3;

  if (user.skinType === visitor.skinType) score++;
  if (user.skinTone === visitor.skinTone) score++;
  if (user.faceShape === visitor.faceShape) score++;

  // 3/3 = 90% (exact match), 2/3 = 67%, 1/3 = 33%
  if (score === 3) return 90;
  if (score === 2) return 67;
  if (score === 1) return 33;
  return 0;
}

function getRolePriority(role: string): number {
  switch (role) {
    case "GLOW_STAR": return 3;
    case "GLOW_PRO": return 2;
    case "GLOW_BASIC": return 1;
    default: return 0;
  }
}

function getRoleBadge(role: string) {
  switch (role) {
    case "GLOW_STAR":
      return (
        <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0 text-[10px] gap-1">
          <Crown className="h-3 w-3" /> Star
        </Badge>
      );
    case "GLOW_PRO":
      return (
        <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 text-[10px] gap-1">
          <Gem className="h-3 w-3" /> Pro
        </Badge>
      );
    case "GLOW_BASIC":
      return (
        <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white border-0 text-[10px] gap-1">
          <Star className="h-3 w-3" /> Basic
        </Badge>
      );
    default:
      return null;
  }
}

export function CircleGrid({ users }: CircleGridProps) {
  const [visitorProfile, setVisitorProfile] = useState<VisitorProfile | null>(null);
  const [sortedUsers, setSortedUsers] = useState<(CircleUser & { matchScore: number })[]>([]);

  useEffect(() => {
    // Load visitor profile from localStorage
    const stored = localStorage.getItem("muakeup_profile");
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setVisitorProfile(profile);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    const usersWithScore = users.map((user) => ({
      ...user,
      matchScore: visitorProfile ? calculateSkinMatch(user, visitorProfile) : 0,
    }));

    // Sort: Skin Twin (90%) first, then by role priority
    usersWithScore.sort((a, b) => {
      // First priority: skin match score (higher = first)
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      // Second priority: role level
      return getRolePriority(b.role) - getRolePriority(a.role);
    });

    setSortedUsers(usersWithScore);
  }, [users, visitorProfile]);

  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-headline text-xl font-bold text-foreground mb-2">
          Belum ada member Glow Circle
        </h3>
        <p className="text-muted-foreground">
          Jadilah yang pertama bergabung dengan Glow Circle!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info banner if visitor has profile */}
      {visitorProfile && (
        <div className="bg-gradient-to-r from-pink-500/5 to-purple-500/5 border border-pink-500/10 rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Menampilkan berdasarkan kecocokan profil kulitmu:{" "}
            <span className="font-semibold text-foreground">
              {visitorProfile.skinType} &middot; {visitorProfile.skinTone.replace("_", " ")} &middot; {visitorProfile.faceShape}
            </span>
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.map((user) => (
          <Link key={user.id} href={`/profile/${user.username}`}>
            <Card
              className={cn(
                "group relative overflow-hidden border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 cursor-pointer",
                user.matchScore >= 90 && "border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-purple-500/5"
              )}
            >
              {/* Match Badge */}
              {user.matchScore >= 33 && visitorProfile && (
                <div className="absolute top-4 right-4">
                  <SkinTwinBadge matchPercentage={user.matchScore} size="sm" />
                </div>
              )}

              {/* User Info */}
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-20 w-20 border-2 border-border group-hover:border-primary/30 transition-colors">
                  <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
                  <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-headline text-lg font-bold text-foreground">
                      {user.name}
                    </h3>
                    {getRoleBadge(user.role)}
                  </div>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                </div>

                {user.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {user.bio}
                  </p>
                )}

                {/* Beauty DNA Tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {user.skinType && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-medium">
                      {user.skinType}
                    </span>
                  )}
                  {user.skinTone && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-medium">
                      {user.skinTone.replace("_", " ")}
                    </span>
                  )}
                  {user.faceShape && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-medium">
                      {user.faceShape}
                    </span>
                  )}
                </div>

                {/* Product count */}
                {user._count.recommendedProducts > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Package className="h-3.5 w-3.5" />
                    <span>{user._count.recommendedProducts} produk rekomendasi</span>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
