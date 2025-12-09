"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types";
import { useFavoriteStore } from "@/store/favoriteStore";

interface HeroCarouselProps {
  characters: Character[];
}

export default function HeroCarousel({ characters }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (characters.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % characters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [characters.length]);

  // Auto-scroll thumbnails
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeThumb = container.querySelector(
        `[data-index="${currentIndex}"]`
      ) as HTMLElement;

      if (activeThumb) {
        const containerWidth = container.offsetWidth;
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;

        // Calculate center position
        const scrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + characters.length) % characters.length
    );
  }, [characters.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  }, [characters.length]);

  if (characters.length === 0) return null;

  const currentCharacter = characters[currentIndex];

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[var(--background)]">
      {/* Blurred Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />{" "}
        {/* Dark overlay for readability */}
        <Image
          key={`bg-${currentCharacter.id}`} // Key to trigger animation on change
          src={currentCharacter.image}
          alt="background"
          fill
          className="object-cover blur-3xl scale-110 opacity-50 transition-opacity duration-700"
          // background is decorative, not needed as high-priority asset for LCP
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent z-20" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 h-full max-w-7xl mx-auto px-8 flex items-center pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
          {/* Text Content - Left Side */}
          <div className="md:col-span-7 lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 animate-fade-in">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    currentCharacter.status === "Alive"
                      ? "border-green-500 text-green-400 bg-green-500/10"
                      : currentCharacter.status === "Dead"
                      ? "border-red-500 text-red-400 bg-red-500/10"
                      : "border-gray-500 text-gray-400 bg-gray-500/10"
                  }`}
                >
                  {currentCharacter.status}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full border border-white/20 text-white/80 bg-white/5">
                  {currentCharacter.species}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg animate-fade-in">
                {currentCharacter.name}
              </h1>

              <p className="text-lg text-gray-300 max-w-xl animate-fade-in">
                Last known location:{" "}
                <span className="text-white font-medium">
                  {currentCharacter.location.name}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 animate-fade-in">
              <Link
                href={`/character/${currentCharacter.id}`}
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Details
              </Link>
              <button
                onClick={() => toggleFavorite(currentCharacter.id)}
                className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30"
                aria-label={
                  isFavorite(currentCharacter.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                tabIndex={0}
              >
                <svg
                  className="w-6 h-6"
                  fill={isFavorite(currentCharacter.id) ? "#ef4444" : "none"}
                  stroke={
                    isFavorite(currentCharacter.id) ? "#ef4444" : "currentColor"
                  }
                  strokeWidth={2}
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
          </div>

          {/* Character Image - Right Side (Desktop Only) */}
          <div className="hidden md:block md:col-span-5 lg:col-span-6 relative h-[500px] w-full flex items-center justify-center">
            <div className="relative w-[400px] h-[400px] animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-6"></div>
              <Image
                src={currentCharacter.image}
                alt={currentCharacter.name}
                fill
                className="object-cover rounded-3xl shadow-2xl ring-1 ring-white/10 relative z-10"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on Mobile */}
      <button
        onClick={goToPrevious}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-0 left-0 right-0 z-50 h-48 bg-gradient-to-t from-[var(--background)] to-transparent flex items-end pb-8">
        <div
          ref={scrollContainerRef}
          className="max-w-7xl mx-auto px-8 w-full overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-3 py-4 px-1 w-max">
            {characters.slice(0, 10).map((character, index) => (
              <button
                key={character.id}
                data-index={index}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 ${
                  index === currentIndex
                    ? "ring-2 ring-white scale-110 opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
                aria-label={`Go to slide ${index + 1}: ${character.name}`}
                aria-current={index === currentIndex}
                tabIndex={0}
                role="option"
                aria-selected={index === currentIndex}
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
