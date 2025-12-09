import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';

// Mock the character store
const mockSetSearch = jest.fn();
const mockFetchCharacters = jest.fn();

jest.mock('@/store/characterStore', () => ({
  useCharacterStore: () => ({
    search: '',
    setSearch: mockSetSearch,
    fetchCharacters: mockFetchCharacters,
  }),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders search input', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search characters...');
    
    fireEvent.change(input, { target: { value: 'Rick' } });
    
    expect(input).toHaveValue('Rick');
  });

  it('debounces search for 300ms', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search characters...');
    
    fireEvent.change(input, { target: { value: 'Rick' } });
    
    // Should not call setSearch immediately
    expect(mockSetSearch).not.toHaveBeenCalled();
    
    // Fast-forward 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Now it should have been called
    expect(mockSetSearch).toHaveBeenCalledWith('Rick');
  });

  it('shows clear button when input has value', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search characters...');
    
    // Initially no clear button
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    
    // Type something
    fireEvent.change(input, { target: { value: 'Morty' } });
    
    // Clear button should appear
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search characters...');
    
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(input).toHaveValue('Morty');
    
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
    expect(mockSetSearch).toHaveBeenCalledWith('');
  });

  it('has correct input styling', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search characters...');
    
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('rounded-xl');
  });

  it('calls fetchCharacters when search changes', () => {
    render(<SearchBar />);
    
    // fetchCharacters should be called on mount via useEffect
    expect(mockFetchCharacters).toHaveBeenCalled();
  });
});
