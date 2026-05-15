export default function ProductsLoading() {
  return (
    <div className="min-h-screen" role="status" aria-label="Loading products">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-4" />
        <div className="h-4 w-72 bg-muted/70 rounded animate-pulse mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <div className="aspect-[4/5] bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 bg-muted/70 rounded animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-20 bg-muted/70 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
