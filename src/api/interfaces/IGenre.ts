import { Document } from "mongoose";

export interface IGenre extends Document {
    _id: string;
    genre: string;
}