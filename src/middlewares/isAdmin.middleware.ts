import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR } from '../constants/errors';
import { TokenDto } from '../token/type/token.dto';
import userService from '../users/user.service';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id }: TokenDto = req.body.token;
        const user = await userService.getUserById(_id);
        if (!user.isAdmin) {
            return res.status(HttpStatusCode.Forbidden).send("User is Not Admin");
        }
        next();
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR }); 
    }


}