import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants/errors';
import tokenService from '..//token/service/token.service';

const getJWT = (req: Request): string => {
    const cookieToken = req.cookies.token;
    const authroizationToken = req.headers.authorization?.split(" ")[1];
    return cookieToken || authroizationToken;
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerToken = getJWT(req);
        const token = await tokenService.verifyAndDecodeJWT(bearerToken);
        console.log("token",token);
        req.body = { ...req.body, token };
        next();
    } catch (error) {
        console.log("error",error);
        res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR }); 
    }


}