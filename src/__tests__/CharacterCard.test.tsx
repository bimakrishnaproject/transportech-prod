import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    allProps: React.ComponentProps<"img"> & {
      fill?: boolean;
      priority?: boolean;
    }
  ) => {
    // eslint-disable-next-line @next/next/no-img-element
    // remove the `fill` prop since we mock to a plain <img />
    const { fill: _fill, ...props } = allProps as React.ComponentProps<"img">;
    // ensure the extracted fill prop is consumed to avoid unused variable lint error
    void _fill;
    return <img {...props} alt={props.alt || ""} />;
  },
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock the favorite store
const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();

jest.mock("@/store/favoriteStore", () => ({
  useFavoriteStore: () => ({
    toggleFavorite: mockToggleFavorite,
    isFavorite: mockIsFavorite,
  }),
}));

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

describe("CharacterCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  it("renders character name", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("renders character image with correct alt text", () => {
    render(<CharacterCard character={mockCharacter} />);
    const image = screen.getByAltText("Rick Sanchez");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockCharacter.image);
  });

  it("displays correct status badge", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Alive")).toBeInTheDocument();
  });

  it("displays species and gender", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Human • Male")).toBeInTheDocument();
  });

  it("displays location", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
  });

  it("toggles favorite when heart button is clicked", () => {
    render(<CharacterCard character={mockCharacter} />);

    const favoriteButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });

  it("shows filled heart when character is favorite", () => {
    mockIsFavorite.mockReturnValue(true);
    render(<CharacterCard character={mockCharacter} />);

    const favoriteButton = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(favoriteButton).toBeInTheDocument();
  });

  it("links to character detail page", () => {
    render(<CharacterCard character={mockCharacter} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/character/1");
  });

  it("displays Dead status with correct color", () => {
    const deadCharacter = { ...mockCharacter, status: "Dead" as const };
    render(<CharacterCard character={deadCharacter} />);
    expect(screen.getByText("Dead")).toBeInTheDocument();
  });

  it("displays unknown status correctly", () => {
    const unknownCharacter = { ...mockCharacter, status: "unknown" as const };
    render(<CharacterCard character={unknownCharacter} />);
    expect(screen.getByText("unknown")).toBeInTheDocument();
  });
});
