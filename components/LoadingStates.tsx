import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

/**
 * Skeleton loader for table
 */
export function TableSkeleton({ rows = 10, columns = 6 }: TableSkeletonProps) {
  return (
    <div className="w-full space-y-3">
      {/* Header skeleton */}
      <div className="flex gap-4 border-b pb-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-6 flex-1" />
        ))}
      </div>

      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4 py-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-8 flex-1"
              variant="shimmer"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for individual token card
 */
export function TokenCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Skeleton className="h-12 w-12 rounded-full" variant="shimmer" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" variant="shimmer" />
        <Skeleton className="h-3 w-32" variant="shimmer" />
      </div>
      <div className="space-y-2 text-right">
        <Skeleton className="h-4 w-20" variant="shimmer" />
        <Skeleton className="h-3 w-16" variant="shimmer" />
      </div>
    </div>
  );
}

/**
 * Progressive loading state
 */
export function ProgressiveLoader({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="h-2 w-64 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground">Loading... {progress}%</p>
    </div>
  );
}
