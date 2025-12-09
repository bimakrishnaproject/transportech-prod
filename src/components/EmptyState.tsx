interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = 'No results',
  message = 'Try adjusting your search or filters',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 mb-6" style={{ color: 'var(--border)' }}>
        <svg fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h3 className="text-base font-medium mb-2" style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
        {title}
      </h3>
      <p className="text-sm font-normal" style={{ color: 'var(--muted)' }}>
        {message}
      </p>
    </div>
  );
}
