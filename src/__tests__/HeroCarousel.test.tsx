import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import HeroCarousel from "@/components/HeroCarousel";

// Mock favorite store
const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();

jest.mock("@/store/favoriteStore", () => ({
  useFavoriteStore: () => ({
    toggleFavorite: mockToggleFavorite,
    isFavorite: mockIsFavorite,
  }),
}));

const characters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [],
    url: "",
    created: "",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: [],
    url: "",
    created: "",
  },
];

describe("HeroCarousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockIsFavorite.mockReturnValue(false);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders current character & thumbnails", () => {
    render(<HeroCarousel characters={characters} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    // Thumbnails have role button in the component
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1);
  });

  it("changes slide when thumbnail clicked", () => {
    render(<HeroCarousel characters={characters} />);
    // Find thumbnail by aria-label (easier and more robust than searching images)
    const secondThumb = screen.getByLabelText(/Go to slide 2: Morty Smith/i);
    expect(secondThumb).toBeDefined();
    fireEvent.click(secondThumb);
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("auto-advances after 5s", () => {
    render(<HeroCarousel characters={characters} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("favorite button toggles", () => {
    render(<HeroCarousel characters={characters} />);
    const favBtn = screen.getByLabelText(
      /add to favorites|remove from favorites/i
    );
    expect(favBtn).toBeInTheDocument();
    fireEvent.click(favBtn);
    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });
});
