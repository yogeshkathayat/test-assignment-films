import { Document } from "mongoose";

export interface IFilm extends Document {
    _id: string;
    name: string;
    description: string;
    releaseDate: string;
    rating: number
    ticketPrice: string;
    country: string;
    genre: string;
    photo: string;
}