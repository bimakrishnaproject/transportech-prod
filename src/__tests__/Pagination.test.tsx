import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

// Mock Character Store
const mockSetPage = jest.fn();
const mockFetchCharacters = jest.fn();

jest.mock("@/store/characterStore", () => ({
  useCharacterStore: () => ({
    pagination: { pages: 5, count: 100, next: null, prev: null },
    currentPage: 2,
    setPage: mockSetPage,
    fetchCharacters: mockFetchCharacters,
    isLoading: false,
  }),
}));

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page info and buttons", () => {
    render(<Pagination />);
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("previous button triggers setPage", () => {
    render(<Pagination />);
    const prev = screen.getByText("Previous");
    fireEvent.click(prev);
    expect(mockSetPage).toHaveBeenCalled();
  });

  it("next button triggers setPage", () => {
    render(<Pagination />);
    const next = screen.getByText("Next");
    fireEvent.click(next);
    expect(mockSetPage).toHaveBeenCalled();
  });
});
