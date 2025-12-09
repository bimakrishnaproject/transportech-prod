'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Character } from '@/types';
import { useFavoriteStore } from '@/store/favoriteStore';
import { getMultipleCharacters } from '@/lib/api';
import CharacterCard from '@/components/CharacterCard';
import { CharacterGridSkeleton } from '@/components/CharacterCardSkeleton';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoriteStore();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setCharacters([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getMultipleCharacters(favorites);
        setCharacters(data);
      } catch {
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-3xl font-medium mb-3" style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
            Favorites
          </h1>
          <p className="text-sm font-normal" style={{ color: 'var(--muted)' }}>
            {favorites.length > 0 ? `${favorites.length} saved` : 'No favorites yet'}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="text-sm font-normal transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}
          >
            Clear all
          </button>
        )}
      </div>

      {isLoading ? (
        <CharacterGridSkeleton count={favorites.length || 4} />
      ) : characters.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm font-normal mb-6" style={{ color: 'var(--muted)' }}>
            Characters you like will appear here
          </p>
          <Link href="/" className="text-sm font-normal transition-opacity hover:opacity-70 underline underline-offset-4" style={{ color: 'var(--foreground)' }}>
            Browse characters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}

      {characters.length > 0 && (
        <div className="mt-16 text-center">
          <Link href="/" className="text-sm font-normal transition-opacity hover:opacity-70" style={{ color: 'var(--muted)' }}>
            ← Explore more
          </Link>
        </div>
      )}
    </div>
  );
}
