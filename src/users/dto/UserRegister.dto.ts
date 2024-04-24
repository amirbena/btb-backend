import { IsEmail, IsNotEmpty, IsString, MAX_LENGTH, MaxLength } from "class-validator";
import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH } from "../constants";


export class UserRegisterDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_NAME_LENGTH)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(MAX_EMAIL_LENGTH)
    email: string;


    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_PASSWORD_LENGTH)
    password: string;
}