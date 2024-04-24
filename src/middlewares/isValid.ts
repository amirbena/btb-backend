import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserRegisterDto } from '../users/dto/UserRegister.dto';
import { UserLoginDto } from '../users/dto/UserLogin.dto';
import { INTERNAL_SERVER_ERROR } from '../constants/errors';
import { RickyMortyDto } from '../rickmorty/dto/request/RickyMorty.dto';


export const isValidRegister = async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(UserRegisterDto, req.body);
    console.log("entered");
    try {
        const errors = await validate(dto);
        console.log(errors);
        if (errors.length > 0) {
            const validationErrors = errors.map((err) => ({
                field: err.property,
                message: Object.values(err.constraints)[0],
            }));
            return res.status(HttpStatusCode.BadRequest).json({ errors: validationErrors });
        }
        next();
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }
}

export const isValidLogin = async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(UserLoginDto, req.body);
    console.log("entered");
    try {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const validationErrors = errors.map((err) => ({
                field: err.property,
                message: Object.values(err.constraints)[0],
            }));
            return res.status(HttpStatusCode.BadRequest).json({ errors: validationErrors });
        }
        next();
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }
}

export const isValidRickMorty  = async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(RickyMortyDto, req.body);
    try {
        const errors = await validate(dto);
        console.log("errors",errors);
        if (errors.length > 0) {
            const validationErrors = errors.map((err) => ({
                field: err.property,
                message: Object.values(err.constraints)[0],
            }));
            return res.status(HttpStatusCode.BadRequest).json({ errors: validationErrors });
        }
        next();
    } catch (error) {
        console.log("Error",error);
        res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }
}
