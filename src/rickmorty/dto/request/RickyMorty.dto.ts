import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { TokenDto } from "../../../token/type/token.dto";

export class RickyMortyDto {
    @IsNotEmpty()
    @IsArray()
    params: string[];

    @IsNotEmpty()
    token: TokenDto;
}