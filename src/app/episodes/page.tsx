'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Episode } from '@/types';
import { getEpisodes } from '@/lib/api';

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setIsLoading(true);
        const data = await getEpisodes(currentPage);
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      } catch {
        setEpisodes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, [currentPage]);

  return (
    <div className="max-w-5xl mx-auto px-8 py-16 relative z-10">
      <div className="mb-16">
        <h1 className="text-3xl font-medium mb-3" style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
          Episodes
        </h1>
        <p className="text-sm font-normal" style={{ color: 'var(--muted)' }}>
          All episodes from the series
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--surface-elevated)' }} />
          ))}
        </div>
      ) : (
        <div className="space-y-1">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="flex items-center justify-between py-4 px-5 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--card-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div className="flex items-center gap-5">
                <span className="text-xs font-normal w-16" style={{ color: 'var(--muted-light)' }}>{ep.episode}</span>
                <span className="text-sm font-normal" style={{ color: 'var(--foreground)' }}>{ep.name}</span>
              </div>
              <span className="text-xs font-normal" style={{ color: 'var(--muted-light)' }}>{ep.air_date}</span>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16 pt-12" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-5 py-2.5 text-sm font-normal transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: 'var(--muted)' }}
          >
            Previous
          </button>
          <span className="px-6 text-sm font-normal" style={{ color: 'var(--muted)' }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-5 py-2.5 text-sm font-normal transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: 'var(--muted)' }}
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-16 text-center">
        <Link href="/" className="text-sm font-normal transition-opacity hover:opacity-70" style={{ color: 'var(--muted)' }}>
          ← Back to characters
        </Link>
      </div>
    </div>
  );
}
