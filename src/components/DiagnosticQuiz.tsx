"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfettiButton } from "@/components/ui/confetti-button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";

type Step = 1 | 2 | 3 | 4 | 5;

type Activity = "OUTDOOR" | "INDOOR";

interface DiagnosticProfile {
  skinType: SkinType;
  skinTone: SkinTone;
  faceShape: FaceShape;
  activity: Activity;
  consentGiven: boolean;
}

function getOrCreateSessionId(): string {
  const key = "muakeup_session_id";
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
}

export function DiagnosticQuiz() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>(1);
  const [progress, setProgress] = useState(25);

  const [skinType, setSkinType] = useState<SkinType | null>(null);

  const [undertoneAnswers, setUndertoneAnswers] = useState({
    jewelry: "" as "WARM" | "COOL" | "NEUTRAL" | "",
    veins: "" as "WARM" | "COOL" | "NEUTRAL" | "",
  });
  const [skinDepth, setSkinDepth] = useState<"FAIR" | "LIGHT" | "MEDIUM" | "TAN" | "DEEP" | null>(null);

  const [faceShape, setFaceShape] = useState<FaceShape | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [results, setResults] = useState<DiagnosticProfile | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setProgress((step / 4) * 100);
    stepHeadingRef.current?.focus();
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

  const handleFinish = async () => {
    if (!skinType || !skinDepth || !faceShape || !activity) return;

    const undertone = calculateUndertone();
    const finalSkinTone = `${skinDepth}_${undertone}` as SkinTone;

    const profile: DiagnosticProfile = {
      skinType,
      skinTone: finalSkinTone,
      faceShape,
      activity,
      consentGiven,
    };

    setResults(profile);
    localStorage.setItem("muakeup_profile", JSON.stringify(profile));
    setStep(5);

    // If user consented, save to database
    if (consentGiven) {
      try {
        const sessionId = getOrCreateSessionId();
        await fetch("/api/quiz-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            skinType: profile.skinType,
            skinTone: profile.skinTone,
            faceShape: profile.faceShape,
            activity: profile.activity,
            consentGiven: true,
          }),
        });
      } catch (error) {
        // Silently fail - don't block user experience
        console.error("Failed to save quiz result:", error);
      }
    }
  };

  const goToCatalog = () => {
    if (!results) return;
    const params = new URLSearchParams({
      skin_types: results.skinType,
      skin_tones: results.skinTone,
      face_shapes: results.faceShape,
    });
    router.push(`/products?${params.toString()}`);
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.diagnostic.step1of3}</p>
        <h2 ref={step === 1 ? stepHeadingRef : undefined} tabIndex={-1} className="font-headline text-2xl md:text-3xl font-bold text-foreground outline-none">{t.diagnostic.whatSkinType}</h2>
        <p className="text-muted-foreground text-sm">{t.diagnostic.skinTypeInstruction}</p>
      </div>

      <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Skin type options">
        {[
          { id: "OILY", label: t.diagnostic.oily, desc: t.diagnostic.oilyDesc },
          { id: "DRY", label: t.diagnostic.dry, desc: t.diagnostic.dryDesc },
          { id: "COMBINATION", label: t.diagnostic.combination, desc: t.diagnostic.combinationDesc },
          { id: "NORMAL", label: t.diagnostic.normal, desc: t.diagnostic.normalDesc },
          { id: "SENSITIVE", label: t.diagnostic.sensitive, desc: t.diagnostic.sensitiveDesc },
        ].map((type) => (
          <div
            key={type.id}
            onClick={() => setSkinType(type.id as SkinType)}
            onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setSkinType(type.id as SkinType); } }}
            tabIndex={0}
            role="radio"
            aria-checked={skinType === type.id}
            className={cn(
              "p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50",
              skinType === type.id ? "border-primary bg-primary/5" : "border-border bg-card"
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
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.diagnostic.step2of3}</p>
        <h2 ref={step === 2 ? stepHeadingRef : undefined} tabIndex={-1} className="font-headline text-2xl md:text-3xl font-bold text-foreground outline-none">{t.diagnostic.skinToneUndertone}</h2>
        <p className="text-muted-foreground text-sm">{t.diagnostic.skinToneInstruction}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">{t.diagnostic.jewelryQuestion}</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "WARM", label: t.diagnostic.gold },
              { val: "COOL", label: t.diagnostic.silver },
              { val: "NEUTRAL", label: t.diagnostic.both }
            ].map(opt => (
              <Button
                key={opt.val}
                variant={undertoneAnswers.jewelry === opt.val ? "default" : "outline"}
                className="rounded-xl h-11"
                onClick={() => setUndertoneAnswers({...undertoneAnswers, jewelry: opt.val as "WARM" | "COOL" | "NEUTRAL"})}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">{t.diagnostic.veinQuestion}</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "WARM", label: t.diagnostic.green },
              { val: "COOL", label: t.diagnostic.bluePurple },
              { val: "NEUTRAL", label: t.diagnostic.mixed }
            ].map(opt => (
              <Button
                key={opt.val}
                variant={undertoneAnswers.veins === opt.val ? "default" : "outline"}
                className="rounded-xl h-11"
                onClick={() => setUndertoneAnswers({...undertoneAnswers, veins: opt.val as "WARM" | "COOL" | "NEUTRAL"})}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-sm font-semibold">{t.diagnostic.selectSkinDepth}</Label>
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
                onClick={() => setSkinDepth(d.id as "FAIR" | "LIGHT" | "MEDIUM" | "TAN" | "DEEP")}
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
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.diagnostic.step3of3}</p>
        <h2 ref={step === 3 ? stepHeadingRef : undefined} tabIndex={-1} className="font-headline text-2xl md:text-3xl font-bold text-foreground outline-none">{t.diagnostic.faceShapeTitle}</h2>
        <p className="text-muted-foreground text-sm">{t.diagnostic.faceShapeInstruction}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="radiogroup" aria-label="Face shape options">
        {[
          { id: "OVAL", label: t.diagnostic.oval },
          { id: "ROUND", label: t.diagnostic.round },
          { id: "SQUARE", label: t.diagnostic.square },
          { id: "HEART", label: t.diagnostic.heart },
          { id: "DIAMOND", label: t.diagnostic.diamond },
          { id: "OBLONG", label: t.diagnostic.oblong },
        ].map((shape) => (
          <div
            key={shape.id}
            onClick={() => setFaceShape(shape.id as FaceShape)}
            onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFaceShape(shape.id as FaceShape); } }}
            tabIndex={0}
            role="radio"
            aria-checked={faceShape === shape.id}
            className={cn(
              "flex flex-col items-center p-5 rounded-2xl border-2 transition-all cursor-pointer",
              faceShape === shape.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
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

  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.diagnostic.step4of4}</p>
        <h2 ref={step === 4 ? stepHeadingRef : undefined} tabIndex={-1} className="font-headline text-2xl md:text-3xl font-bold text-foreground outline-none">{t.diagnostic.activityTitle}</h2>
        <p className="text-muted-foreground text-sm">{t.diagnostic.activityInstruction}</p>
      </div>

      <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Activity options">
        <div
          onClick={() => setActivity("OUTDOOR")}
          onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setActivity("OUTDOOR"); } }}
          tabIndex={0}
          role="radio"
          aria-checked={activity === "OUTDOOR"}
          className={cn(
            "p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50",
            activity === "OUTDOOR" ? "border-primary bg-primary/5" : "border-border bg-card"
          )}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-foreground">{t.diagnostic.activityOutdoor}</h3>
              <p className="text-sm text-muted-foreground">{t.diagnostic.activityOutdoorDesc}</p>
            </div>
            {activity === "OUTDOOR" && <CheckCircle2 className="text-primary h-5 w-5" />}
          </div>
        </div>

        <div
          onClick={() => setActivity("INDOOR")}
          onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setActivity("INDOOR"); } }}
          tabIndex={0}
          role="radio"
          aria-checked={activity === "INDOOR"}
          className={cn(
            "p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50",
            activity === "INDOOR" ? "border-primary bg-primary/5" : "border-border bg-card"
          )}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-foreground">{t.diagnostic.activityIndoor}</h3>
              <p className="text-sm text-muted-foreground">{t.diagnostic.activityIndoorDesc}</p>
            </div>
            {activity === "INDOOR" && <CheckCircle2 className="text-primary h-5 w-5" />}
          </div>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={consentGiven}
            onCheckedChange={(checked) => setConsentGiven(checked === true)}
            className="mt-0.5"
          />
          <Label
            htmlFor="consent"
            className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
          >
            {t.diagnostic.consentLabel}
          </Label>
        </div>
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
          <h2 className="font-headline text-3xl font-bold text-foreground">{t.diagnostic.profileReady}</h2>
          <p className="text-muted-foreground">{t.diagnostic.personalizedProfile}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-sm">
              <span className="text-lg">💧</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.home.skinType}</p>
              <h3 className="font-headline text-xl font-bold text-foreground">{results.skinType}</h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-sm">
              <span className="text-lg">🎨</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.home.skinTone}</p>
              <h3 className="font-headline text-xl font-bold text-foreground">{results.skinTone.replace('_', ' ')}</h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-sm">
              <span className="text-lg">💎</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.home.faceShape}</p>
              <h3 className="font-headline text-xl font-bold text-foreground">{results.faceShape}</h3>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-sm">
              <span className="text-lg">🌤️</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.diagnostic.activity}</p>
              <h3 className="font-headline text-xl font-bold text-foreground">
                {results.activity === "OUTDOOR" ? t.diagnostic.activityOutdoor : t.diagnostic.activityIndoor}
              </h3>
            </div>
          </div>
        </div>

        {results.consentGiven && (
          <p className="text-xs text-center text-muted-foreground">
            ✓ {t.diagnostic.consentLabel}
          </p>
        )}

        <div className="space-y-3 pt-4">
          <ConfettiButton size="lg" className="w-full rounded-full font-semibold" onClick={goToCatalog}>
            {t.diagnostic.viewMatchingProducts} <ArrowRight className="ml-2 h-4 w-4" />
          </ConfettiButton>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => { setStep(1); setResults(null); }}>
            <RotateCcw className="mr-2 h-4 w-4" /> {t.diagnostic.retakeQuiz}
          </Button>
        </div>
      </div>
    );
  };

  const isNextDisabled = () => {
    if (step === 1) return !skinType;
    if (step === 2) return !skinDepth || !undertoneAnswers.jewelry || !undertoneAnswers.veins;
    if (step === 3) return !faceShape;
    if (step === 4) return !activity;
    return false;
  };

  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden border border-border/50 shadow-lg bg-card rounded-2xl">
      <div className="px-8 pt-8" aria-live="polite">
        {step < 5 && <Progress value={progress} className="h-1.5 bg-muted rounded-full" />}
      </div>

      <div className="p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderResults()}

        {step < 5 && (
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => (s - 1) as Step)}
              disabled={step === 1}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> {t.diagnostic.back}
            </Button>

            <Button
              onClick={() => step === 4 ? handleFinish() : setStep((s) => (s + 1) as Step)}
              disabled={isNextDisabled()}
              className="rounded-full px-6"
            >
              {step === 4 ? t.diagnostic.seeResults : t.diagnostic.continue_} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
