
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: any; // Using any for brevity, should be type-safe in production
}

export function ProductCard({ product }: ProductCardProps) {
  const [matchScore, setMatchScore] = useState<number | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("muakeup_profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        let score = 0;
        
        // Match calculation logic
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
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white rounded-[2.5rem]">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Match Score Badge */}
        {matchScore !== null && (
          <div className={cn(
            "absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border",
            matchScore >= 80 ? "bg-accent/90 text-white border-accent" : "bg-white/90 text-primary border-primary/20"
          )}>
            {matchScore}% Match
          </div>
        )}

        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all opacity-0 group-hover:opacity-100"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <CardHeader className="p-6 pb-0">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{product.brand}</p>
            <h3 className="text-xl font-headline font-bold leading-tight line-clamp-1">{product.name}</h3>
          </div>
          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground text-[10px] uppercase font-bold rounded-full">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-4">
        <div className="bg-secondary/20 p-4 rounded-2xl relative overflow-hidden">
          <div className="absolute top-1 right-1 opacity-10">
            <Star className="h-8 w-8 fill-primary" />
          </div>
          <p className="text-[10px] uppercase font-bold text-primary flex items-center gap-1 mb-1">
             Expert Verdict
          </p>
          <p className="text-xs italic text-muted-foreground line-clamp-2 leading-relaxed">
            "{product.muaVerdict}"
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold text-primary">{product.priceEstimate}</span>
        <Button size="sm" className="rounded-full shadow-md group-hover:px-6 transition-all" asChild>
          <Link href={`/product/${product.id}`}>
            Detail <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
