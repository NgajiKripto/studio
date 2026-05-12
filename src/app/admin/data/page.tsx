import { prisma } from "@/lib/prisma";
import { RefreshButton } from "./refresh-button";

export const dynamic = "force-dynamic";

interface AggregateData {
  totalProfiles: number;
  bySkinType: Record<string, number>;
  bySkinTone: Record<string, number>;
  byFaceShape: Record<string, number>;
  byActivity: Record<string, number>;
}

async function getAggregateData(): Promise<AggregateData> {
  const whereConsented = { consentGiven: true };

  const totalProfiles = await prisma.quizResult.count({
    where: whereConsented,
  });

  const skinTypeGroups = await prisma.quizResult.groupBy({
    by: ["skinType"],
    where: whereConsented,
    _count: { skinType: true },
  });

  const skinToneGroups = await prisma.quizResult.groupBy({
    by: ["skinTone"],
    where: whereConsented,
    _count: { skinTone: true },
  });

  const faceShapeGroups = await prisma.quizResult.groupBy({
    by: ["faceShape"],
    where: whereConsented,
    _count: { faceShape: true },
  });

  const activityGroups = await prisma.quizResult.groupBy({
    by: ["activity"],
    where: whereConsented,
    _count: { activity: true },
  });

  const bySkinType: Record<string, number> = {};
  skinTypeGroups.forEach((g: { skinType: string; _count: { skinType: number } }) => {
    bySkinType[g.skinType] = g._count.skinType;
  });

  const bySkinTone: Record<string, number> = {};
  skinToneGroups.forEach((g: { skinTone: string; _count: { skinTone: number } }) => {
    bySkinTone[g.skinTone] = g._count.skinTone;
  });

  const byFaceShape: Record<string, number> = {};
  faceShapeGroups.forEach((g: { faceShape: string; _count: { faceShape: number } }) => {
    byFaceShape[g.faceShape] = g._count.faceShape;
  });

  const byActivity: Record<string, number> = {};
  activityGroups.forEach((g: { activity: string; _count: { activity: number } }) => {
    byActivity[g.activity] = g._count.activity;
  });

  return { totalProfiles, bySkinType, bySkinTone, byFaceShape, byActivity };
}

function StatTable({ title, data, emoji }: { title: string; data: Record<string, number>; emoji: string }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada data.</p>
      ) : (
        <div className="space-y-2">
          {entries.map(([key, count]) => {
            const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : "0";
            return (
              <div key={key} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground truncate">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default async function AdminDataPage() {
  const data = await getAggregateData();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Agregat</h1>
            <p className="text-muted-foreground mt-1">
              Statistik profil pengguna yang telah memberikan consent.
            </p>
          </div>
          <RefreshButton />
        </div>

        {/* Total Card */}
        <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 mb-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Total Profil Tersimpan
          </p>
          <p className="text-5xl font-bold text-primary">
            {data.totalProfiles.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Hanya data dengan consent yang dihitung
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatTable
            title="Berdasarkan Jenis Kulit"
            data={data.bySkinType}
            emoji="💧"
          />
          <StatTable
            title="Berdasarkan Warna Kulit"
            data={data.bySkinTone}
            emoji="🎨"
          />
          <StatTable
            title="Berdasarkan Bentuk Wajah"
            data={data.byFaceShape}
            emoji="💎"
          />
          <StatTable
            title="Berdasarkan Aktivitas"
            data={data.byActivity}
            emoji="🌤️"
          />
        </div>
      </div>
    </div>
  );
}
