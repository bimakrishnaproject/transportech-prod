'use client';

import { useEffect, useCallback } from 'react';
import { useCharacterStore } from '@/store/characterStore';

export default function Pagination() {
  const { pagination, currentPage, setPage, fetchCharacters, isLoading } = useCharacterStore();

  const canGoPrev = pagination ? currentPage > 1 : false;
  const canGoNext = pagination ? currentPage < pagination.pages : false;

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    fetchCharacters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setPage, fetchCharacters]);
  
  // Keyboard navigation - hooks must be called before any early returns
  useEffect(() => {
    if (!pagination || pagination.pages <= 1) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return; // Don't interfere with inputs
      }
      
      const prev = currentPage > 1;
      const next = currentPage < pagination.pages;
      
      if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault();
        handlePageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault();
        handlePageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, pagination, handlePageChange]);

  // Early return after all hooks
  if (!pagination || pagination.pages <= 1) return null;

  return (
    <div 
      className="flex items-center justify-center gap-4 mt-16 pt-12"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!canGoPrev || isLoading}
        className="px-5 py-2.5 text-sm font-normal transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ color: 'var(--muted)' }}
      >
        Previous
      </button>

      <span className="px-6 text-sm font-normal" style={{ color: 'var(--muted)' }}>
        {currentPage} / {pagination.pages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!canGoNext || isLoading}
        className="px-5 py-2.5 text-sm font-normal transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ color: 'var(--muted)' }}
      >
        Next
      </button>
    </div>
  );
}
