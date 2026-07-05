// Loading skeleton components for better UX while data loads

export function HamperCardSkeleton() {
  return (
    <div className="flex flex-col bg-card animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-muted" />
      
      {/* Content skeleton */}
      <div className="p-3 sm:p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-1/4 mt-4" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="block overflow-hidden border border-border bg-card animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/5] bg-muted" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-2">
        <div className="h-3 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

export function HampersGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <HamperCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="section-shell py-20 space-y-8">
        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-3 bg-muted rounded w-32" />
          <div className="h-10 bg-muted rounded w-64" />
          <div className="h-4 bg-muted rounded w-48" />
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}
