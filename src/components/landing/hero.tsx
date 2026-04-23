'use client';
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import Link from 'next/link';
import Particles from './particles';

function LeaderboardCard() {
  return (
    <div className="glass-card rounded-xl p-6 relative z-10 w-full max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-[0_20px_50px_rgba(0,33,71,0.15)] border-accent/20 animate-float">
      <div className="flex justify-between items-center mb-4 border-b border-border/30 pb-3">
        <span className="text-2xl font-semibold text-primary">Live Applicant Leaderboard</span>
        <span className="bg-accent/20 text-accent font-semibold text-xs px-3 py-1 rounded-full animate-gentle-pulse">Match Score: 95%</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD</div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Jane Doe</div>
            <div className="text-xs text-muted-foreground">Senior Frontend Engineer</div>
          </div>
          <div className="text-2xl font-semibold text-accent">98%</div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">JS</div>
          <div className="flex-1">
            <div className="text-sm font-semibold">John Smith</div>
            <div className="text-xs text-muted-foreground">UX Designer</div>
          </div>
          <div className="text-2xl font-semibold text-accent">92%</div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-border/30 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">QR Code Attendance</span>
        <div className="relative overflow-hidden">
          <QrCode className="text-muted-foreground" />
          <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 relative isolate">
       <Particles
        className="absolute inset-0 -z-10"
        particleCount={200}
        particleSpread={15}
        speed={0.1}
        alphaParticles={true}
        particleBaseSize={2}
        sizeRandomness={1}
        cameraDistance={20}
      />
      <div className="w-full lg:w-1/2 flex flex-col gap-8 relative">
        <h1 className="text-6xl font-black leading-tight text-primary">
          Stop the Waiting Game. Hire and Get Hired, Instantly.
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Experience the future of recruitment with our Zero-Storage AI. Instant matching, live applicant leaderboards, and automated workflows designed to accelerate your hiring process without the clutter.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link href="#job-listings">
            <Button size="lg" className="rounded-full shadow-md hover:scale-105 transition-transform duration-200">
              Lihat Lowongan
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full hover:bg-accent/10">
            Hire Talent
          </Button>
        </div>
        <p className="text-muted-foreground/60 text-xs tracking-wider uppercase mt-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-border"></span> Trusted by 500+ modern HR teams
        </p>
      </div>
      <div className="w-full lg:w-1/2 relative">
        <LeaderboardCard />
      </div>
    </section>
  );
}
