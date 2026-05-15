export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background py-16 md:py-24" role="status" aria-label="Loading dashboard">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="h-8 w-40 bg-muted rounded-lg animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="h-4 w-20 bg-muted/70 rounded animate-pulse mb-3" />
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
