export interface Info {
    count: number
    pages: number
    next: string
    prev: any
}

export class CharacterApi {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Location
    location: Location
    image: string
    episode: string[]
    url: string
    created: string
}

interface Location {
    name: string
    url: string
}

export class CharacterApiResult {
    info: Info
    results: CharacterApi[]
}