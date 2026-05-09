import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DiagnosticQuiz } from "@/components/DiagnosticQuiz";
import { Sparkles } from "lucide-react";

export default function DiagnosticPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16 md:py-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide">
              <Sparkles className="h-4 w-4" /> Triple Skin Diagnostic
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground leading-tight">
              Temukan Jati Diri <br />
              <span className="text-primary italic">Kecantikanmu.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Analisis cerdas berdasarkan standar profesional MUA untuk menemukan produk yang benar-benar menyatu dengan dirimu.
            </p>
          </div>

          <DiagnosticQuiz />
        </div>
      </main>
      <Footer />
    </>
  );
}
