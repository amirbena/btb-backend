import { Request, Response } from "express";
import { PREFIX_URL } from "./rickyMorty.constants";
import { RickyMortyDto } from "./dto/request/RickyMorty.dto";
import { buildUrlAccordingQueryParams } from "../utils";
import axios, { HttpStatusCode } from "axios";
import { INTERNAL_SERVER_ERROR } from "../constants/errors";
import { RickMortyError } from "./types/rickMortyError.type";
import { CharacterApi, CharacterApiResult } from "./dto/response/fromAPI/character.api.response";
import { CharacterResult } from "./dto/response/BackResponse/character.dto";
import { LocationApi, LocationApiResult } from "./dto/response/fromAPI/location.api.response";
import { LocationResult } from "./dto/response/BackResponse/location.dto";
import { EpisodeResult } from "./dto/response/BackResponse/epsiode.dto";
import { EpisodeApi, EpisodeApiResult } from "./dto/response/fromAPI/episode.api.response";


const getItems = async (req: Request, res: Response) => {
    const { originalUrl } = req;
    const route = originalUrl.includes("/?") ? originalUrl.split("/")[req.originalUrl.split("/").length - 2]
        : originalUrl.includes("?") ? originalUrl.split("/")[req.originalUrl.split("/").length - 1].split("?")[0] : originalUrl.split("/")[req.originalUrl.split("/").length - 1];

    const { params } = req.body as RickyMortyDto;
    const queryLength = Object.entries(req.query).length;

    try {
        const fullUrl = `${PREFIX_URL}/${route}/${params.join(',')}${!!queryLength ? `?${buildUrlAccordingQueryParams(req)}` : ""}`;
        const result = await axios.get(fullUrl);
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw { status: error.response.status, message: error.response.data };
        } else {
            throw error;
        }
    }
}

const changeCharacterToResult = (character: CharacterApi): CharacterApi => {
    const { location, episode, origin } = character;
    const locationUrl = location.url.split("/");
    const originUrl = origin.url.split("/");
    return {
        ...character,
        location: {
            ...location,
            url: locationUrl[locationUrl.length - 1]
        },
        origin: {
            ...origin,
            url: originUrl[originUrl.length - 1]
        },
        episode: episode.map(episodePart => episodePart.split("/")[episodePart.split("/").length - 1])
    }

}

const changeLocationToResponse = (location: LocationApi): LocationApi => {
    return {
        ...location,
        residents: location.residents.map(resident => resident.split("/")[resident.split("/").length - 1])
    }
}

const changeEpisodeToResponse = (episode: EpisodeApi): EpisodeApi => {
    return {
        ...episode,
        characters: episode.characters.map(character => character.split("/")[character.split("/").length - 1])
    }
}

const buildCharacterResponse = (resultFromApi: CharacterApi | CharacterApiResult): CharacterResult => {
    let characterResult: CharacterResult = { characters: [] };
    if ((resultFromApi as CharacterApi).created) {
        resultFromApi = resultFromApi as CharacterApi;
        characterResult.characters = [changeCharacterToResult(resultFromApi)];
    }
    else if ((resultFromApi as CharacterApiResult).info) {
        resultFromApi = resultFromApi as CharacterApiResult;
        characterResult.nextPageURL = resultFromApi.info.next;
        characterResult.characters = resultFromApi.results.map(result => changeCharacterToResult(result));
    }
    return characterResult;
}



const buildLocationsResponse = (result: LocationApi | LocationApiResult): LocationResult => {
    let locationResult: LocationResult = { locations: [] };
    if ((result as LocationApi).created) {
        result = result as LocationApi;
        locationResult.locations = [changeLocationToResponse(result)];
    }
    else if ((result as LocationApiResult).info) {
        result = result as LocationApiResult;
        locationResult.nextPageURL = result.info.next;
        locationResult.locations = result.results.map(result => changeLocationToResponse(result));
    }
    return locationResult;
}

const buildEpisodesResponse = (result: EpisodeApi | EpisodeApiResult): EpisodeResult => {
    let episodeResult: EpisodeResult = { episodes: [] };
    if ((result as EpisodeApi).created) {
        result = result as EpisodeApi;
        episodeResult.episodes = [changeEpisodeToResponse(result)];
    }
    else if ((result as EpisodeApiResult).info) {
        result = result as EpisodeApiResult;
        episodeResult.nextPageURL = result.info.next;
        episodeResult.episodes = result.results.map(result => changeEpisodeToResponse(result));
    }
    return episodeResult;
}

export const getCharacters = async (req: Request, res: Response) => {
    try {
        const resultFromAPI = await getItems(req, res);
        const characters = buildCharacterResponse(resultFromAPI);
        res.json({ characters });

    } catch (error) {
        if (error instanceof RickMortyError) {
            const { status, message } = error;
            return res.status(status).json({ message });
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }
}

export const getEpisodes = async (req: Request, res: Response) => {
    try {
        const resultFromAPI = await getItems(req, res);
        const episodes = buildEpisodesResponse(resultFromAPI);
        res.json({ episodes });

    } catch (error) {
        if (error instanceof RickMortyError) {
            const { status, message } = error;
            return res.status(status).json({ message });
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }
}

export const getLocations = async (req: Request, res: Response) => {
    try {
        const resultFromAPI = await getItems(req, res);
        const locations = buildLocationsResponse(resultFromAPI);
        res.json({ locations });

    } catch (error) {
        if (error instanceof RickMortyError) {
            const { status, message } = error;
            return res.status(status).json({ message });
        }
        return res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }
}


export default {
    getCharacters,
    getLocations,
    getEpisodes
}