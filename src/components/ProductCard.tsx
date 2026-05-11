import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Product } from "@/lib/mock-data";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint="makeup product"
        />
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <Badge variant="secondary" className="bg-white/80 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold">
            {product.category}
          </Badge>
        </div>
      </Link>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{product.brand}</p>
            <h3 className="font-headline text-lg leading-tight mt-0.5 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-3 bg-secondary/30 p-2.5 rounded-lg">
          <p className="text-[10px] uppercase tracking-tighter text-primary font-bold flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary" /> MUA Verdict
          </p>
          <p className="text-xs italic text-foreground/80 line-clamp-2 mt-1">
            "{product.muaVerdict}"
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="font-bold text-primary">{product.priceEstimate}</span>
        <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary hover:bg-primary/5 h-8 px-4" asChild>
          <Link href={product.affiliateUrl}>
            Buy Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
