"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkinTwinBadge } from "@/components/SkinTwinBadge";
import { ArrowRight, Users, Crown, Gem, Star } from "lucide-react";

interface SkinTwin {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  role: string;
  bio: string | null;
}

interface SkinTwinRecommendationProps {
  skinType: string;
  skinTone: string;
  faceShape: string;
}

function getRoleIcon(role: string) {
  switch (role) {
    case "GLOW_STAR": return <Crown className="h-3 w-3" />;
    case "GLOW_PRO": return <Gem className="h-3 w-3" />;
    case "GLOW_BASIC": return <Star className="h-3 w-3" />;
    default: return null;
  }
}

function getRoleLabel(role: string) {
  switch (role) {
    case "GLOW_STAR": return "Star";
    case "GLOW_PRO": return "Pro";
    case "GLOW_BASIC": return "Basic";
    default: return "";
  }
}

export function SkinTwinRecommendation({ skinType, skinTone, faceShape }: SkinTwinRecommendationProps) {
  const [twins, setTwins] = useState<SkinTwin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkinTwins() {
      try {
        const params = new URLSearchParams({ skinType, skinTone, faceShape });
        const res = await fetch(`/api/skin-twins?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setTwins(data.twins || []);
        }
      } catch (error) {
        console.error("Failed to fetch skin twins:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkinTwins();
  }, [skinType, skinTone, faceShape]);

  if (loading) {
    return (
      <Card className="p-6 rounded-2xl border border-border/50 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded-full bg-muted" />
          <div className="h-16 w-16 rounded-full bg-muted" />
        </div>
      </Card>
    );
  }

  if (twins.length === 0) return null;

  return (
    <Card className="p-6 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-purple-500/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-headline text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-pink-500" />
            Skin Twin Kamu
          </h3>
          <p className="text-sm text-muted-foreground">
            Beauty creators dengan profil kulit yang sama!
          </p>
        </div>
        <SkinTwinBadge matchPercentage={90} size="sm" />
      </div>

      {/* Twin Cards */}
      <div className="flex flex-col gap-3">
        {twins.slice(0, 3).map((twin) => (
          <Link key={twin.id} href={`/profile/${twin.username}`}>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-pink-500/30 hover:shadow-sm transition-all cursor-pointer">
              <Avatar className="h-12 w-12 border-2 border-pink-500/20">
                <AvatarImage src={twin.avatarUrl || undefined} alt={twin.name} />
                <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600">
                  {twin.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {twin.name}
                  </p>
                  <Badge className="bg-gradient-to-r from-pink-400/80 to-purple-400/80 text-white border-0 text-[9px] gap-0.5">
                    {getRoleIcon(twin.role)} {getRoleLabel(twin.role)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {twin.bio || `@${twin.username}`}
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Button
        asChild
        variant="outline"
        className="w-full rounded-full border-pink-500/20 text-pink-600 hover:bg-pink-500/5 gap-2"
      >
        <Link href="/circle?match=true">
          Lihat Semua Skin Twin <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}
