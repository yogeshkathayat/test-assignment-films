import { Document } from "mongoose";

export interface ICountry extends Document {
    _id: string;
    countryName: string;
}