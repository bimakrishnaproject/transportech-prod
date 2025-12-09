import axios from "axios";
import { Character, Episode, APIResponse } from "@/types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Character API
export const getCharacters = async (
  page: number = 1,
  name?: string,
  status?: string,
  species?: string,
  gender?: string
): Promise<APIResponse<Character>> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (name) params.append("name", name);
  if (status) params.append("status", status);
  if (species) params.append("species", species);
  if (gender) params.append("gender", gender);

  const response = await api.get<APIResponse<Character>>(
    `/character?${params.toString()}`
  );
  return response.data;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};

export const getMultipleCharacters = async (
  ids: number[]
): Promise<Character[]> => {
  if (ids.length === 0) return [];
  const response = await api.get<Character[]>(`/character/${ids.join(",")}`);
  return Array.isArray(response.data) ? response.data : [response.data];
};

// Get featured characters (random selection)
export const getFeaturedCharacters = async (
  count: number = 10
): Promise<Character[]> => {
  try {
    // Get first page to ensure we have characters
    const firstPage = await getCharacters(1);
    const allCharacters = firstPage.results;

    // If we have enough characters, randomly select
    if (allCharacters.length >= count) {
      const shuffled = [...allCharacters].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    // Otherwise, get random IDs from the total count (826 characters)
    const totalCharacters = firstPage.info.count;
    const randomIds: number[] = [];
    const usedIds = new Set<number>();

    while (randomIds.length < count && randomIds.length < totalCharacters) {
      const randomId = Math.floor(Math.random() * totalCharacters) + 1;
      if (!usedIds.has(randomId)) {
        usedIds.add(randomId);
        randomIds.push(randomId);
      }
    }

    if (randomIds.length > 0) {
      return await getMultipleCharacters(randomIds);
    }

    return allCharacters.slice(0, count);
  } catch {
    // Fallback to first page characters
    const firstPage = await getCharacters(1);
    return firstPage.results.slice(0, count);
  }
};

// Episode API
export const getEpisodes = async (
  page: number = 1
): Promise<APIResponse<Episode>> => {
  const response = await api.get<APIResponse<Episode>>(`/episode?page=${page}`);
  return response.data;
};

export const getEpisodeById = async (id: number): Promise<Episode> => {
  const response = await api.get<Episode>(`/episode/${id}`);
  return response.data;
};

export const getMultipleEpisodes = async (
  ids: number[]
): Promise<Episode[]> => {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const episode = await getEpisodeById(ids[0]);
    return [episode];
  }
  const response = await api.get<Episode[]>(`/episode/${ids.join(",")}`);
  return Array.isArray(response.data) ? response.data : [response.data];
};

export default api;
