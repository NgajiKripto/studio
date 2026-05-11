
import { Star, Quote } from "lucide-react";

interface MUAVerdictProps {
  verdict: string;
  brand: string;
}

export function MUAVerdict({ verdict, brand }: MUAVerdictProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border/60 bg-card p-8 shadow-sm group md:p-10">
      <div className="absolute top-0 right-0 p-6 opacity-5 transition-transform group-hover:scale-110 duration-700">
        <Quote className="h-24 w-24 text-primary fill-primary" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Expert Selection</span>
        </div>

        <h3 className="text-xl font-headline font-bold text-primary mb-4 flex items-center gap-2">
          Professional MUA Verdict
        </h3>
        
        <p className="text-lg md:text-xl italic font-medium leading-relaxed text-foreground/90">
          "{verdict}"
        </p>

        <div className="mt-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Quote className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-bold text-muted-foreground italic">
            — Muakeup Resident Artist on {brand}
          </p>
        </div>
      </div>
    </div>
  );
}
