export default function CharacterCardSkeleton() {
  return (
    <div 
      className="overflow-hidden"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
      }}
    >
      <div 
        className="aspect-square animate-shimmer"
        style={{ backgroundColor: 'var(--surface-elevated)' }}
      />
      <div className="p-5 space-y-3">
        <div 
          className="h-4 rounded animate-shimmer" 
          style={{ backgroundColor: 'var(--surface-elevated)', width: '75%' }} 
        />
        <div 
          className="h-3 rounded animate-shimmer" 
          style={{ backgroundColor: 'var(--surface-elevated)', width: '50%' }} 
        />
        <div 
          className="h-3 rounded animate-shimmer" 
          style={{ backgroundColor: 'var(--surface-elevated)', width: '65%' }} 
        />
      </div>
    </div>
  );
}

export function CharacterGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
}
