"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SKIN_TYPES, SKIN_TONES, FACE_SHAPES, SkinType, SkinTone, FaceShape } from "@/lib/constants";
import { PRODUCTS } from "@/lib/mock-data";
import { aiPersonalizedProductRecommendations, AIPersonalizedProductRecommendationsOutput } from "@/ai/flows/ai-personalized-product-recommendations";
import { Sparkles, ArrowRight, ArrowLeft, Loader2, Star, CheckCircle2 } from "lucide-react";
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
          allProducts: PRODUCTS as any, // Cast to match AI interface
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
    <>
      <Navbar />
      <main className="flex-grow py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {step !== "RESULTS" && (
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Your Beauty Profile</h1>
              <p className="text-muted-foreground text-lg">Help us understand your features to find your perfect makeup matches.</p>
              
              <div className="flex justify-center items-center gap-4 mt-8">
                {[1, 2, 3].map((i) => {
                  const isActive = (step === "SKIN_TYPE" && i === 1) || (step === "SKIN_TONE" && i === 2) || (step === "FACE_SHAPE" && i === 3);
                  const isDone = (step === "SKIN_TONE" && i < 2) || (step === "FACE_SHAPE" && i < 3);
                  return (
                    <div key={i} className="flex items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2",
                        isActive ? "bg-primary text-white border-primary scale-110" : 
                        isDone ? "bg-accent text-white border-accent" : "bg-white text-muted-foreground border-muted-foreground/20"
                      )}>
                        {isDone ? <CheckCircle2 className="h-5 w-5" /> : i}
                      </div>
                      {i < 3 && <div className={cn("w-12 h-0.5 mx-2", isDone ? "bg-accent" : "bg-muted")} />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-white/50 backdrop-blur-md rounded-[2.5rem] shadow-sm border p-8 md:p-12">
            {step === "SKIN_TYPE" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                  <h2 className="text-2xl font-headline font-bold mb-2">How does your skin usually feel?</h2>
                  <p className="text-muted-foreground">This helps us recommend the right formulas for you.</p>
                </div>
                <RadioGroup 
                  value={profile.skinType || ""} 
                  onValueChange={(v) => setProfile({ ...profile, skinType: v as SkinType })}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {SKIN_TYPES.map((type) => (
                    <Label
                      key={type.value}
                      htmlFor={type.value}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer hover:border-primary/50 transition-all text-center space-y-2",
                        profile.skinType === type.value ? "border-primary bg-primary/5 shadow-inner" : "border-muted"
                      )}
                    >
                      <RadioGroupItem value={type.value} id={type.value} className="sr-only" />
                      <span className="font-headline text-lg font-bold">{type.label}</span>
                      <span className="text-xs text-muted-foreground italic">
                        {type.value === 'OILY' && 'Shiny all over, visible pores'}
                        {type.value === 'DRY' && 'Feels tight, flaky or dull'}
                        {type.value === 'NORMAL' && 'Balanced, clear, not sensitive'}
                        {type.value === 'COMBINATION' && 'Oily T-zone, dry cheeks'}
                        {type.value === 'SENSITIVE' && 'Prone to redness or irritation'}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {step === "SKIN_TONE" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                  <h2 className="text-2xl font-headline font-bold mb-2">What is your skin tone & undertone?</h2>
                  <p className="text-muted-foreground">Knowing your tone ensures the perfect shade matching.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SKIN_TONES.map((tone) => (
                    <Button
                      key={tone.value}
                      variant={profile.skinTone === tone.value ? "default" : "outline"}
                      className={cn(
                        "h-auto py-3 px-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-tight",
                        profile.skinTone === tone.value && "shadow-lg scale-105"
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
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center">
                  <h2 className="text-2xl font-headline font-bold mb-2">Which shape best describes your face?</h2>
                  <p className="text-muted-foreground">Helps with contouring and highlighting product picks.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {FACE_SHAPES.map((shape) => (
                    <div 
                      key={shape.value}
                      className={cn(
                        "flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all",
                        profile.faceShape === shape.value ? "border-primary bg-primary/5 shadow-inner" : "border-muted"
                      )}
                      onClick={() => setProfile({ ...profile, faceShape: shape.value })}
                    >
                      <div className={cn(
                        "w-12 h-16 border-2 border-muted-foreground/30 mb-3",
                        shape.value === 'ROUND' && "rounded-full",
                        shape.value === 'OVAL' && "rounded-[40%]",
                        shape.value === 'SQUARE' && "rounded-sm",
                        shape.value === 'HEART' && "rounded-b-full rounded-t-[10%]",
                        shape.value === 'DIAMOND' && "rotate-45 scale-75",
                        shape.value === 'OBLONG' && "rounded-[30%] scale-y-125"
                      )} />
                      <span className="font-bold text-sm">{shape.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === "RESULTS" && (
              <div className="space-y-8 animate-in fade-in duration-700">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <div className="relative">
                      <Loader2 className="h-16 w-16 text-primary animate-spin" />
                      <Sparkles className="h-6 w-6 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-2xl font-headline font-bold">Curating Your Beauty Picks...</h2>
                      <p className="text-muted-foreground">Our AI is analyzing MUA verdicts and your unique profile.</p>
                    </div>
                  </div>
                ) : results && results.recommendations.length > 0 ? (
                  <div className="space-y-12">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-white text-sm font-bold tracking-wide mb-4">
                        <Sparkles className="h-4 w-4" /> AI Personalized Selection
                      </div>
                      <h2 className="text-4xl md:text-5xl font-headline font-bold">Recommended for You</h2>
                      <p className="text-muted-foreground mt-2">Based on your {profile.skinType?.toLowerCase()} skin, {profile.skinTone?.toLowerCase()} tone, and {profile.faceShape?.toLowerCase()} face shape.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                      {results.recommendations.map((rec) => (
                        <Card key={rec.id} className="overflow-hidden border-none shadow-xl bg-background rounded-3xl group">
                          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                            <div className="md:col-span-2 relative aspect-square">
                              <Image 
                                src={rec.imageUrl} 
                                alt={rec.name} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            </div>
                            <div className="md:col-span-3 p-8 flex flex-col justify-center">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-primary">{rec.brand}</p>
                                  <h3 className="text-2xl font-headline font-bold">{rec.name}</h3>
                                </div>
                                <div className="bg-secondary/20 p-4 rounded-2xl">
                                  <p className="text-xs uppercase font-bold text-accent flex items-center gap-1.5 mb-2">
                                    <Star className="h-4 w-4 fill-accent" /> Expert MUA Verdict
                                  </p>
                                  <p className="text-sm italic text-foreground/80 leading-relaxed">
                                    "{rec.muaVerdict}"
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm font-bold text-primary">Why we picked this for you:</p>
                                  <p className="text-sm text-muted-foreground">{rec.reasonsForRecommendation}</p>
                                </div>
                                <div className="pt-4">
                                  <Button className="rounded-full px-8 shadow-md" asChild>
                                    <Link href={`/product/${rec.id}`}>View Details</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center pt-8">
                      <Button variant="outline" size="lg" className="rounded-full" onClick={() => setStep("SKIN_TYPE")}>
                        Start Over
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 space-y-6">
                    <h2 className="text-2xl font-headline font-bold">No perfect matches found.</h2>
                    <p className="text-muted-foreground">Our MUA hasn't added products that perfectly match this specific profile yet. Try different criteria or browse our catalog.</p>
                    <Button onClick={() => setStep("SKIN_TYPE")} className="rounded-full">Try Again</Button>
                  </div>
                )}
              </div>
            )}

            {step !== "RESULTS" && (
              <div className="flex justify-between items-center mt-12 pt-8 border-t">
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
                  className="rounded-full px-8"
                >
                  {step === "FACE_SHAPE" ? "Get Recommendations" : "Continue"} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}