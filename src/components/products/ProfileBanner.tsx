
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, X, Fingerprint, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProfileBanner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem("muakeup_profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const applyProfileFilters = () => {
    if (!profile) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("skin_types", profile.skinType);
    params.set("skin_tones", profile.skinTone);
    params.set("face_shapes", profile.faceShape);
    
    router.push(`/products?${params.toString()}`);
  };

  const isProfileApplied = () => {
    if (!profile) return false;
    return (
      searchParams.get("skin_types") === profile.skinType &&
      searchParams.get("skin_tones") === profile.skinTone &&
      searchParams.get("face_shapes") === profile.faceShape
    );
  };

  if (!profile || !isVisible) return null;

  return (
    <div className={cn(
      "relative overflow-hidden p-6 rounded-[2.5rem] border transition-all animate-in slide-in-from-top-4 duration-500",
      isProfileApplied() 
        ? "bg-accent/5 border-accent/20" 
        : "bg-primary/5 border-primary/20"
    )}>
      <div className="absolute top-0 right-0 -z-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
            isProfileApplied() ? "bg-accent text-white" : "bg-primary text-white"
          )}>
            <Fingerprint className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              Profil Kecantikan Anda Terdeteksi
              {isProfileApplied() && <CheckCircle2 className="h-4 w-4 text-accent" />}
            </h3>
            <p className="text-sm text-muted-foreground">
              {profile.skinType} • {profile.skinTone.replace('_', ' ')} • {profile.faceShape}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {!isProfileApplied() ? (
            <Button onClick={applyProfileFilters} className="rounded-full shadow-lg gap-2 w-full md:w-auto">
              <Sparkles className="h-4 w-4" /> Gunakan Filter Profil
            </Button>
          ) : (
            <span className="text-xs font-bold text-accent uppercase tracking-widest px-4 py-2 bg-accent/10 rounded-full">
              Filter Profil Aktif
            </span>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
