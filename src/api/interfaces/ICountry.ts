import { Document } from "mongoose";

export interface ICountry extends Document {
    _id: string;
    name: string;
    code: string;
}