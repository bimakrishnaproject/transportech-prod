import { create } from 'zustand';
import { Character, Filters, PaginationInfo } from '@/types';
import { getCharacters } from '@/lib/api';

interface CharacterState {
  characters: Character[];
  pagination: PaginationInfo | null;
  currentPage: number;
  search: string;
  filters: Filters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCharacters: () => Promise<void>;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {
  status: '',
  species: '',
  gender: '',
};

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  pagination: null,
  currentPage: 1,
  search: '',
  filters: initialFilters,
  isLoading: false,
  error: null,

  fetchCharacters: async () => {
    const { currentPage, search, filters } = get();
    set({ isLoading: true, error: null });

    try {
      const data = await getCharacters(
        currentPage,
        search || undefined,
        filters.status || undefined,
        filters.species || undefined,
        filters.gender || undefined
      );
      set({
        characters: data.results,
        pagination: data.info,
        isLoading: false,
      });
    } catch (error) {
      // Check if it's a "not found" error (404)
      if (error instanceof Error && error.message.includes('404')) {
        set({
          characters: [],
          pagination: null,
          isLoading: false,
          error: null, // Not an error, just no results
        });
      } else {
        set({
          characters: [],
          pagination: null,
          isLoading: false,
          error: 'Failed to fetch characters. Please try again.',
        });
      }
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page });
  },

  setSearch: (search: string) => {
    set({ search, currentPage: 1 });
  },

  setFilter: (key: keyof Filters, value: string) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      currentPage: 1,
    }));
  },

  resetFilters: () => {
    set({ filters: initialFilters, currentPage: 1, search: '' });
  },
}));
