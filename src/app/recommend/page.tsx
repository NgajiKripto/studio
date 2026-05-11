"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { PRODUCTS } from "@/lib/mock-data";
import { aiPersonalizedProductRecommendations, AIPersonalizedProductRecommendationsOutput } from "@/ai/flows/ai-personalized-product-recommendations";
import { ArrowRight, ArrowLeft, Loader2, Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Step = "SKIN_TYPE" | "SKIN_TONE" | "FACE_SHAPE" | "RESULTS";

export default function RecommendPage() {
  const [step, setStep] = useState<Step>("SKIN_TYPE");
  const [profile, setProfile] = useState<{
    skinType: SkinType | null;
    skinTone: SkinTone | null;
    faceShape: FaceShape | null;
  }>({
    skinType: null,
    skinTone: null,
    faceShape: null,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AIPersonalizedProductRecommendationsOutput | null>(null);

  const handleNext = async () => {
    if (step === "SKIN_TYPE") setStep("SKIN_TONE");
    else if (step === "SKIN_TONE") setStep("FACE_SHAPE");
    else if (step === "FACE_SHAPE") {
      setLoading(true);
      setStep("RESULTS");
      try {
        const response = await aiPersonalizedProductRecommendations({
          skinType: profile.skinType!,
          skinTone: profile.skinTone!,
          faceShape: profile.faceShape!,
          allProducts: PRODUCTS as any,
        });
        setResults(response);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step === "SKIN_TONE") setStep("SKIN_TYPE");
    else if (step === "FACE_SHAPE") setStep("SKIN_TONE");
    else if (step === "RESULTS") {
      setResults(null);
      setStep("FACE_SHAPE");
    }
  };

  const isStepValid = () => {
    if (step === "SKIN_TYPE") return !!profile.skinType;
    if (step === "SKIN_TONE") return !!profile.skinTone;
    if (step === "FACE_SHAPE") return !!profile.faceShape;
    return true;
  };

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {step !== "RESULTS" && (
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Your Beauty Profile</h1>
            <p className="text-muted-foreground text-lg">Help us understand your features to find your perfect matches.</p>

            {/* Progress Steps */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {[1, 2, 3].map((i) => {
                const isActive = (step === "SKIN_TYPE" && i === 1) || (step === "SKIN_TONE" && i === 2) || (step === "FACE_SHAPE" && i === 3);
                const isDone = (step === "SKIN_TONE" && i < 2) || (step === "FACE_SHAPE" && i < 3);
                return (
                  <div key={i} className="flex items-center">
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                      isActive ? "bg-primary text-primary-foreground scale-110" :
                      isDone ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {isDone ? <CheckCircle2 className="h-4 w-4" /> : i}
                    </div>
                    {i < 3 && <div className={cn("w-10 h-0.5 mx-1.5", isDone ? "bg-primary/40" : "bg-muted")} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Card className="bg-card rounded-2xl shadow-lg border border-border/50 p-8 md:p-10">
          {step === "SKIN_TYPE" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                <h2 className="font-headline text-2xl font-bold mb-2">How does your skin usually feel?</h2>
                <p className="text-muted-foreground text-sm">This helps us recommend the right formulas.</p>
              </div>
              <RadioGroup
                value={profile.skinType || ""}
                onValueChange={(v) => setProfile({ ...profile, skinType: v as SkinType })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {SKIN_TYPES.map((type) => (
                  <Label
                    key={type.value}
                    htmlFor={type.value}
                    className={cn(
                      "flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all text-center space-y-1",
                      profile.skinType === type.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}
                  >
                    <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                    <span className="font-semibold">{type.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {type.value === 'OILY' && 'Shiny all over, visible pores'}
                      {type.value === 'DRY' && 'Feels tight, flaky or dull'}
                      {type.value === 'NORMAL' && 'Balanced, clear, comfortable'}
                      {type.value === 'COMBINATION' && 'Oily T-zone, dry cheeks'}
                      {type.value === 'SENSITIVE' && 'Prone to redness or irritation'}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === "SKIN_TONE" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                <h2 className="font-headline text-2xl font-bold mb-2">What is your skin tone?</h2>
                <p className="text-muted-foreground text-sm">Ensures perfect shade matching.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SKIN_TONES.map((tone) => (
                  <Button
                    key={tone.value}
                    variant={profile.skinTone === tone.value ? "default" : "outline"}
                    className={cn(
                      "h-auto py-3 rounded-xl text-xs font-semibold",
                      profile.skinTone === tone.value && "shadow-md"
                    )}
                    onClick={() => setProfile({ ...profile, skinTone: tone.value })}
                  >
                    {tone.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === "FACE_SHAPE" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                <h2 className="font-headline text-2xl font-bold mb-2">Which shape describes your face?</h2>
                <p className="text-muted-foreground text-sm">Helps with contouring and product placement.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {FACE_SHAPES.map((shape) => (
                  <div
                    key={shape.value}
                    className={cn(
                      "flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                      profile.faceShape === shape.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}
                    onClick={() => setProfile({ ...profile, faceShape: shape.value })}
                  >
                    <div className={cn(
                      "w-10 h-14 border-2 border-muted-foreground/30 mb-2",
                      shape.value === 'ROUND' && "rounded-full",
                      shape.value === 'OVAL' && "rounded-[40%]",
                      shape.value === 'SQUARE' && "rounded-sm",
                      shape.value === 'HEART' && "rounded-b-full rounded-t-[10%]",
                      shape.value === 'DIAMOND' && "rotate-45 scale-75",
                      shape.value === 'OBLONG' && "rounded-[30%] scale-y-125"
                    )} />
                    <span className="font-semibold text-sm">{shape.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "RESULTS" && (
            <div className="space-y-8 animate-in fade-in duration-700">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  <div className="text-center">
                    <h2 className="font-headline text-2xl font-bold">Finding your matches...</h2>
                    <p className="text-muted-foreground text-sm">Our AI is analyzing your profile.</p>
                  </div>
                </div>
              ) : results && results.recommendations.length > 0 ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mb-2">Recommended for You</h2>
                    <p className="text-muted-foreground text-sm">Based on your profile.</p>
                  </div>

                  <div className="space-y-6">
                    {results.recommendations.map((rec) => (
                      <div key={rec.id} className="flex gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                          <Image src={rec.imageUrl} alt={rec.name} fill className="object-cover" />
                        </div>
                        <div className="flex-grow space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{rec.brand}</p>
                            <h3 className="font-semibold text-foreground">{rec.name}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{rec.reasonsForRecommendation}</p>
                          <Button size="sm" variant="outline" className="rounded-full text-xs h-7" asChild>
                            <Link href={`/product/${rec.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <Button variant="outline" className="rounded-full" onClick={() => setStep("SKIN_TYPE")}>
                      Start Over
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <h2 className="font-headline text-2xl font-bold">No matches found</h2>
                  <p className="text-muted-foreground text-sm">Try different criteria or browse our catalog.</p>
                  <Button onClick={() => setStep("SKIN_TYPE")} className="rounded-full">Try Again</Button>
                </div>
              )}
            </div>
          )}

          {step !== "RESULTS" && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === "SKIN_TYPE"}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="rounded-full px-6"
              >
                {step === "FACE_SHAPE" ? "Get Results" : "Continue"} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
