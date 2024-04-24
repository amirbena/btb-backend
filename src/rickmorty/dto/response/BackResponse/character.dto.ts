import { CharacterApi } from "../fromAPI/character.api.response";

export interface CharacterResult {
    nextPageURL?: string;
    characters: CharacterApi[];
}