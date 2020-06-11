import { Schema, model } from "mongoose";
import { ICountry } from "../interfaces/ICountry";
import * as Joi from "@hapi/joi";

export const CountryValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string(),
    code:Joi.string(),
});


const countrySchema = new Schema({
    name: {
        type: String
    },
    code:{
        type: String
    },

}, { timestamps: true });

export const CountryModel = model<ICountry>("Country", countrySchema);