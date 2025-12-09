"use client";

import { useEffect, useState } from "react";
import { useCharacterStore } from "@/store/characterStore";

const STATUS_OPTIONS = ["", "Alive", "Dead", "unknown"];
const SPECIES_OPTIONS = [
  "",
  "Human",
  "Alien",
  "Humanoid",
  "Robot",
  "Animal",
  "unknown",
];
const GENDER_OPTIONS = ["", "Male", "Female", "Genderless", "unknown"];

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== "";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="appearance-none px-4 py-2 pr-8 text-sm font-normal transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: isFocused
            ? "var(--surface-elevated)"
            : "var(--card-bg)",
          border: `1px solid ${
            isFocused ? "var(--border)" : "var(--border-subtle)"
          }`,
          borderRadius: "8px",
          color: hasValue ? "var(--foreground)" : "var(--muted)",
          minWidth: "110px",
        }}
        aria-label={label}
      >
        <option value="" style={{ color: "var(--muted)" }}>
          {label}
        </option>
        {options
          .filter((o) => o)
          .map((option) => (
            <option
              key={option}
              value={option}
              style={{ color: "var(--foreground)" }}
            >
              {option}
            </option>
          ))}
      </select>
      {/* Custom dropdown arrow */}
      <div
        className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200"
        style={{
          transform: isFocused
            ? "translateY(-50%) rotate(180deg)"
            : "translateY(-50%)",
          color: "var(--muted-light)",
        }}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {/* Active indicator */}
      {hasValue && (
        <div
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "var(--foreground)", opacity: 0.6 }}
        />
      )}
    </div>
  );
}

export default function FilterPanel() {
  const { filters, setFilter, resetFilters, fetchCharacters } =
    useCharacterStore();

  // Fetch when filters change
  useEffect(() => {
    fetchCharacters();
  }, [filters, fetchCharacters]);

  const hasActiveFilters = filters.status || filters.species || filters.gender;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect
        label="Status"
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(value) => setFilter("status", value)}
      />
      <FilterSelect
        label="Species"
        value={filters.species}
        options={SPECIES_OPTIONS}
        onChange={(value) => setFilter("species", value)}
      />
      <FilterSelect
        label="Gender"
        value={filters.gender}
        options={GENDER_OPTIONS}
        onChange={(value) => setFilter("gender", value)}
      />
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="px-3 py-2 text-sm font-normal transition-all duration-200 rounded-lg hover:opacity-70 flex items-center gap-1.5"
          style={{
            color: "var(--muted)",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.backgroundColor = "var(--surface-elevated)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.backgroundColor = "var(--card-bg)";
          }}
        >
          <svg
            className="w-3.5 h-3.5"
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
          Clear
        </button>
      )}
    </div>
  );
}
