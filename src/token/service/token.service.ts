import { TokenDto } from "../type/token.dto";
import * as jwt from 'jsonwebtoken';

export const verifyAndDecodeJWT = (token: string): Promise<TokenDto> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(decoded as TokenDto);
        });
    });
}

export const signJWT = (tokenDto: TokenDto): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(tokenDto, process.env.JWT_KEY, (err, encoded) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(encoded);
        })
    });
}

export default {
    verifyAndDecodeJWT,
    signJWT
}