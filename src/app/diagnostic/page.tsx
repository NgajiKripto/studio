"use client";

import { DiagnosticQuiz } from "@/components/DiagnosticQuiz";
import { useLanguage } from "@/lib/i18n";
import { motion } from "motion/react";

export default function DiagnosticPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background py-16 md:py-24" aria-label="Skin diagnostic quiz">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase">
            {t.diagnostic.badge}
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {t.diagnostic.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            {t.diagnostic.description}
          </p>
        </motion.div>

        <DiagnosticQuiz />
      </div>
    </main>
  );
}
