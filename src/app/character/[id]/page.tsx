// types not required in server page
import {
  getCharacterById,
  getCharacters,
  getMultipleEpisodes,
} from "@/lib/api";
import CharacterDetailClient from "@/components/CharacterDetailClient";
import { notFound } from "next/navigation";

// Server-side page; render client component with fetched data

export async function generateStaticParams() {
  // Fetch the first page to get total count of characters and generate ids
  const firstPage = await getCharacters(1);
  const total = firstPage.info.count || 0;
  const params = Array.from({ length: total }, (_, i) => ({
    id: String(i + 1),
  }));
  return params;
}

type PageProps = {
  params: { id: string };
};

export default async function CharacterDetailPage({ params }: PageProps) {
  const id = Number(params.id);
  try {
    const charData = await getCharacterById(id);
    const episodeIds = charData.episode.slice(0, 8).map((url) => {
      const parts = url.split("/");
      return parseInt(parts[parts.length - 1], 10);
    });
    const epsData =
      episodeIds.length > 0 ? await getMultipleEpisodes(episodeIds) : [];

    return <CharacterDetailClient character={charData} episodes={epsData} />;
  } catch {
    // If something goes wrong (invalid id), show a 404
    return notFound();
  }
}
