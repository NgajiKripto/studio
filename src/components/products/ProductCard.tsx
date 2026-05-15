"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/lib/types";

interface ProductCardProps {
  product: ProductWithRelations;
}

export function ProductCard({ product }: ProductCardProps) {
  const [matchScore, setMatchScore] = useState<number | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("muakeup_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        let score = 0;

        const skinTypeMatch = product.skinTypes.some((t) => t.skinType === profile.skinType);
        const skinToneMatch = product.skinTones.some((t) => t.skinTone === profile.skinTone);
        const faceShapeMatch = product.faceShapes.some((t) => t.faceShape === profile.faceShape);

        if (skinTypeMatch) score += 40;
        if (skinToneMatch) score += 40;
        if (faceShapeMatch) score += 20;

        setMatchScore(score);
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, [product]);

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="editorial-card rounded-2xl overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
          <Image
            src={product.imageUrl}
            alt={`${product.name} by ${product.brand}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Match Score Badge */}
          {matchScore !== null && matchScore > 0 && (
            <div className={cn(
              "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm font-body",
              matchScore >= 80
                ? "bg-primary/90 text-white"
                : "bg-white/90 text-foreground"
            )}>
              {matchScore}% Match
            </div>
          )}

          <button
            aria-label={`Add ${product.name} to favorites`}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all opacity-0 group-hover:opacity-100 duration-300"
          >
            <Heart className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Category tag */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-medium uppercase tracking-wider text-muted-foreground font-body">
              {product.category}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-1.5">
          <h3 className="font-body font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-sm">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground font-body">
              {product.priceEstimate}
            </p>
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 text-primary fill-primary" />
              <span className="text-xs text-muted-foreground font-body">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
