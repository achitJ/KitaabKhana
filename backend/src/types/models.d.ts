import { Document, Types } from "mongoose";

export interface IUsers {
    name: string;
    email: string;
    password?: string;
    isAdmin: boolean;
    isGoogleUser: boolean;
}

export type IUserDocument = IUsers & Document;

export interface IBooks {
    title: string;
    author: string;
    genre: Types.ObjectId;
    dop: Date;
    availableBooks: number;
}

export type IBookDocument = IBooks & Document;

export interface IGenre {
    name: string;
}

export type IGenreDocument = IGenre & Document;