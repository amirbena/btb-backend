import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "../constants";


export class UserLoginDto {

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