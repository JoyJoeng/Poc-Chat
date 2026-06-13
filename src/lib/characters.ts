import { Character } from "@/types";
import { DOYOON_CHARACTER } from "./characters/doyoon";

export const CHARACTERS: Character[] = [DOYOON_CHARACTER];

export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}
