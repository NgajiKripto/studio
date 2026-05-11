"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mock-data";
import { Heart, Star, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="glass-card rounded-2xl overflow-hidden hover-lift">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          <Image
            src={product.imageUrl}
            alt={`Produk ${product.name} dari ${product.brand} - makeup ${product.category}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            data-ai-hint="makeup product"
          />

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked ? "text-pink-500 fill-pink-500" : "text-muted-foreground"
              }`}
            />
          </button>

          {/* Quick View */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center shadow-lg">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors line-clamp-1 text-sm">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">
              {product.priceEstimate}
            </p>
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium text-muted-foreground">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
