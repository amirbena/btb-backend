import { Schema, Types, model } from 'mongoose';
import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH } from './constants';

interface UserMongoose {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}


export type User = UserMongoose & Types.ObjectId;



const userSchema = new Schema<UserMongoose>({
    name: { type: String, required: true, maxlength: MAX_NAME_LENGTH },
    email: { type: String, required: true, unique: true, maxlength: MAX_EMAIL_LENGTH },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

export const UserModel = model<UserMongoose>('User', userSchema); // Export the model
