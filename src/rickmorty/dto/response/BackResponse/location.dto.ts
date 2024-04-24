import { LocationApi } from "../fromAPI/location.api.response";

export interface LocationResult {
    nextPageURL?: string;
    locations: LocationApi[];
}