import { EpisodeApi } from "../fromAPI/episode.api.response";

export interface EpisodeResult {
    nextPageURL?: string;
    episodes: EpisodeApi[];
}