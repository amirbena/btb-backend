export class RickMortyError {
    status: number;
    message: ErrorMessage;
}
interface ErrorMessage {
    error: string
}