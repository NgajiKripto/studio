"use client";

import { Card } from "@/components/ui/card";
import { Eye, MousePointerClick, Wallet, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface DashboardStats {
  profileViews: number;
  totalClicks: number;
  monthlyClicks: number;
  saldo: number;
}

interface DashboardHeaderProps {
  stats: DashboardStats;
  recommendedProductsCount: number;
  affiliateCode: string | null;
}

export function DashboardHeader() {
  const { t } = useLanguage();

  return (
    <div className="mb-10 space-y-2">
      <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
        {t.dashboard.title}
      </h1>
      <p className="text-muted-foreground">
        {t.dashboard.description}
      </p>
    </div>
  );
}

export function DashboardStats({ stats, recommendedProductsCount, affiliateCode }: DashboardHeaderProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card className="p-5 rounded-xl border border-border/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t.dashboard.profileViews}
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Eye className="h-4 w-4 text-blue-500" />
            </div>
          </div>
          <p className="font-headline text-3xl font-bold text-foreground">
            {stats.profileViews.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-muted-foreground">{t.dashboard.totalVisits}</p>
        </Card>

        <Card className="p-5 rounded-xl border border-border/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t.dashboard.totalClicks}
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <MousePointerClick className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <p className="font-headline text-3xl font-bold text-foreground">
            {stats.totalClicks.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.monthlyClicks} {t.dashboard.thisMonth}
          </p>
        </Card>

        <Card className="p-5 rounded-xl border border-border/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t.dashboard.balance}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-amber-500" />
            </div>
          </div>
          <p className="font-headline text-3xl font-bold text-foreground">
            Rp {stats.saldo.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-muted-foreground">{t.dashboard.balanceAccumulated}</p>
        </Card>

        <Card className="p-5 rounded-xl border border-border/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t.dashboard.activeProducts}
            </span>
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-pink-500" />
            </div>
          </div>
          <p className="font-headline text-3xl font-bold text-foreground">
            {recommendedProductsCount}
          </p>
          <p className="text-xs text-muted-foreground">{t.dashboard.onPublicProfile}</p>
        </Card>
      </div>

      {/* Affiliate Code */}
      <Card className="p-6 rounded-2xl border border-border/50 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-headline text-lg font-bold text-foreground">{t.dashboard.affiliateCode}</h3>
            <p className="text-sm text-muted-foreground">
              {t.dashboard.affiliateCodeDesc}
            </p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-secondary font-mono text-sm font-bold text-foreground">
            {affiliateCode || "—"}
          </div>
        </div>
      </Card>
    </>
  );
}

export function DashboardProductSection() {
  const { t } = useLanguage();

  return (
    <div className="mb-6 space-y-1">
      <h2 className="font-headline text-xl font-bold text-foreground">
        {t.dashboard.selectProducts}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t.dashboard.selectProductsDesc}
      </p>
    </div>
  );
}

export function DashboardUpgradeCard() {
  const { t } = useLanguage();

  return (
    <Card className="p-8 rounded-2xl border border-border/50 text-center space-y-4">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
        <TrendingUp className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="font-headline text-2xl font-bold text-foreground">
        {t.dashboard.upgradeToPremium}
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        {t.dashboard.upgradeDesc}
      </p>
    </Card>
  );
}
