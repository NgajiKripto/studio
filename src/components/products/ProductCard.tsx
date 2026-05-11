"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const [matchScore, setMatchScore] = useState<number | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("muakeup_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        let score = 0;

        const skinTypeMatch = product.skinTypes.some((t: any) => t.skinType === profile.skinType);
        const skinToneMatch = product.skinTones.some((t: any) => t.skinTone === profile.skinTone);
        const faceShapeMatch = product.faceShapes.some((t: any) => t.faceShape === profile.faceShape);

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
      <div className="bg-muted/50 rounded-2xl overflow-hidden aspect-[4/5] relative mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Match Score Badge */}
        {matchScore !== null && matchScore > 0 && (
          <div className={cn(
            "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
            matchScore >= 80
              ? "bg-primary/90 text-primary-foreground"
              : "bg-white/90 text-foreground"
          )}>
            {matchScore}% Match
          </div>
        )}

        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
          <Heart className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {product.priceEstimate}
        </p>
      </div>
    </Link>
  );
}
