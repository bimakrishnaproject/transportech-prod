"use client";

import { useEffect, useState } from "react";
import { useCharacterStore } from "@/store/characterStore";
import { Character } from "@/types";
import { getFeaturedCharacters } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import CharacterCard from "@/components/CharacterCard";
import { CharacterGridSkeleton } from "@/components/CharacterCardSkeleton";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  const { characters, isLoading, error, fetchCharacters, pagination } =
    useCharacterStore();
  const [featuredCharacters, setFeaturedCharacters] = useState<Character[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);

  useEffect(() => {
    fetchCharacters();

    // Fetch featured characters for hero carousel
    const fetchFeatured = async () => {
      setIsLoadingFeatured(true);
      try {
        const featured = await getFeaturedCharacters(10);
        setFeaturedCharacters(featured);
      } catch (error) {
        console.error("Failed to fetch featured characters:", error);
      } finally {
        setIsLoadingFeatured(false);
      }
    };

    fetchFeatured();
  }, [fetchCharacters]);

  return (
    <div className="relative z-10">
      {/* Hero Carousel - Full Screen */}
      {!isLoadingFeatured && featuredCharacters.length > 0 && (
        <HeroCarousel characters={featuredCharacters} />
      )}

      {/* Character List Section - Appears on scroll */}
      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10 bg-[var(--background)]">
        {/* Header */}
        <div className="mb-16">
          <h1
            className="text-3xl font-medium mb-3"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            Characters
          </h1>
          <p className="text-sm font-normal" style={{ color: "var(--muted)" }}>
            {pagination?.count || 826} characters across infinite dimensions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <SearchBar />
          <FilterPanel />
        </div>

        {/* Character Grid */}
        {isLoading ? (
          <CharacterGridSkeleton count={20} />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchCharacters} />
        ) : characters.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}

        <Pagination />
      </div>
    </div>
  );
}
