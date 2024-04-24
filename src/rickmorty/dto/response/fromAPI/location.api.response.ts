import { Info } from "./character.api.response"

export class LocationApiResult {
    info: Info
    results: LocationApi[]
}

export class LocationApi {
    id: number
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
}
