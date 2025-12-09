"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Character, Episode } from "@/types";
import { getMultipleEpisodes } from "@/lib/api";
import { useFavoriteStore } from "@/store/favoriteStore";

type Props = {
  character: Character;
  episodes: Episode[];
};

const statusLabels = {
  Alive: "Alive",
  Dead: "Dead",
  unknown: "Unknown",
};

function DetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16 animate-pulse">
      <div
        className="h-4 w-24 rounded mb-16"
        style={{ backgroundColor: "var(--surface-elevated)" }}
      />
      <div className="grid md:grid-cols-2 gap-16">
        <div
          className="aspect-square rounded-xl"
          style={{ backgroundColor: "var(--surface-elevated)" }}
        />
        <div className="space-y-8">
          <div
            className="h-8 rounded w-3/4"
            style={{ backgroundColor: "var(--surface-elevated)" }}
          />
          <div
            className="h-4 rounded w-1/4"
            style={{ backgroundColor: "var(--surface-elevated)" }}
          />
          <div className="space-y-5 pt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 rounded"
                style={{ backgroundColor: "var(--surface-elevated)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CharacterDetailClient({
  character,
  episodes: initialEpisodes,
}: Props) {
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  useEffect(() => {
    // If episodes were not preloaded, attempt to fetch a subset
    if (episodes.length === 0) {
      const fetchEpisodes = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const episodeIds = character.episode.slice(0, 8).map((url) => {
            const parts = url.split("/");
            return parseInt(parts[parts.length - 1], 10);
          });
          if (episodeIds.length > 0) {
            const epsData = await getMultipleEpisodes(episodeIds);
            setEpisodes(epsData);
          }
        } catch {
          setError("Failed to load episodes");
        } finally {
          setIsLoading(false);
        }
      };

      fetchEpisodes();
    }
  }, [character, episodes.length]);

  if (isLoading) return <DetailSkeleton />;

  if (error || !character) {
    return (
      <div className="max-w-5xl mx-auto px-8 py-24 text-center">
        <p
          className="text-sm font-normal mb-6"
          style={{ color: "var(--muted)" }}
        >
          {error || "Character not found"}
        </p>
        <Link
          href="/"
          className="text-sm font-normal transition-opacity hover:opacity-70 underline underline-offset-4"
          style={{ color: "var(--foreground)" }}
        >
          Back to characters
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(character.id);

  return (
    <div className="max-w-5xl mx-auto px-8 py-16 relative z-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-normal transition-opacity hover:opacity-70 mb-16"
        style={{ color: "var(--muted)" }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </Link>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Image */}
        <div className="relative">
          <div
            className="relative aspect-square rounded-xl overflow-hidden"
            style={{ backgroundColor: "var(--surface-elevated)" }}
          >
            <Image
              src={character.image}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <button
            onClick={() => toggleFavorite(character.id)}
            className="absolute top-5 right-5 p-3 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: isFav ? "var(--foreground)" : "var(--card-bg)",
              color: isFav ? "var(--background)" : "var(--muted)",
              opacity: isFav ? 1 : 0.85,
            }}
            onMouseEnter={(e) => {
              if (!isFav) {
                e.currentTarget.style.color = "var(--foreground)";
                e.currentTarget.style.opacity = "1";
              }
            }}
            onMouseLeave={(e) => {
              if (!isFav) {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.opacity = "0.85";
              }
            }}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className="w-5 h-5"
              fill={isFav ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div>
          <h1
            className="text-3xl font-medium mb-2"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            {character.name}
          </h1>
          <p
            className="text-sm font-normal mb-10"
            style={{ color: "var(--muted)" }}
          >
            {statusLabels[character.status]} · {character.species}
          </p>

          <div className="space-y-5 text-sm">
            <div
              className="py-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <span
                className="font-normal"
                style={{ color: "var(--muted-light)" }}
              >
                Gender
              </span>
              <p
                className="mt-1.5 font-normal"
                style={{ color: "var(--foreground)" }}
              >
                {character.gender}
              </p>
            </div>
            <div
              className="py-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <span
                className="font-normal"
                style={{ color: "var(--muted-light)" }}
              >
                Origin
              </span>
              <p
                className="mt-1.5 font-normal"
                style={{ color: "var(--foreground)" }}
              >
                {character.origin.name}
              </p>
            </div>
            <div
              className="py-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <span
                className="font-normal"
                style={{ color: "var(--muted-light)" }}
              >
                Location
              </span>
              <p
                className="mt-1.5 font-normal"
                style={{ color: "var(--foreground)" }}
              >
                {character.location.name}
              </p>
            </div>
          </div>

          {/* Episodes */}
          {episodes.length > 0 && (
            <div className="mt-10">
              <h2
                className="text-sm font-medium mb-6"
                style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
              >
                Featured in {character.episode.length} episodes
              </h2>
              <div className="space-y-3">
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="flex items-center justify-between py-2.5 text-sm"
                  >
                    <div>
                      <span
                        className="font-normal mr-3"
                        style={{ color: "var(--muted-light)" }}
                      >
                        {ep.episode}
                      </span>
                      <span
                        className="font-normal"
                        style={{ color: "var(--foreground)" }}
                      >
                        {ep.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
