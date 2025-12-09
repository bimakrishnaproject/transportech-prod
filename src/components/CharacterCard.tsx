"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useThemeStore } from "@/store/themeStore";

interface CharacterCardProps {
  character: Character;
}

const statusColors = {
  Alive: "#4ade80",
  Dead: "#a3a3a3",
  unknown: "#d4d4d4",
};

const statusColorsDark = {
  Alive: "#4ade80",
  Dead: "#737373",
  unknown: "#525252",
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const { theme } = useThemeStore();
  const isFav = isFavorite(character.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character.id);
  };

  const statusColor =
    theme === "dark"
      ? statusColorsDark[character.status]
      : statusColors[character.status];

  return (
    <Link
      href={`/character/${character.id}`}
      className="block animate-stagger group"
      style={{ animationDelay: `${(character.id % 20) * 0.03}s` }}
    >
      <article
        className="overflow-hidden transition-all duration-500 ease-out cursor-pointer"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "12px",
          transform: "translateY(0)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--card-hover)";
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--card-bg)";
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
        }}
      >
        {/* Character Image */}
        <div
          className="relative aspect-square overflow-hidden"
          style={{ backgroundColor: "var(--surface-elevated)" }}
        >
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 50%)",
            }}
          />

          {/* Favorite Button - Refined */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2.5 rounded-full transition-all duration-200 hover:scale-110"
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
              className="w-4 h-4"
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

        {/* Character Info - Refined layout */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3
              className="text-sm font-medium leading-tight flex-1"
              style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
            >
              {character.name}
            </h3>
            {/* Status indicator - show dot + text */}
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: statusColor }}
                title={character.status}
                aria-hidden
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--muted)" }}
              >
                {character.status}
              </span>
            </div>
          </div>

          <p
            className="text-xs font-normal mb-1.5"
            style={{ color: "var(--muted)" }}
          >
            {character.species}{" "}
            {character.gender ? `• ${character.gender}` : ""}
          </p>

          <p
            className="text-xs font-normal truncate"
            style={{ color: "var(--muted-light)" }}
          >
            {character.location.name}
          </p>
        </div>
      </article>
    </Link>
  );
}
