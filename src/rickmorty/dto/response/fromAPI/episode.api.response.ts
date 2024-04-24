import { Info } from "./character.api.response"

export class EpisodeApiResult {
    info: Info
    results: EpisodeApi[]
  }
  
  export class EpisodeApi {
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
  }
  