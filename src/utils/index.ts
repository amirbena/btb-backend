import { Request } from "express";

export const buildUrlAccordingQueryParams = (req: Request): string => {
    const { query } = req;
    console.log(query);
    const queryEntries = Object.entries(query);
    const result = queryEntries.reduce((accumulator: string, [key, value]: [string, string], index: number) =>
        accumulator.concat(`${key}=${value}${index + 1 !== queryEntries.length ? "&" : ""}`)
        , "");
    return result;
}