"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";

type Step = 1 | 2 | 3 | 4;

interface DiagnosticProfile {
  skinType: SkinType;
  skinTone: SkinTone;
  faceShape: FaceShape;
}

export function DiagnosticQuiz() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [progress, setProgress] = useState(33);

  const [skinType, setSkinType] = useState<SkinType | null>(null);

  const [undertoneAnswers, setUndertoneAnswers] = useState({
    jewelry: "" as "WARM" | "COOL" | "NEUTRAL" | "",
    veins: "" as "WARM" | "COOL" | "NEUTRAL" | "",
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Step 1 of 3</p>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">What&apos;s your skin type?</h2>
        <p className="text-muted-foreground text-sm">After washing your face and waiting 30 minutes without products, how does your skin feel?</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {[
          { id: "OILY", label: "Oily", desc: "Shiny all over, visible pores" },
          { id: "DRY", label: "Dry", desc: "Feels tight, flaky or dull" },
          { id: "COMBINATION", label: "Combination", desc: "Oily T-zone, dry cheeks" },
          { id: "NORMAL", label: "Normal", desc: "Balanced and comfortable" },
          { id: "SENSITIVE", label: "Sensitive", desc: "Prone to redness or irritation" },
        ].map((type) => (
          <div
            key={type.id}
            onClick={() => setSkinType(type.id as SkinType)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50",
              skinType === type.id ? "border-primary bg-primary/5" : "border-border bg-white"
            )}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-foreground">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.desc}</p>
              </div>
              {skinType === type.id && <CheckCircle2 className="text-primary h-5 w-5" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Step 2 of 3</p>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Skin Tone & Undertone</h2>
        <p className="text-muted-foreground text-sm">Let&apos;s determine the colors that complement you best.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Which jewelry looks better on you?</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "WARM", label: "Gold" },
              { val: "COOL", label: "Silver" },
              { val: "NEUTRAL", label: "Both" }
            ].map(opt => (
              <Button
                key={opt.val}
                variant={undertoneAnswers.jewelry === opt.val ? "default" : "outline"}
                className="rounded-xl h-11"
                onClick={() => setUndertoneAnswers({...undertoneAnswers, jewelry: opt.val as any})}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">What color are your wrist veins?</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "WARM", label: "Green" },
              { val: "COOL", label: "Blue/Purple" },
              { val: "NEUTRAL", label: "Mixed" }
            ].map(opt => (
              <Button
                key={opt.val}
                variant={undertoneAnswers.veins === opt.val ? "default" : "outline"}
                className="rounded-xl h-11"
                onClick={() => setUndertoneAnswers({...undertoneAnswers, veins: opt.val as any})}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-sm font-semibold">Select your skin depth:</Label>
          <div className="flex justify-center gap-4">
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
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full border-3 transition-all",
                  d.color,
                  skinDepth === d.id ? "border-primary ring-2 ring-primary/30 scale-110" : "border-transparent opacity-70 hover:opacity-100"
                )} />
                <span className="text-[10px] font-medium uppercase text-muted-foreground">{d.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Step 3 of 3</p>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Face Shape</h2>
        <p className="text-muted-foreground text-sm">Look in the mirror, pull your hair back, and compare.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { id: "OVAL", label: "Oval" },
          { id: "ROUND", label: "Round" },
          { id: "SQUARE", label: "Square" },
          { id: "HEART", label: "Heart" },
          { id: "DIAMOND", label: "Diamond" },
          { id: "OBLONG", label: "Oblong" },
        ].map((shape) => (
          <div
            key={shape.id}
            onClick={() => setFaceShape(shape.id as FaceShape)}
            className={cn(
              "flex flex-col items-center p-5 rounded-2xl border-2 transition-all cursor-pointer",
              faceShape === shape.id ? "border-primary bg-primary/5" : "border-border bg-white hover:border-primary/30"
            )}
          >
            <div className={cn(
              "w-10 h-14 border-2 border-muted-foreground/30 mb-3",
              shape.id === 'ROUND' && "rounded-full",
              shape.id === 'OVAL' && "rounded-[40%]",
              shape.id === 'SQUARE' && "rounded-sm",
              shape.id === 'HEART' && "rounded-b-full rounded-t-[10%]",
              shape.id === 'DIAMOND' && "rotate-45 scale-75",
              shape.id === 'OBLONG' && "rounded-[30%] scale-y-125"
            )} />
            <span className="font-semibold text-sm">{shape.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;
    return (
      <div className="space-y-8 py-4 animate-in fade-in duration-700">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Check className="text-primary h-8 w-8" />
          </div>
          <h2 className="font-headline text-3xl font-bold text-foreground">Your Profile is Ready!</h2>
          <p className="text-muted-foreground">Here&apos;s your personalized beauty profile.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <span className="text-lg">💧</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skin Type</p>
              <h3 className="font-headline text-xl font-bold text-foreground">{results.skinType}</h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <span className="text-lg">🎨</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skin Tone</p>
              <h3 className="font-headline text-xl font-bold text-foreground">{results.skinTone.replace('_', ' ')}</h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <span className="text-lg">💎</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Face Shape</p>
              <h3 className="font-headline text-xl font-bold text-foreground">{results.faceShape}</h3>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button size="lg" className="w-full rounded-full font-semibold" onClick={goToCatalog}>
            View Matching Products <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setStep(1)}>
            <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
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
    <Card className="w-full max-w-xl mx-auto overflow-hidden border border-border/50 shadow-lg bg-white rounded-2xl">
      <div className="px-8 pt-8">
        {step < 4 && <Progress value={progress} className="h-1.5 bg-muted rounded-full" />}
      </div>

      <div className="p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderResults()}

        {step < 4 && (
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => (s - 1) as Step)}
              disabled={step === 1}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            <Button
              onClick={() => step === 3 ? handleFinish() : setStep((s) => (s + 1) as Step)}
              disabled={isNextDisabled()}
              className="rounded-full px-6"
            >
              {step === 3 ? "See Results" : "Continue"} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
