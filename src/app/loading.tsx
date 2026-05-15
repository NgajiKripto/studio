export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full gradient-bg animate-pulse-soft" />
        <div className="h-2 w-24 rounded-full bg-muted animate-pulse" />
      </div>
    </div>
  );
}
