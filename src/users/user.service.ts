import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { CONFLICT_LOGIN_MESSAGE, CONFLICT_REGISTER_MESSAGE, INTERNAL_SERVER_ERROR, NOT_FOUND_LOGIN_MESSAGE } from "../constants/errors";
import { User, UserModel } from "./user.schema";
import { UserRegisterDto } from "./dto/UserRegister.dto";
import * as bcrypt from 'bcrypt';
import { TokenDto } from "../token/type/token.dto";
import tokenService from "../token/service/token.service";
import { AUTHORIZATION_TOKEN_HEADER, COOKIE_TOKEN_HEADER } from "../token/constants";
import { UserLoginDto } from "./dto/UserLogin.dto";
import { BCRYPT_ROUNDS } from "./constants";


export const getUserById = async (_id: Types.ObjectId): Promise<User> => {
    const user: User = await UserModel.findById(_id);
    return user;
}

export const userRegister = async (req: Request, res: Response) => {
    console.log("Entered register");
    const body = req.body as UserRegisterDto;
    const { email } = body;
    try {
        const sameEmail = await UserModel.find({ email: body.email });
        if (sameEmail.length) {
            return res.status(HttpStatusCode.Conflict).json({ message: CONFLICT_REGISTER_MESSAGE })
        }
        const password = await bcrypt.hash(body.password, BCRYPT_ROUNDS);
        const user = new UserModel({ ...body, password });
        const savedUser = await user.save();
        const tokenDto: TokenDto = { email, _id: savedUser._id };
        const token = await tokenService.signJWT(tokenDto);
        res.cookie(COOKIE_TOKEN_HEADER, token, { httpOnly: true });
        return res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }

}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body as UserLoginDto;
    console.log("Entered Login");
    try {
        const userWithEmail = await UserModel.findOne({ email });
        if (!userWithEmail) {
            return res.status(HttpStatusCode.NotFound).json({ message: NOT_FOUND_LOGIN_MESSAGE });
        }
        const samePassword = await bcrypt.compare(password, userWithEmail.password);
        if (!samePassword) {
            return res.status(HttpStatusCode.Conflict).json({ message: CONFLICT_LOGIN_MESSAGE })
        }
        const tokenDto: TokenDto = { email, _id: userWithEmail._id };
        const token = await tokenService.signJWT(tokenDto);
        res.cookie(COOKIE_TOKEN_HEADER, token, { httpOnly: true });
        res.json({ user: userWithEmail, token });
    } catch (error) {
        res.status(HttpStatusCode.InternalServerError).json({ message: INTERNAL_SERVER_ERROR });
    }

}


export default {
    getUserById,
    userRegister,
    userLogin
}