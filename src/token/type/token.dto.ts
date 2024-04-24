import { Types } from "mongoose";

export interface TokenDto {
    _id: Types.ObjectId;
    email: string;
}