"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useCharacterStore } from "@/store/characterStore";

export default function SearchBar() {
  const { search, setSearch, fetchCharacters } = useCharacterStore();
  const [inputValue, setInputValue] = useState(search);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape to blur
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, search, setSearch]);

  // Fetch when search changes
  useEffect(() => {
    fetchCharacters();
  }, [search, fetchCharacters]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setSearch("");
    inputRef.current?.focus();
  }, [setSearch]);

  return (
    <div className="relative w-full max-w-md">
      {/* Search icon */}
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200"
        style={{
          color: isFocused ? "var(--foreground)" : "var(--muted-light)",
        }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search characters..."
        className="w-full pl-11 pr-10 py-3 text-sm font-normal rounded-xl transition-all duration-300"
        style={{
          backgroundColor: isFocused
            ? "var(--surface-elevated)"
            : "var(--card-bg)",
          border: `1px solid ${
            isFocused ? "var(--border)" : "var(--border-subtle)"
          }`,
          borderRadius: "10px",
          color: "var(--foreground)",
          boxShadow: isFocused ? "0 0 0 3px rgba(0, 0, 0, 0.05)" : "none",
        }}
        onFocus={(e) => {
          setIsFocused(true);
          e.target.style.borderColor = "var(--border)";
          e.target.style.backgroundColor = "var(--surface-elevated)";
        }}
        onBlur={(e) => {
          setIsFocused(false);
          e.target.style.borderColor = "var(--border-subtle)";
          e.target.style.backgroundColor = "var(--card-bg)";
        }}
      />

      {/* Keyboard shortcut hint */}
      {!isFocused && !inputValue && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1 px-2 py-1 rounded text-xs font-normal"
          style={{
            color: "var(--muted-light)",
            backgroundColor: "var(--surface-elevated)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <kbd className="text-xs">⌘</kbd>
          <kbd className="text-xs">K</kbd>
        </div>
      )}
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center transition-opacity hover:opacity-70"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
