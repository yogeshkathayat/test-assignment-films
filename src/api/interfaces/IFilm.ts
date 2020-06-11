import { Document } from "mongoose";
import { ICountry } from "./ICountry";
import { IUser } from "./IUser";
import {IGenre} from "./IGenre";


export type comment = {
    text: string,
    user: string
}
export interface IFilm extends Document {
    _id: string;
    name: string;
    slugName: string;
    description: string;
    releaseDate: string;
    rating: number
    ticketPrice: string;
    country: ICountry;
    genre: IGenre[];
    photo: string;
    comment?: comment[];
}