"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  RotateCcw, 
  Check, 
  Info,
  Waves,
  Palette,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";

type Step = 1 | 2 | 3 | 4; // 4 is Results

interface DiagnosticProfile {
  skinType: SkinType;
  skinTone: SkinTone;
  faceShape: FaceShape;
}

export function DiagnosticQuiz() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [progress, setProgress] = useState(33);

  // Selections
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  
  // Undertone Logic
  const [undertoneAnswers, setUndertoneAnswers] = useState({
    jewelry: "" as "WARM" | "COOL" | "NEUTRAL" | "",
    veins: "" as "WARM" | "COOL" | "NEUTRAL" | "",
    clothes: "" as "WARM" | "COOL" | "NEUTRAL" | "",
  });
  const [skinDepth, setSkinDepth] = useState<"FAIR" | "LIGHT" | "MEDIUM" | "TAN" | "DEEP" | null>(null);
  
  const [faceShape, setFaceShape] = useState<FaceShape | null>(null);
  const [results, setResults] = useState<DiagnosticProfile | null>(null);

  useEffect(() => {
    setProgress((step / 3) * 100);
  }, [step]);

  const calculateUndertone = () => {
    const counts = { WARM: 0, COOL: 0, NEUTRAL: 0 };
    Object.values(undertoneAnswers).forEach(val => {
      if (val) counts[val]++;
    });

    if (counts.WARM > counts.COOL && counts.WARM > counts.NEUTRAL) return "WARM";
    if (counts.COOL > counts.WARM && counts.COOL > counts.NEUTRAL) return "COOL";
    return "NEUTRAL";
  };

  const handleFinish = () => {
    if (!skinType || !skinDepth || !faceShape) return;

    const undertone = calculateUndertone();
    const finalSkinTone = `${skinDepth}_${undertone}` as SkinTone;

    const profile: DiagnosticProfile = {
      skinType,
      skinTone: finalSkinTone,
      faceShape,
    };

    setResults(profile);
    localStorage.setItem("muakeup_profile", JSON.stringify(profile));
    setStep(4);
  };

  const goToCatalog = () => {
    if (!results) return;
    const params = new URLSearchParams({
      type: results.skinType,
      tone: results.skinTone,
      shape: results.faceShape,
    });
    router.push(`/catalog?${params.toString()}`);
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Waves className="text-primary h-6 w-6" />
        </div>
        <h2 className="text-3xl font-headline font-bold">Jenis Kulitmu?</h2>
        <p className="text-muted-foreground">"Setelah cuci muka dan 30 menit tanpa produk, bagaimana kondisi kulitmu?"</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { id: "OILY", label: "Berminyak", desc: "Kilap di seluruh wajah, pori-pori terlihat jelas" },
          { id: "DRY", label: "Kering", desc: "Terasa ketat, kusam, terkadang ada area yang mengelupas" },
          { id: "COMBINATION", label: "Kombinasi", desc: "Berminyak di T-zone, tapi pipi normal/kering" },
          { id: "NORMAL", label: "Normal", desc: "Seimbang, tidak terlalu berminyak maupun kering" },
          { id: "SENSITIVE", label: "Sensitif", desc: "Mudah kemerahan, gatal, atau iritasi" },
        ].map((type) => (
          <div 
            key={type.id}
            onClick={() => setSkinType(type.id as SkinType)}
            className={cn(
              "group relative p-6 rounded-2xl border-2 transition-all cursor-pointer hover:border-primary/50",
              skinType === type.id ? "border-primary bg-primary/5 shadow-md" : "border-muted bg-white"
            )}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </div>
              {skinType === type.id && <CheckCircle2 className="text-primary h-6 w-6" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="text-accent h-6 w-6" />
        </div>
        <h2 className="text-3xl font-headline font-bold">Warna & Undertone</h2>
        <p className="text-muted-foreground">Logika MUA untuk menentukan warna yang paling menyatu dengan kulitmu.</p>
      </div>

      {/* Undertone Questions */}
      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-bold">1. Perhiasan mana yang membuatmu terlihat segar?</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "WARM", label: "Emas" },
              { val: "COOL", label: "Perak" },
              { val: "NEUTRAL", label: "Keduanya" }
            ].map(opt => (
              <Button 
                key={opt.val}
                variant={undertoneAnswers.jewelry === opt.val ? "default" : "outline"}
                className="rounded-xl h-12"
                onClick={() => setUndertoneAnswers({...undertoneAnswers, jewelry: opt.val as any})}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-bold">2. Apa warna nadi di pergelangan tanganmu?</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "WARM", label: "Hijau" },
              { val: "COOL", label: "Biru/Ungu" },
              { val: "NEUTRAL", label: "Campuran" }
            ].map(opt => (
              <Button 
                key={opt.val}
                variant={undertoneAnswers.veins === opt.val ? "default" : "outline"}
                className="rounded-xl h-12"
                onClick={() => setUndertoneAnswers({...undertoneAnswers, veins: opt.val as any})}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Skin Depth */}
        <div className="space-y-4 pt-4 border-t">
          <Label className="text-base font-bold">Pilih spektrum warna kulitmu:</Label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { id: "FAIR", color: "bg-[#F9E4D4]" },
              { id: "LIGHT", color: "bg-[#F3D0B5]" },
              { id: "MEDIUM", color: "bg-[#D9A078]" },
              { id: "TAN", color: "bg-[#A6714A]" },
              { id: "DEEP", color: "bg-[#5C3A24]" },
            ].map((d) => (
              <div 
                key={d.id}
                onClick={() => setSkinDepth(d.id as any)}
                className={cn(
                  "flex flex-col items-center gap-2 cursor-pointer group",
                  skinDepth === d.id ? "scale-110" : "opacity-60"
                )}
              >
                <div className={cn("w-full aspect-square rounded-full border-2", d.color, skinDepth === d.id ? "border-primary shadow-lg" : "border-transparent")} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">{d.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Fingerprint className="text-pink-600 h-6 w-6" />
        </div>
        <h2 className="text-3xl font-headline font-bold">Bentuk Wajah</h2>
        <p className="text-muted-foreground italic">"Lihat cermin, tarik rambut ke belakang. Bandingkan dengan diagram."</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { id: "OVAL", label: "Oval", desc: "Seimbang & Proporsional" },
          { id: "ROUND", label: "Round", desc: "Pipi Penuh & Dagu Bulat" },
          { id: "SQUARE", label: "Square", desc: "Rahang Tegas & Lebar" },
          { id: "HEART", label: "Heart", desc: "Dahi Lebar, Dagu Lancip" },
          { id: "DIAMOND", label: "Diamond", desc: "Tulang Pipi Menonjol" },
          { id: "OBLONG", label: "Oblong", desc: "Wajah Panjang & Ramping" },
        ].map((shape) => (
          <div 
            key={shape.id}
            onClick={() => setFaceShape(shape.id as FaceShape)}
            className={cn(
              "flex flex-col items-center p-6 rounded-2xl border-2 transition-all cursor-pointer",
              faceShape === shape.id ? "border-primary bg-primary/5 shadow-md" : "border-muted bg-white hover:border-primary/30"
            )}
          >
            <div className={cn(
              "w-12 h-16 border-2 border-muted-foreground/30 mb-4",
              shape.id === 'ROUND' && "rounded-full",
              shape.id === 'OVAL' && "rounded-[40%]",
              shape.id === 'SQUARE' && "rounded-sm",
              shape.id === 'HEART' && "rounded-b-full rounded-t-[10%]",
              shape.id === 'DIAMOND' && "rotate-45 scale-75 border-accent",
              shape.id === 'OBLONG' && "rounded-[30%] scale-y-110"
            )} />
            <h3 className="font-bold text-sm">{shape.label}</h3>
            <p className="text-[10px] text-muted-foreground text-center mt-1">{shape.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;
    return (
      <div className="space-y-10 py-8 animate-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Check className="text-green-600 h-10 w-10" />
          </div>
          <div>
            <h2 className="text-4xl font-headline font-bold">Diagnostik Selesai!</h2>
            <p className="text-muted-foreground">Profil kecantikanmu telah berhasil dirancang oleh AI & MUA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 rounded-3xl bg-secondary/30 border border-primary/10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Waves className="text-primary h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Jenis Kulit</p>
              <h3 className="text-2xl font-headline font-bold">{results.skinType}</h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-secondary/30 border border-primary/10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Palette className="text-accent h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Warna & Undertone</p>
              <h3 className="text-2xl font-headline font-bold">{results.skinTone.replace('_', ' ')}</h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-secondary/30 border border-primary/10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Fingerprint className="text-pink-600 h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-pink-600">Bentuk Wajah</p>
              <h3 className="text-2xl font-headline font-bold">{results.faceShape}</h3>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button size="lg" className="w-full h-14 rounded-full text-lg font-bold shadow-xl" onClick={goToCatalog}>
            Lihat Produk yang Cocok <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setStep(1)}>
            <RotateCcw className="mr-2 h-4 w-4" /> Ulangi Diagnostik
          </Button>
        </div>
      </div>
    );
  };

  const isNextDisabled = () => {
    if (step === 1) return !skinType;
    if (step === 2) return !skinDepth || !undertoneAnswers.jewelry || !undertoneAnswers.veins;
    if (step === 3) return !faceShape;
    return false;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-none shadow-2xl bg-white/80 backdrop-blur-xl rounded-[3rem]">
      <div className="p-1 px-8 pt-8">
        {step < 4 && <Progress value={progress} className="h-1 bg-muted" />}
      </div>
      
      <Card className="p-8 md:p-12 bg-transparent border-none shadow-none">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderResults()}

        {step < 4 && (
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-muted">
            <Button 
              variant="ghost" 
              onClick={() => setStep((s) => (s - 1) as Step)} 
              disabled={step === 1}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
            </Button>
            
            <Button 
              size="lg"
              onClick={() => step === 3 ? handleFinish() : setStep((s) => (s + 1) as Step)} 
              disabled={isNextDisabled()}
              className="rounded-full px-8 shadow-lg"
            >
              {step === 3 ? "Selesai" : "Lanjut"} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </Card>
    </Card>
  );
}
