
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Sparkles, ShoppingCart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductDetailClientProps {
  productId: string;
  productName: string;
  brandName: string;
  tags: {
    skinTypes: string[];
    skinTones: string[];
    faceShapes: string[];
  };
}

export function ProductDetailClient({ productId, tags, brandName }: ProductDetailClientProps) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("muakeup_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  const getCompatibility = (type: "SKIN_TYPE" | "SKIN_TONE" | "FACE_SHAPE") => {
    if (!profile) return null;

    if (type === "SKIN_TYPE") {
      const isMatch = tags.skinTypes.includes(profile.skinType);
      return {
        status: isMatch ? "MATCH" : "WARNING",
        label: "Jenis Kulit",
        value: profile.skinType,
        message: isMatch 
          ? "Formulanya didesain khusus untuk mengimbangi kebutuhan kulitmu." 
          : "Gunakan primer atau setting spray tambahan untuk hasil terbaik.",
      };
    }

    if (type === "SKIN_TONE") {
      const isMatch = tags.skinTones.includes(profile.skinTone);
      return {
        status: isMatch ? "MATCH" : "WARNING",
        label: "Warna & Undertone",
        value: profile.skinTone.replace('_', ' '),
        message: isMatch 
          ? "Pigmentasi produk ini akan menyatu sempurna dengan undertone-mu." 
          : "Tersedia shade lain, pastikan memilih yang memiliki tint sesuai profilmu.",
      };
    }

    if (type === "FACE_SHAPE") {
      const isMatch = tags.faceShapes.includes(profile.faceShape);
      return {
        status: isMatch ? "MATCH" : "INFO",
        label: "Bentuk Wajah",
        value: profile.faceShape,
        message: isMatch 
          ? "Tekstur produk ini sangat ideal untuk teknik contouring wajahmu." 
          : "Bisa digunakan, namun fokuskan aplikasi di area luar tulang pipi.",
      };
    }

    return null;
  };

  const skinComp = getCompatibility("SKIN_TYPE");
  const toneComp = getCompatibility("SKIN_TONE");
  const shapeComp = getCompatibility("FACE_SHAPE");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Compatibility Section */}
      <section className="space-y-6">
        <h3 className="text-xl font-headline font-bold flex items-center gap-2">
          Analisis Kompatibilitas {profile && <Sparkles className="h-4 w-4 text-accent" />}
        </h3>

        {!profile ? (
          <div className="p-8 rounded-lg border-2 border-dashed border-border bg-secondary/10 text-center space-y-4">
            <p className="text-muted-foreground">Belum tahu tipe kulit atau bentuk wajahmu? Biarkan kami menganalisisnya untukmu.</p>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/diagnostic">Mulai Kuis Diagnostik <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {[skinComp, toneComp, shapeComp].map((comp, idx) => comp && (
              <div key={idx} className={cn(
                "p-5 rounded-lg border bg-card flex items-start gap-4 transition-all hover:shadow-md",
                comp.status === "MATCH" ? "border-primary/70" : "border-secondary/50"
              )}>
                <div className={cn(
                  "p-2 rounded-lg shrink-0",
                  comp.status === "MATCH" ? "bg-primary text-foreground" : "bg-secondary/30 text-link"
                )}>
                  {comp.status === "MATCH" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{comp.label}:</span>
                    <span className="text-xs font-bold text-foreground">{comp.value}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {comp.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Action Buttons */}
      <div className="pt-6 flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="h-16 px-10 text-lg font-bold shadow-xl flex-grow gap-3" asChild>
          <Link href={`/out?productId=${productId}`}>
            Dapatkan di Official {brandName} <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="h-16 w-16 flex-shrink-0 border-accent/40 hover:border-accent">
          <ShoppingCart className="h-6 w-6 text-primary" />
        </Button>
      </div>
    </div>
  );
}
